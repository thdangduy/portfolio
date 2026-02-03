import Link from 'next/link';
import '@/app/globals.css';
import { JetBrainsMono } from '@/fonts';
import { cn } from '@/lib/utils';
import { BlogPreview } from '@/components/blog/blog-preview';

import { getBlogPost } from '@/lib/actions/blogs';
import { ViewCounter } from '@/components/blog/view-counter';

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogPost(slug);
    return (
        <div className={cn("min-h-screen p-8 md:p-20 text-blog-fg", JetBrainsMono.className)}>
            <div className="max-w-4xl mx-auto">
                <Link href="/blog" className="text-blog-orange hover:underline mb-8 block">
                    ← Back to Blog
                </Link>
                {!post ? (
                    <h1 className="text-4xl font-bold text-blog-red">Post not found</h1>
                ) :
                    <article>
                        <h1 className="text-blog-white mb-4 text-4xl font-bold">{post.title}</h1>
                        <div className="text-blog-black mb-8 font-mono flex items-center gap-4 text-sm">
                            {new Date(post.created_at).toLocaleDateString()}
                            <ViewCounter slug={post.slug} initialViews={post.views} />
                        </div>
                        <BlogPreview content={post.content} />
                    </article>

                }
            </div>
        </div>
    );
}


