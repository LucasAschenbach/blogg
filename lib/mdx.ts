import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import { getPostDescription } from './utils'

import remarkGfm from 'remark-gfm'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkMath from 'remark-math'
import rehypeMathJax from 'rehype-mathjax'

type Frontmatter = {
  title: string,
  date: Date,
  tags: string[],
  publish: boolean,
}

function createFrontmatter(data: Partial<Frontmatter>): Frontmatter {
  return {
    title: data.title || '',
    date: data.date || new Date(),
    tags: data.tags || [],
    publish: data.publish || false,
  };
}

export async function parseMDX(source: string, compileContent: boolean = true) {
  const { content, data } = matter(source);
  const frontmatter = createFrontmatter(data as Partial<Frontmatter>);
  
  if (!compileContent) {
    return {
      content,
      description: getPostDescription(content),
      frontmatter: frontmatter
    };
  }

  const { content: compiledContent } = await compileMDX({
    source: content,
    options: { 
      parseFrontmatter: true,
      mdxOptions: {
        // Your MDX options here
        remarkPlugins: [
          remarkGfm, // GitHub Flavored Markdown
          remarkMath, // LaTeX support
        ],
        rehypePlugins: [
          rehypePrism, // Syntax highlighting
          rehypeSlug, // Add IDs to headings
          rehypeAutolinkHeadings, // Add links to headings  
          rehypeMathJax, // LaTeX support
        ]
      }
    },
  });

  return {
    content: compiledContent,
    description: getPostDescription(content),
    frontmatter: frontmatter
  };
}
