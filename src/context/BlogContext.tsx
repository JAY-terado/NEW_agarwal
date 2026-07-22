import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { blogs as initialBlogs, type BlogPost } from '../data/blogs';

interface BlogContextType {
  blogs: BlogPost[];
  addBlog: (blog: BlogPost) => void;
  deleteBlog: (id: string) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    // On mount, load any custom blogs from localStorage and merge with static blogs
    const customBlogsStr = localStorage.getItem('agarwal_custom_blogs');
    const customBlogs: BlogPost[] = customBlogsStr ? JSON.parse(customBlogsStr) : [];
    
    // Custom blogs go first so they appear at the top
    setBlogs([...customBlogs, ...initialBlogs]);
  }, []);

  const addBlog = (newBlog: BlogPost) => {
    const customBlogsStr = localStorage.getItem('agarwal_custom_blogs');
    const customBlogs: BlogPost[] = customBlogsStr ? JSON.parse(customBlogsStr) : [];
    
    const updatedCustomBlogs = [newBlog, ...customBlogs];
    localStorage.setItem('agarwal_custom_blogs', JSON.stringify(updatedCustomBlogs));
    
    setBlogs([...updatedCustomBlogs, ...initialBlogs]);
  };

  const deleteBlog = (id: string) => {
    // Only allow deleting custom blogs for safety
    const customBlogsStr = localStorage.getItem('agarwal_custom_blogs');
    if (customBlogsStr) {
      const customBlogs: BlogPost[] = JSON.parse(customBlogsStr);
      const updatedCustomBlogs = customBlogs.filter(b => b.id !== id);
      localStorage.setItem('agarwal_custom_blogs', JSON.stringify(updatedCustomBlogs));
      setBlogs([...updatedCustomBlogs, ...initialBlogs]);
    }
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, deleteBlog }}>
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
