import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { getBlogPost } from "@/lib/api";
import { Category, BlogPost } from "@/lib/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto px-12 py-20">
        <h1 className="text-white text-2xl">Post not found</h1>
        <Link href="/blog" className="text-blue-400 hover:text-blue-300">← back to blog</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-12 py-20">

      {/* Back link */}
      <Link href="/blog" className="text-zinc-500 text-sm hover:text-white transition-colors">
        ← /blog
      </Link>

      {/* Post header */}
      <div className="mt-10 mb-12">
        <p className="text-zinc-500 text-sm mb-6">
          {new Date(post.createdAt).toDateString()}
        </p>
        <h1 className="text-4xl font-bold text-white leading-tight mb-6">
          {post.title}
        </h1>
        <div className="flex gap-2">
          {post.categories.map((c) => (
            <span key={c.id} className="text-xs border border-blue-400 text-blue-400 px-2 py-1">
              #{c.name}
            </span>
          ))}
        </div>
      </div>

      <hr className="border-zinc-800 mb-12" />

      {/* Post content */}
      <article className="prose prose-invert prose-pre:bg-zinc-900 max-w-none
        prose-headings:font-bold prose-headings:text-white
        prose-p:text-zinc-300 prose-p:leading-relaxed
        prose-li:text-zinc-300
        prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
        prose-code:text-blue-300 prose-code:bg-zinc-900 prose-code:px-1">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>

    </div>
  );
}