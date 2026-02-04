import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { ReactNode } from 'react'

type PortableTextSpan = {
  _key?: string
  _type: 'span'
  text?: string
  marks?: string[]
}

type PortableTextBlock = {
  _key?: string
  _type: 'block'
  style?: string
  children?: PortableTextSpan[]
  markDefs?: Array<{ _key: string; _type: string; href?: string; openInNewTab?: boolean }>
  listItem?: 'bullet' | 'number'
  level?: number
}

type PortableTextImage = {
  _key?: string
  _type: 'image'
  alt?: string
  asset?: any
}

type VideoEmbed = {
  _key?: string
  _type: 'videoEmbed'
  url: string
  title?: string
  caption?: string
}

type TwoColumn = {
  _key?: string
  _type: 'twoColumn'
  left: ContentNode[]
  right: ContentNode[]
}

type ContentNode = PortableTextBlock | PortableTextImage | VideoEmbed | TwoColumn

function toEmbedUrl(input: string) {
  try {
    const url = new URL(input)

    // YouTube
    if (
      url.hostname === 'www.youtube.com' ||
      url.hostname === 'youtube.com' ||
      url.hostname === 'm.youtube.com'
    ) {
      if (url.pathname === '/watch') {
        const id = url.searchParams.get('v')
        if (id) return `https://www.youtube.com/embed/${id}`
      }

      if (url.pathname.startsWith('/embed/')) return input
    }

    if (url.hostname === 'youtu.be') {
      const id = url.pathname.replace('/', '')
      if (id) return `https://www.youtube.com/embed/${id}`
    }

    // Vimeo
    if (url.hostname === 'vimeo.com') {
      const id = url.pathname.replace('/', '')
      if (id) return `https://player.vimeo.com/video/${id}`
    }

    if (url.hostname === 'player.vimeo.com') return input

    return input
  } catch {
    return input
  }
}

function renderSpans(block: PortableTextBlock) {
  const defs = new Map((block.markDefs || []).map((d) => [d._key, d]))

  return (block.children || []).map((child, idx) => {
    const key = child._key || `${block._key || 'b'}-s-${idx}`
    const text = child.text || ''

    const marks = child.marks || []
    const linkKey = marks.find((m) => defs.get(m)?._type === 'link')
    const linkDef = linkKey ? defs.get(linkKey) : undefined

    if (linkDef?.href) {
      return (
        <a
          key={key}
          href={linkDef.href}
          target={linkDef.openInNewTab ? '_blank' : undefined}
          rel={linkDef.openInNewTab ? 'noreferrer' : undefined}
          style={{ color: 'var(--accent-color-2)', textDecoration: 'underline' }}
        >
          {text}
        </a>
      )
    }

    const isStrong = marks.includes('strong')
    const isEm = marks.includes('em')
    const isUnderline = marks.includes('underline')

    let node: ReactNode = text
    if (isUnderline) node = <span style={{ textDecoration: 'underline' }}>{node}</span>
    if (isEm) node = <em>{node}</em>
    if (isStrong) node = <strong>{node}</strong>

    return <span key={key}>{node}</span>
  })
}

function Block({ block }: { block: PortableTextBlock }) {
  const style = block.style || 'normal'

  if (style === 'h2') return <h2 className="h2">{renderSpans(block)}</h2>
  if (style === 'h3') return <h3 className="h3">{renderSpans(block)}</h3>
  if (style === 'blockquote') {
    return (
      <blockquote
        style={{
          borderLeft: '4px solid var(--accent-color)',
          paddingLeft: '1rem',
          color: 'var(--secondary-color)',
        }}
      >
        {renderSpans(block)}
      </blockquote>
    )
  }

  return <p style={{ color: 'var(--secondary-color)', lineHeight: 1.65 }}>{renderSpans(block)}</p>
}

function Video({ node }: { node: VideoEmbed }) {
  const embedUrl = toEmbedUrl(node.url)

  return (
    <div className="mini-card">
      {node.title && <div className="mini-card-title">{node.title}</div>}
      <div style={{ aspectRatio: '16 / 9', width: '100%', overflow: 'hidden', borderRadius: 12 }}>
        <iframe
          src={embedUrl}
          title={node.title || 'Video'}
          style={{ width: '100%', height: '100%', border: 0 }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      {node.caption && <div className="muted" style={{ marginTop: '0.5rem' }}>{node.caption}</div>}
    </div>
  )
}

function TwoColumn({ node }: { node: TwoColumn }) {
  return (
    <div style={{ display: 'flex', gap: '1.5rem', margin: '1.5rem 0', flexDirection: 'row', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <PostContent content={node.left || []} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <PostContent content={node.right || []} />
      </div>
    </div>
  )
}

export default function PostContent({ content }: { content: ContentNode[] }) {
  let listMode: 'bullet' | 'number' | null = null
  let listItems: React.ReactNode[] = []

  function flushList() {
    if (!listMode || listItems.length === 0) return null

    const out =
      listMode === 'bullet' ? (
        <ul className="list" style={{ paddingLeft: '1.25rem' }}>{listItems}</ul>
      ) : (
        <ol className="list" style={{ paddingLeft: '1.25rem' }}>{listItems}</ol>
      )

    listMode = null
    listItems = []
    return out
  }

  const nodes: React.ReactNode[] = []

  content.forEach((node, idx) => {
    if (node._type === 'block' && node.listItem) {
      if (!listMode) listMode = node.listItem
      if (listMode !== node.listItem) {
        const flushed = flushList()
        if (flushed) nodes.push(<div key={`list-${idx}`}>{flushed}</div>)
        listMode = node.listItem
      }

      listItems.push(
        <li key={node._key || `li-${idx}`} style={{ marginBottom: '0.35rem' }}>
          <span style={{ color: 'var(--secondary-color)', lineHeight: 1.65 }}>{renderSpans(node)}</span>
        </li>
      )
      return
    }

    const flushed = flushList()
    if (flushed) nodes.push(<div key={`list-end-${idx}`}>{flushed}</div>)

    if (node._type === 'block') {
      nodes.push(<Block key={node._key || `b-${idx}`} block={node} />)
      return
    }

    if (node._type === 'image') {
      nodes.push(
        <div key={node._key || `img-${idx}`} className="image-gallery-item" style={{ marginBottom: '1rem' }}>
          <Image
            src={urlFor(node).width(800).height(600).url()}
            alt={node.alt || ''}
            width={800}
            height={600}
            className="image-gallery-image"
            style={{ borderRadius: 14 }}
          />
        </div>
      )
      return
    }

    if (node._type === 'videoEmbed') {
      nodes.push(<Video key={node._key || `vid-${idx}`} node={node} />)
      return
    }

    if (node._type === 'twoColumn') {
      nodes.push(<TwoColumn key={node._key || `twocol-${idx}`} node={node} />)
      return
    }
  })

  const finalFlush = flushList()
  if (finalFlush) nodes.push(<div key="list-final">{finalFlush}</div>)

  return <div className="stack">{nodes}</div>
}
