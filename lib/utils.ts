/**
 * Generates a description from post content if one isn't provided
 * Strips markdown syntax and truncates to a reasonable length
 */
export function getPostDescription(source: string): string {
  // Remove markdown syntax
  const cleanContent = source
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links but keep text
    .replace(/[#*`_~]/g, '')                 // Remove common markdown symbols
    .replace(/\n+/g, ' ')                    // Replace newlines with spaces
    .trim();

  // Get first 300 characters, cut at last complete word
  const truncated = cleanContent.slice(0, 300);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return truncated.slice(0, lastSpace) + '...';
}

export function formatDate(targetDate: Date, includeRelative = false) {
  const currentDate = new Date()

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  const daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  const fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}
