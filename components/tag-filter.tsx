import Link from 'next/link';

interface TagFilterProps {
  tag: string;
  value?: string;
  active: boolean;
}

export default function TagFilter ({ tag, value, active }: TagFilterProps) {
  return (
    <Link href={value ? `/?filter=${value}` : '/'}>
      <div className={`${active ? 'font-bold underline' : ''}`}>
        {tag}
      </div>
    </Link>
  );
}
