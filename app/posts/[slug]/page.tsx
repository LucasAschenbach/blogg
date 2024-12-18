import PostHeader from '@/components/post-header'
import { getAllPosts, getRenderedPost } from '@/lib/posts'  // Your post fetching functions
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getRenderedPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <main>
      <article className="max-w-3xl mx-auto px-6">
        <PostHeader title={post.title} date={post.date} tags={post.tags} />
        <div className="h-12"/>
        <div className="prose">{post.content}</div>
        <div className="h-24"/>
      </article>
    </main>
  );
}
