import fs from 'fs'
import path from 'path'
import { parseMDX } from './mdx'
import { Post, RenderedPost } from '@/types/post';

const postsDirectory = path.join(process.cwd(), 'content/posts')

export async function getAllPosts(): Promise<Post[]> {
  const fileNames = fs.readdirSync(postsDirectory)
  
  const posts = await Promise.all(fileNames.map(async (fileName) => {
    const slug = fileName.replace(/\.mdx$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    
    const { description, frontmatter } = await parseMDX(fileContents, false)
    
    return {
      slug,
      description,
      ...frontmatter
    }
  }));
  const publishedPosts = posts.filter(post => post.publish);
  const sortedPosts = publishedPosts.sort((a, b) => (a.date > b.date ? -1 : 1));

  return sortedPosts;
}

export async function getPost(slug: string): Promise<Post | undefined> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    
    const { description, frontmatter } = await parseMDX(fileContents, false)

    if (!frontmatter.publish) {
      return undefined
    }
    
    return {
      slug,
      description,
      ...frontmatter
    }
  } catch {
    return undefined
  }
} 

export async function getRenderedPost(slug: string): Promise<RenderedPost | undefined> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    
    const { content, description, frontmatter } = await parseMDX(fileContents)

    if (!frontmatter.publish) {
      return undefined
    }

    return {
      slug,
      content,
      description,
      ...frontmatter
    }
  } catch {
    return undefined
  }
}
