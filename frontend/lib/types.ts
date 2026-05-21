export interface Category {
  id: number;
  name: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
  thumbnailUrl?: string;
  categories: Category[];
}