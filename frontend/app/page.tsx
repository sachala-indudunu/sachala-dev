import Link from "next/link";
import { getBlogPosts, stripMarkdown } from "@/lib/api";
import RotatingText from "@/components/RotatingText";
import BlogPostCard from "@/components/BlogPostCard";

export default async function Home() {
  const allPosts = await getBlogPosts();
  const latestPosts = allPosts.slice(0, 3);

  return (
    <div>

      {/* ───── HERO SECTION ───── */}
      <section className="max-w-5xl mx-auto px-12 py-24 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left side — text */}
        <div className="flex-1">
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-6">
            ▪ available for internships — 2026
          </p>
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Sachala /<br />
            cs sophomore<br />
            <RotatingText values={["writing about code_", "building things_", "learning in public_"]} />
          </h1>
          <p className="text-zinc-400 max-w-md mb-8 leading-relaxed">
            Second-year computer science student. I post short takes on{" "}
            <a href="https://linkedin.com/in/sachala-indudunu" className="text-white underline">LinkedIn</a>
            , longer notes here, and I am building out a YouTube channel on the technical side.
          </p>
          <div className="flex gap-4">
            <Link href="/blog" className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 text-sm transition-colors">
              read the blog &rarr;
            </Link>
            <Link href="/contact" className="border border-zinc-700 hover:border-zinc-500 text-white px-6 py-3 text-sm transition-colors">
              contact me
            </Link>
          </div>
        </div>

        {/* Right side — photo */}
        <div className="relative">
          <div className="w-64 h-80 border border-zinc-700 overflow-hidden">
            <img
              src="/photo.jpg"
              alt="Sachala"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 bg-black border border-zinc-700 px-3 py-1 text-xs text-zinc-400">
            ./SACHALA
          </div>
          <div className="mt-2 flex gap-4 text-xs text-zinc-600">
            <span>// LOC: LK</span>
            <span>// STATUS: <span className="text-green-400">●</span></span>
          </div>
        </div>

      </section>

      {/* ───── STATS BAR ───── */}
      <section className="border-t border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-12 grid grid-cols-4">
          
          <div className="py-8 border-r border-zinc-800">
            <p className="text-xs text-zinc-600 uppercase tracking-widest mb-2">status</p>
            <p className="text-blue-400 font-bold text-lg">
              <RotatingText values={["student", "founder", "writer", "photographer"]} interval={3000} />
            </p>
          </div>

          <div className="py-8 px-8 border-r border-zinc-800">
            <p className="text-xs text-zinc-600 uppercase tracking-widest mb-2">posts</p>
            <p className="text-blue-400 font-bold text-lg">{allPosts.length}</p>
          </div>

          <div className="py-8 px-8 border-r border-zinc-800">
            <p className="text-xs text-zinc-600 uppercase tracking-widest mb-2">stack</p>
            <p className="text-blue-400 font-bold text-lg">
              <RotatingText values={["ts", "c#", "c", "c++", "sql"]} interval={1500} />
            </p>
          </div>

          <div className="py-8 px-8">
            <p className="text-xs text-zinc-600 uppercase tracking-widest mb-2">projects</p>
            <p className="text-blue-400 font-bold text-lg">03</p>
          </div>

        </div>
      </section>

      {/* ───── LATEST WRITING ───── */}
      <section className="max-w-5xl mx-auto px-12 py-24">
        
        <div className="flex justify-between items-center mb-12">
          <div>
            <p className="text-blue-400 text-sm mb-2">// 02</p>
            <h2 className="text-3xl font-bold">latest writing</h2>
          </div>
          <Link href="/blog" className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
            all posts &rarr;
          </Link>
        </div>

        {latestPosts.length === 0 ? (
          <p className="text-zinc-600">No posts yet. Check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        )}

      </section>

      {/* ───── CONTACT CTA ─────
      <section className="border-t border-zinc-800">
        <div className="max-w-5xl mx-auto px-12 py-24">
          <p className="text-blue-400 text-sm mb-4">// 03</p>
          <h2 className="text-4xl font-bold mb-6">
            let's <span className="text-blue-400">talk.</span>
          </h2>
          <p className="text-zinc-400 max-w-md mb-8">
            Open to internships, collaborations, or just a chat. 
            Fastest way to reach me is email.
          </p>
          <Link href="/contact" className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 text-sm transition-colors">
            get in touch &rarr;
          </Link>
        </div>
      </section> */}
{/* ───── CONTACT CTA ───── */}
      <section className="border-t border-zinc-800">
        <div className="max-w-5xl mx-auto px-12 py-24">
          <p className="text-blue-400 text-sm mb-4">// 03</p>
          <h2 className="text-4xl font-bold mb-6">
            let's <span className="text-blue-400">talk.</span>
          </h2>
          <p className="text-zinc-400 max-w-md mb-10">
            Open to internships, collaborations, or just a chat.
            Fastest way to reach me is email.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg">
            <a href="mailto:your@email.com" className="border border-zinc-700 hover:border-blue-400 p-4 transition-colors group">
              <p className="text-xs text-zinc-600 uppercase tracking-widest mb-2">EMAIL</p>
              <p className="text-white text-sm group-hover:text-blue-400 transition-colors">your@email.com</p>
            </a>
            <a href="https://linkedin.com/in/sachala-indudunu" target="_blank" className="border border-zinc-700 hover:border-blue-400 p-4 transition-colors group">
              <p className="text-xs text-zinc-600 uppercase tracking-widest mb-2">LINKEDIN</p>
              <p className="text-white text-sm group-hover:text-blue-400 transition-colors">/in/sachala</p>
            </a>
            <a href="https://github.com/sachala-indudunu" target="_blank" className="border border-zinc-700 hover:border-blue-400 p-4 transition-colors group">
              <p className="text-xs text-zinc-600 uppercase tracking-widest mb-2">GITHUB</p>
              <p className="text-white text-sm group-hover:text-blue-400 transition-colors">@sachala</p>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}