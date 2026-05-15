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

export default async function Home() {
  const posts = await getBlogPosts();

  return (
    <main>
      <h1>Blog Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.createdAt}</p>
          <p>{post.categories.map((c) => c.name).join(", ")}</p>
        </div>
      ))}
    </main>
  );
}