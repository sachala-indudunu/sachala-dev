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
    <div className="max-w-5xl mx-auto px-12 py-20">

      {/* Header */}
      <div className="mb-16">
        <p className="text-blue-400 text-sm mb-4">/blog</p>
        <h1 className="text-5xl font-bold leading-tight mb-6">
          notes, logs,<br />
          <span className="text-blue-400">half-formed</span> ideas
        </h1>
        <p className="text-zinc-400 max-w-lg">
          A working archive. Some posts are companions to LinkedIn threads, 
          others are longer build logs.
        </p>
      </div>

      {/* Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="border border-zinc-800 hover:border-zinc-600 transition-colors p-0 flex flex-col">
            
            {/* Card image area */}
            <div className="bg-zinc-900 h-48 flex items-center justify-center">
              <div className="flex gap-2">
                {post.categories.map((c) => (
                  <span key={c.id} className="text-xs border border-zinc-700 px-2 py-1 text-zinc-400">
                    {c.name.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Card content */}
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-center text-xs text-zinc-500 mb-3">
                <span>{new Date(post.createdAt).toDateString()}</span>
              </div>
              <h2 className="text-white font-bold text-lg mb-2 leading-snug">
                {post.title}
              </h2>
              <p className="text-zinc-400 text-sm mb-4 flex-1">
                {post.content.substring(0, 100)}...
              </p>
              <Link href={`/blog/${post.slug}`} className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
                read post →
              </Link>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}