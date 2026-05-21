import Link from "next/link";

const stack = {
  LANGUAGES: ["C", "C++", "JavaScript", "TypeScript", "PHP", "SQL", "HTML / CSS"],
  FRAMEWORKS: ["Next.js", "Laravel", "ASP.NET", "Tailwind CSS"],
  TOOLS: ["Git", "Docker", "Linux", "Arduino IDE", "AutoCAD", "Figma", "VS Code"],
  LEARNING: ["System Design", "Networking & Home Labs", "Robotics Engineering", "Cybersecurity", "Scalable Backend Architecture"],
};

const timeline = [
  { year: "2024", title: "Robotics & Embedded Systems", desc: "Started building projects using IR sensors, Arduino, and custom motor driver ideas." },
  { year: "2024", title: "Switched to Linux", desc: "Moved fully into Linux for development and began exploring low-level systems and networking." },
  { year: "2024", title: "Opened TechHeven", desc: "Started an electronics-focused shop and brand idea connected to hardware and tech interests." },
  { year: "2025", title: "Started University", desc: "Began CS studies and started taking software engineering more seriously." },
  { year: "2025", title: "Full-Stack Development", desc: "Built full-stack projects with Laravel, then moved toward Next.js for modern web development." },
  { year: "2025", title: "Freelance & Self-Learning", desc: "Began exploring freelance work in tech while balancing studies and independent projects." },
  { year: "2026", title: "Restaurant Management System", desc: "Working on a full-scale system with real-world architecture, scalability, and long-term features in mind." },
  { year: "Now", title: "Building Toward Something Bigger", desc: "Focused on becoming a well-rounded engineer who can design, build, and eventually lead meaningful tech products." },
];

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-12 py-20">

      {/* ───── BIO ───── */}
      <section className="mb-24">
        <p className="text-blue-400 text-sm mb-4">/about</p>
        <h1 className="text-5xl font-bold mb-12">
          hi, I'm <span className="text-blue-400">Sachala.</span>
        </h1>
        <div className="max-w-2xl space-y-6 text-zinc-300 leading-relaxed">
          <p>
            I'm a computer science student from Sri Lanka who enjoys building things that actually solve problems. 
            Most of the time I'm experimenting with backend systems, robotics ideas, networking, or random side 
            projects that start small and slowly turn into something much bigger than planned. I care a lot about 
            learning by doing, even if the first version is messy.
          </p>
          <p>
            Right now I'm focused on becoming a strong software engineer while also exploring business ideas around 
            tech. I like systems thinking, clean UI, practical engineering, and projects that mix hardware with 
            software. Outside of coding, I spend a lot of time thinking about how technology can be used in real 
            businesses instead of just tutorial projects.
          </p>
        </div>
      </section>

      {/* ───── STACK ───── */}
      <section className="mb-24">
        <p className="text-blue-400 text-sm mb-2">// stack</p>
        <h2 className="text-3xl font-bold mb-10">tools of the trade</h2>
        <div className="border border-zinc-800 grid grid-cols-2 md:grid-cols-4">
          {Object.entries(stack).map(([category, items], i) => (
            <div
              key={category}
              className={`p-6 ${i < 3 ? "border-r border-zinc-800" : ""}`}
            >
              <p className="text-xs text-zinc-600 uppercase tracking-widest mb-4">{category}</p>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="text-zinc-300 text-sm flex items-center gap-2">
                    <span className="text-blue-400 text-xs">▶</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ───── TIMELINE ───── */}
      <section>
        <p className="text-blue-400 text-sm mb-2">// timeline</p>
        <h2 className="text-3xl font-bold mb-10">how I got here</h2>
        <div className="space-y-0">
          {timeline.map((item, index) => (
            <div key={index} className="flex gap-6 group">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-blue-400 mt-1 shrink-0" />
                {index < timeline.length - 1 && (
                  <div className="w-px bg-zinc-800 flex-1 mt-1" />
                )}
              </div>
              <div className="pb-8">
                <p className="text-zinc-600 text-xs mb-1">{item.year}</p>
                <h3 className="text-white font-bold mb-1">{item.title}</h3>
                <p className="text-zinc-400 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}