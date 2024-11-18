import { formatDate } from "@/lib/utils";

interface PostHeaderProps {
  title: string;
  date: Date;
  tags: string[];
}

export default function PostHeader({ title, date, tags }: PostHeaderProps) {
  return (
    <div className="flex flex-col">
      <h1 className="pt-12 pb-2 text-4xl">{title}</h1>
      <div className="text-lg text-gray-500">
        <span className="pr-2">{formatDate(date)}</span>
        <span className="pr-2">|</span>
        <span>{tags.join(", ")}</span>
      </div>
    </div>
  );
}
