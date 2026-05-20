import Link from "next/link";
import { getBlogPosts, stripMarkdown } from "@/lib/api";
import BlogPostCard from "@/components/BlogPostCard";



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
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>

    </div>
  );
}