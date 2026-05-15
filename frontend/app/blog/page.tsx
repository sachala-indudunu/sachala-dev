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

async function getBlogPosts(): Promise<BlogPost[]> {
  const response = await fetch("http://localhost:5230/api/blogposts");
  const data = await response.json();
  return data;
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main>
      <h1>notes, logs, half-formed ideas</h1>
      <p>A working archive. Search or filter by tag.</p>

      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <div>
              {post.categories.map((c) => (
                <span key={c.id}>{c.name}</span>
              ))}
            </div>
            <p>{new Date(post.createdAt).toDateString()}</p>
            <h2>{post.title}</h2>
            <p>{post.content.substring(0, 100)}...</p>
            <Link href={`/blog/${post.slug}`}>read post →</Link>
          </div>
        ))}
      </div>
    </main>
  );
}