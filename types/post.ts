interface Post {
  slug: string;
  title: string;
  date: Date;
  tags: string[];
  description: string;
  publish: boolean;
}

interface RenderedPost extends Post {
  content: React.ReactNode;
}

export type { Post, RenderedPost };
