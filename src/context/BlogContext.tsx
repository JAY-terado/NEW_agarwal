import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from 'react';
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
  const isFetchingRef = useRef(false);
  const hasFetchedRef = useRef(false);

  const fetchBlogs = async (force = false) => {
    if (isFetchingRef.current) return;
    if (hasFetchedRef.current && !force) return;

    isFetchingRef.current = true;
    setIsLoading(true);
    try {
      const response = await getAllBlogsAxios();
      const apiData = Array.isArray(response?.data?.list)
        ? response.data.list
        : Array.isArray(response?.data?.blogs)
        ? response.data.blogs
        : Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response?.list)
        ? response.list
        : Array.isArray(response?.blogs)
        ? response.blogs
        : Array.isArray(response)
        ? response
        : [];
      
      const mappedBlogs: BlogPost[] = apiData.map((b: any) => ({
        id: b.id.toString(),
        title: b.title || b.titlename || '',
        category: b.blogCategory || b.category || '',
        excerpt: b.blogSummary || b.summary || '',
        content: b.blogDescription || b.article || '',
        image: b.blogImageURL || (b.imageurl && b.imageurl.length > 0 ? b.imageurl[0] : '') || '',
        date: new Date(b.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      }));

      // Set API blogs directly
      setBlogs(mappedBlogs);
      hasFetchedRef.current = true;
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      // Fallback on error
      setBlogs([]);
    } finally {
      isFetchingRef.current = false;
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
      await fetchBlogs(true);
    } catch (error) {
      console.error("Failed to delete blog:", error);
      toast.error("Failed to delete blog");
    }
  };

  return (
    <BlogContext.Provider value={{ blogs, isLoading, refreshBlogs: () => fetchBlogs(true), deleteBlog }}>
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
