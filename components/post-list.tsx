'use client';

import { useEffect, useState } from "react";
import PostPreview from "@/components/post-preview";
import TagFilter from "@/components/tag-filter";
import { Post } from "@/types/post";

export default function PostList({ posts }: { posts: Post[] }) {
  // Uncomment to see all unique tags
  // const tags = Array.from(new Set(posts.flatMap((post) => post.tags)));
  const tags = ["Society", "Machine Learning", "Cryptography", "Mathematics", "Design"];
  const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const [filter, setFilter] = useState<string[] | null>(null);

  useEffect(() => {
    const rawFilter = new URLSearchParams(window.location.search).get("filter");
    setFilter(rawFilter ? rawFilter.split(",") : null);
  }, [posts]);

  return (
    <>
      <div className="py-10 flex flex-wrap gap-4">
        <TagFilter key={"All"} tag="All" active={filter === null} />
        {tags.map((tag) => (
          <TagFilter key={tag} tag={tag} value={tag} active={filter?.includes(tag) ?? false} />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {sortedPosts.filter((post) => filter === null || post.tags.some((tag) => filter.includes(tag))).map((post) => (
          <PostPreview
            key={post.slug}
            post={post}
          />
        ))}
      </div>
    </>
  );
}
