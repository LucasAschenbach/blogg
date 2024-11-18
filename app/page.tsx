import PostList from "@/components/post-list";
import { getAllPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main>
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="pt-12 pb-2 text-4xl">
          Personal Blogg
        </h1>
        <PostList posts={posts} />
        <div className="h-24" />
      </div>
    </main>
  );
}
