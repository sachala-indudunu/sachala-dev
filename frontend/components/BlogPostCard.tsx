"use client";

import Link from "next/link";
import { useState } from "react";
import { BlogPost } from "@/lib/types";
import { stripMarkdown } from "@/lib/api";

interface Props {
  post: BlogPost;
}

export default function BlogPostCard({ post }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-zinc-800 flex flex-col transition-all duration-300 cursor-pointer"
      style={{
        borderColor: hovered ? "#3b82f6" : "",
        boxShadow: hovered ? "0 0 20px rgba(59, 130, 246, 0.3)" : "none",
      }}
    >

      {/* Card image area */}
      <div className="bg-zinc-900 h-40 overflow-hidden">
        {post.thumbnailUrl ? (
          <img
            src={post.thumbnailUrl}
            alt={post.title}
            className="w-full h-full object-cover opacity-80"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex gap-2">
              {post.categories.map((c) => (
                <span key={c.id} className="text-xs border border-zinc-700 px-2 py-1 text-zinc-400">
                  {c.name.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card content */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs text-zinc-500 mb-3">
          {new Date(post.createdAt).toDateString()}
        </p>
        <h3
          className="font-bold mb-2 leading-snug transition-colors duration-300"
          style={{ color: hovered ? "#3b82f6" : "white" }}
        >
          {post.title}
        </h3>
        <p className="text-zinc-400 text-sm mb-4 flex-1">
          {stripMarkdown(post.content).substring(0, 80)}...
        </p>
        <Link href={`/blog/${post.slug}`} className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
          read post →
        </Link>
      </div>

    </div>
  );
}