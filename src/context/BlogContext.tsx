import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type BlogPost } from '../data/blogs';
import { getAllBlogsAxios, deleteBlogAxios } from '../_api/admin';
import toast from 'react-hot-toast';

interface BlogContextType {
  blogs: BlogPost[];
  isLoading: boolean;
  refreshBlogs: () => Promise<void>;
  deleteBlog: (id: string | number) => Promise<void>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await getAllBlogsAxios();
      // Adjust based on your API response structure, assuming response.data or response directly is the array
      const apiData = Array.isArray(response.data) ? response.data : Array.isArray(response) ? response : [];
      
      const mappedBlogs: BlogPost[] = apiData.map((b: any) => ({
        id: b.id.toString(),
        title: b.titlename,
        category: b.category,
        excerpt: b.summary,
        content: b.article,
        image: b.imageurl && b.imageurl.length > 0 ? b.imageurl[0] : '',
        date: new Date(b.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      }));

      // Set API blogs directly
      setBlogs(mappedBlogs);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      // Fallback on error
      setBlogs([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = async (id: string | number) => {
    
    try {
      await deleteBlogAxios(Number(id));
      toast.success("Blog deleted successfully");
      await fetchBlogs();
    } catch (error) {
      console.error("Failed to delete blog:", error);
      toast.error("Failed to delete blog");
    }
  };

  return (
    <BlogContext.Provider value={{ blogs, isLoading, refreshBlogs: fetchBlogs, deleteBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlogContext must be used within a BlogProvider');
  }
  return context;
};
