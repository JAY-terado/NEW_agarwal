export interface BlogPost {
  id: string;
  image: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  content: string[] | string;
}
