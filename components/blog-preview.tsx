import Link from "next/link";
import { getblogPost } from "@/lib/actions/blogs";
import { JetBrainsMono } from "@/fonts";
import { cn } from "@/lib/utils";
import { BlurFade } from "./ui/blur-fade";

export default async function BlogPreview() {
  const allPosts = await getblogPost();
  if (allPosts.length === 0) {
    return null;
  }

  return (
    <section id="blog" className="py-24 relative max-w-6xl">
      <div className="absolute left-0 top-0 bottom-0 flex items-center">
        <div className="relative h-full w-px">
          <div className="absolute inset-0 w-px bg-linear-to-b from-transparent via-blog-orange/60 to-transparent" />
          <div className="absolute inset-0 w-2 -translate-x-0.5 bg-linear-to-b from-transparent via-blog-orange/20 to-transparent blur-sm" />
        </div>
      </div>

      <div className="w-full flex items-start justify-start mb-16 pl-8 relative">
        <div className="absolute left-0 top-3 md:top-5 -translate-x-1">
          <div className="w-3 h-3 rounded-full bg-blog-orange animate-pulse" />
          <div className="absolute inset-0 w-3 h-3 rounded-full bg-blog-orange/30 animate-ping" />
        </div>
        <BlurFade delay={0.25} inView>
          <div className="flex flex-col gap-2">
            <h2 className="text-5xl md:text-6xl font-bold flex items-start justify-start flex-wrap gap-3">
              <span className="text-blog-orange">Latest</span>
              <span className="text-white">Posts</span>
            </h2>
            <p className="text-blog-fg/80 text-base md:text-lg mt-2">
              Thoughts, tutorials, and insights from my journey
            </p>
          </div>
        </BlurFade>
      </div>

      <div className="pl-8 flex flex-col gap-12">
        {allPosts.map((post, index) => (
          <BlurFade key={post.slug} delay={0.25 + index * 0.1} inView>
            <Link
              href={`/blog/${post.slug}`}
              className={cn(
                "group block relative pl-6 border-l-2 border-blog-inactive-border hover:border-blog-orange transition-colors duration-300",
                JetBrainsMono.className,
              )}
            >
              <div className="flex flex-col gap-2">
                <div className="text-xs text-blog-fg/50 font-mono mb-1">
                  {new Date(post.created_at).toLocaleDateString()}
                </div>

                <h3 className="text-2xl font-bold group-hover:text-blog-orange transition-colors text-blog-white">
                  {post.title}
                </h3>

                <p className="text-blog-fg/70 max-w-2xl line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="mt-2 text-blog-orange text-sm font-semibold group-hover:translate-x-2 transition-transform inline-flex items-center gap-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 duration-300">
                  Read Article <span className="text-lg">→</span>
                </div>
              </div>
            </Link>
          </BlurFade>
        ))}
      </div>

      <div className="mt-16 pl-8">
        <Link
          href="/blog"
          className={cn(
            "inline-flex items-center gap-2 text-blog-orange font-bold hover:gap-4 transition-all duration-300",
            JetBrainsMono.className,
          )}
        >
          View All Posts <span className="text-xl">→</span>
        </Link>
      </div>
    </section>
  );
}
