import { formatDate } from '@/lib/utils';
import { Post } from '@/types/post';
import Link from 'next/link';

interface PostPreviewProps {
  post: Post,
}

export default function PostPreview({ post }: PostPreviewProps) {
  return (
    <article className="group cursor-pointer">
      <Link 
        href={`/posts/${post.slug}`}
        className="flex flex-col"
      >
        <h2 className="pt-4 pb-2 text-xl transition-colors group-hover:text-blue-600 group-hover:underline">
          {post.title}
        </h2>
        <p className="text-md text-gray-500">
          <span className="italic inline">{formatDate(post.date)}</span> – {post.description}
        </p>
      </Link>
    </article>
  );
}
