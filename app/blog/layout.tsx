import { JetBrainsMono } from "@/fonts"

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={JetBrainsMono.className}>{children}</div>
    )
}

export default BlogLayout