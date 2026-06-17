import React from 'react'

interface LexicalNode {
  type: string
  text?: string
  value?: number
  format?: number | string
  style?: string
  url?: string
  children?: LexicalNode[]
  [k: string]: unknown
}

interface LexicalSerializerProps {
  content: { root: LexicalNode } | null | undefined
}

export function LexicalSerializer({ content }: LexicalSerializerProps) {
  if (!content?.root?.children) return null

  return (
    <>
      {content.root.children.map((node, index) => (
        <LexicalNodeRenderer key={index} node={node} />
      ))}
    </>
  )
}

function LexicalNodeRenderer({ node }: { node: LexicalNode }) {
  if (!node) return null

  // Handle text nodes
  if (node.type === 'text') {
    let text: React.ReactNode = node.text || ''
    
    // Simple formatting based on bitmask (Lexical uses format bits)
    // 1: bold, 2: italic, 4: strikethrough, 8: underline, 16: code
    const format = typeof node.format === 'number' ? node.format : 0
    
    if (format & 1) text = <strong key="bold">{text}</strong>
    if (format & 2) text = <em key="italic">{text}</em>
    if (format & 4) text = <s key="strike">{text}</s>
    if (format & 8) text = <u key="underline">{text}</u>
    if (format & 16) text = <code key="code">{text}</code>
    
    return <>{text}</>
  }

  // Handle elements
  switch (node.type) {
    case 'paragraph':
      return (
        <p>
          {node.children?.map((child, i) => (
            <LexicalNodeRenderer key={i} node={child} />
          ))}
        </p>
      )
    case 'heading':
      const Tag = (node.tag || 'h2') as React.ElementType
      return (
        <Tag>
          {node.children?.map((child, i) => (
            <LexicalNodeRenderer key={i} node={child} />
          ))}
        </Tag>
      )
    case 'list':
      const ListTag = node.listType === 'number' ? 'ol' : 'ul'
      return (
        <ListTag>
          {node.children?.map((child, i) => (
            <LexicalNodeRenderer key={i} node={child} />
          ))}
        </ListTag>
      )
    case 'listitem':
      return (
        <li>
          {node.children?.map((child, i) => (
            <LexicalNodeRenderer key={i} node={child} />
          ))}
        </li>
      )
    case 'link':
      return (
        <a href={node.fields?.url || node.url} target={node.fields?.newTab ? '_blank' : '_self'} rel={node.fields?.newTab ? 'noopener noreferrer' : ''}>
          {node.children?.map((child, i) => (
            <LexicalNodeRenderer key={i} node={child} />
          ))}
        </a>
      )
    case 'quote':
      return (
        <blockquote>
          {node.children?.map((child, i) => (
            <LexicalNodeRenderer key={i} node={child} />
          ))}
        </blockquote>
      )
    default:
      // Fallback for unknown nodes that have children
      if (node.children) {
        return (
          <>
            {node.children.map((child, i) => (
              <LexicalNodeRenderer key={i} node={child} />
            ))}
          </>
        )
      }
      return null
  }
}
