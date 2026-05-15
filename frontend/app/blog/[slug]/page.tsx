import Link from "next/link";


interface Category {
  id: number;
  name: string;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
  categories: Category[];
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const response = await fetch("http://localhost:5230/api/blogposts");
  const posts: BlogPost[] = await response.json();
  const post = posts.find((p) => p.slug === slug);
  return post ?? null;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return <main><h1>Post not found</h1></main>;
  }

  return (
    <main>
      <Link href="/blog">← /blog</Link>
      <p>{new Date(post.createdAt).toDateString()}</p>
      <h1>{post.title}</h1>
      <div>
        {post.categories.map((c) => (
          <span key={c.id}>#{c.name}</span>
        ))}
      </div>
      <article>{post.content}</article>
    </main>
  );
}