import { BlogPost } from "./types";

export async function getBlogPosts(): Promise<BlogPost[]> {
  const response = await fetch("http://localhost:5230/api/blogposts");
  const data = await response.json();
  return data;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const response = await fetch("http://localhost:5230/api/blogposts");
  const posts: BlogPost[] = await response.json();
  const post = posts.find((p) => p.slug === slug);
  return post ?? null;
}

export function stripMarkdown(text: string): string {
  return text
    .replace(/#{1,6}\s/g, "")     // remove headings ##
    .replace(/\*\*(.*?)\*\*/g, "$1") // remove bold
    .replace(/\*(.*?)\*/g, "$1")   // remove italic
    .replace(/^-\s/gm, "")        // remove list dashes
    .replace(/\n/g, " ")          // replace newlines with spaces
    .trim();
}