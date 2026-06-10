import { type ChangeEvent, type FormEvent, type SyntheticEvent, useEffect, useMemo, useRef, useState } from 'react'
import { buildMasonryLayout } from './lib/masonry'
import { loadItems, normalizeItems, saveItems } from './lib/storage'
import type { PortfolioCategory, PortfolioItem, PortfolioStatus } from './types'

const categories: Array<'All' | PortfolioCategory> = [
  'All',
  'Project',
  'Activity',
  'Certificate',
  'Award',
  'Study',
  'Retrospective',
]

const statuses: Array<'All' | PortfolioStatus> = ['All', 'Planning', 'In Progress', 'Done', 'Archived']
const editableStatuses: PortfolioStatus[] = ['Planning', 'In Progress', 'Done', 'Archived']
const fallbackThumbnail = '/thumbnails/fallback.png'
const sortOptions = [
  { value: 'updated', label: 'Recently updated' },
  { value: 'newest', label: 'Newest created' },
  { value: 'oldest', label: 'Oldest created' },
  { value: 'title', label: 'Title A-Z' },
  { value: 'featured', label: 'Featured first' },
] as const

type SortOption = (typeof sortOptions)[number]['value']

const emptyDraft = {
  title: '',
  category: 'Project' as PortfolioCategory,
  status: 'Planning' as PortfolioStatus,
  summary: '',
  description: '',
  techStack: '',
  problemSolving: '',
  learned: '',
  tags: '',
  githubUrl: '',
  demoUrl: '',
  thumbnailUrl: '',
  featured: false,
}

type Draft = typeof emptyDraft

function splitList(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

function toDraft(item: PortfolioItem): Draft {
  return {
    title: item.title,
    category: item.category,
    status: item.status,
    summary: item.summary,
    description: item.description,
    techStack: item.techStack.join(', '),
    problemSolving: item.problemSolving,
    learned: item.learned,
    tags: item.tags.join(', '),
    githubUrl: item.githubUrl ?? '',
    demoUrl: item.demoUrl ?? '',
    thumbnailUrl: item.thumbnailUrl ?? '',
    featured: item.featured,
  }
}

function parseImportPayload(text: string) {
  const parsed = JSON.parse(text)
  const candidate = Array.isArray(parsed) ? parsed : parsed.items
  if (!Array.isArray(candidate)) throw new Error('Invalid backup payload')
  return normalizeItems(candidate)
}

function useFallbackThumbnail(event: SyntheticEvent<HTMLImageElement>) {
  if (event.currentTarget.src.endsWith(fallbackThumbnail)) return
  event.currentTarget.src = fallbackThumbnail
}

function App() {
  const initialItems = useRef<PortfolioItem[] | null>(null)
  if (!initialItems.current) {
    initialItems.current = loadItems()
  }
  const [items, setItems] = useState<PortfolioItem[]>(initialItems.current)
  const [selectedId, setSelectedId] = useState<string | null>(initialItems.current[0]?.id ?? null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<'All' | PortfolioCategory>('All')
  const [statusFilter, setStatusFilter] = useState<'All' | PortfolioStatus>('All')
  const [sortBy, setSortBy] = useState<SortOption>('updated')
  const [featuredOnly, setFeaturedOnly] = useState(false)
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<Draft>(emptyDraft)
  const [notice, setNotice] = useState('')
  const [boardWidth, setBoardWidth] = useState(960)
  const boardRef = useRef<HTMLDivElement | null>(null)
  const importInputRef = useRef<HTMLInputElement | null>(null)
  const imageInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const ok = saveItems(items)
    if (!ok) setNotice('⚠️ Could not save — storage full. Export your data soon.')
  }, [items])

  useEffect(() => {
    const node = boardRef.current
    if (!node) return

    const observer = new ResizeObserver(([entry]) => {
      setBoardWidth(Math.floor(entry.contentRect.width))
    })

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(''), 3200)
    return () => window.clearTimeout(timer)
  }, [notice])

  useEffect(() => {
    if (!isEditorOpen) return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeEditor()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isEditorOpen])

  const tags = useMemo(() => {
    const allTags = items.flatMap((item) => item.tags)
    return Array.from(new Set(allTags)).sort((a, b) => a.localeCompare(b))
  }, [items])

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase()
    const filtered = items.filter((item) => {
      const matchesSearch =
        !query ||
        [
          item.title,
          item.summary,
          item.description,
          item.problemSolving,
          item.learned,
          item.status,
          ...item.tags,
          ...item.techStack,
        ]
          .join(' ')
          .toLowerCase()
          .includes(query)
      const matchesCategory = category === 'All' || item.category === category
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter
      const matchesFeatured = !featuredOnly || item.featured
      const matchesTag = !activeTag || item.tags.includes(activeTag)

      return matchesSearch && matchesCategory && matchesStatus && matchesFeatured && matchesTag
    })

    return [...filtered].sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title)
      if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      if (sortBy === 'featured') {
        const featuredDelta = Number(b.featured) - Number(a.featured)
        return featuredDelta || new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      }
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    })
  }, [activeTag, category, featuredOnly, items, search, sortBy, statusFilter])

  const selectedItem = useMemo(() => {
    return filteredItems.find((item) => item.id === selectedId) ?? filteredItems[0] ?? null
  }, [filteredItems, selectedId])

  const masonry = useMemo(() => buildMasonryLayout(filteredItems, boardWidth), [boardWidth, filteredItems])

  function updateDraft<Key extends keyof Draft>(key: Key, value: Draft[Key]) {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  function openAddEditor() {
    setEditingId(null)
    setDraft(emptyDraft)
    setIsEditorOpen(true)
  }

  function openEditEditor(item: PortfolioItem) {
    setEditingId(item.id)
    setDraft(toDraft(item))
    setIsEditorOpen(true)
  }

  function closeEditor() {
    setIsEditorOpen(false)
    setEditingId(null)
    setDraft(emptyDraft)
    if (imageInputRef.current) imageInputRef.current.value = ''
  }

  function buildItemFromDraft(existing?: PortfolioItem): PortfolioItem {
    const now = new Date().toISOString()

    return {
      id: existing?.id ?? `item-${crypto.randomUUID()}`,
      title: draft.title.trim(),
      category: draft.category,
      status: draft.status,
      summary: draft.summary.trim(),
      description: draft.description.trim(),
      techStack: splitList(draft.techStack),
      problemSolving: draft.problemSolving.trim(),
      learned: draft.learned.trim(),
      tags: splitList(draft.tags),
      githubUrl: draft.githubUrl.trim() || undefined,
      demoUrl: draft.demoUrl.trim() || undefined,
      thumbnailUrl: draft.thumbnailUrl.trim() || undefined,
      featured: draft.featured,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    }
  }

  function handleSaveItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (editingId) {
      const existing = items.find((item) => item.id === editingId)
      if (!existing) return

      const updatedItem = buildItemFromDraft(existing)
      setItems((current) => current.map((item) => (item.id === editingId ? updatedItem : item)))
      setSelectedId(updatedItem.id)
      setNotice('Item updated')
    } else {
      const newItem = buildItemFromDraft()
      setItems((current) => [newItem, ...current])
      setSelectedId(newItem.id)
      setNotice('Item added')
    }

    closeEditor()
  }

  function handleDeleteItem(item: PortfolioItem) {
    const confirmed = window.confirm(`Delete "${item.title}"? This cannot be undone.`)
    if (!confirmed) return

    setItems((current) => {
      const next = current.filter((candidate) => candidate.id !== item.id)
      return next
    })
    setSelectedId((current) => {
      if (current === item.id) {
        return items.find((i) => i.id !== item.id)?.id ?? null
      }
      return current
    })
    setNotice('Item deleted')
  }

  function handleThumbnailFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setNotice('Please choose an image file')
      return
    }

    if (file.size > 1_200_000) {
      setNotice('Image is too large for localStorage. Choose a file under 1.2 MB.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateDraft('thumbnailUrl', reader.result)
        setNotice('Thumbnail loaded')
      }
    }
    reader.readAsDataURL(file)
  }

  function handleExport() {
    const payload = {
      app: 'FolioVault',
      version: 2,
      exportedAt: new Date().toISOString(),
      items,
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `foliovault-backup-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    URL.revokeObjectURL(url)
    setNotice('Backup exported')
  }

  function handleImport(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      try {
        const importedItems = parseImportPayload(String(reader.result ?? ''))
        if (items.length > 0) {
          const confirmed = window.confirm(
            `This will replace your current ${items.length} items with ${importedItems.length} imported items. Continue?`
          )
          if (!confirmed) {
            if (importInputRef.current) importInputRef.current.value = ''
            return
          }
        }
        setItems(importedItems)
        setSelectedId(importedItems[0]?.id ?? null)
        setSearch('')
        setCategory('All')
        setStatusFilter('All')
        setFeaturedOnly(false)
        setActiveTag(null)
        setNotice(`Imported ${importedItems.length} items`)
      } catch {
        setNotice('Import failed. Choose a valid FolioVault JSON file.')
      } finally {
        if (importInputRef.current) importInputRef.current.value = ''
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="appShell">
      <aside className="sidebar">
        <div className="brandBlock">
          <div>
            <p className="eyebrow">Personal archive</p>
            <h1>FolioVault</h1>
          </div>
          <button className="primaryButton" onClick={openAddEditor}>
            Add Item
          </button>
        </div>

        {notice && <div className="notice">{notice}</div>}

        <label className="fieldLabel">
          Search
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Title, stack, tags..."
            className="textInput"
          />
        </label>

        <div className="formGrid sidebarGrid">
          <label className="fieldLabel">
            Sort
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value as SortOption)}>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="fieldLabel">
            Status
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as 'All' | PortfolioStatus)}>
              {statuses.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="filterGroup">
          <p className="filterTitle">Category</p>
          <div className="categoryGrid">
            {categories.map((item) => (
              <button key={item} className={category === item ? 'chip active' : 'chip'} onClick={() => setCategory(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <label className="featuredToggle">
          <input type="checkbox" checked={featuredOnly} onChange={(event) => setFeaturedOnly(event.target.checked)} />
          Featured Only
        </label>

        <div className="filterGroup">
          <div className="tagHeader">
            <p className="filterTitle">Tags</p>
            {activeTag && (
              <button className="textButton" onClick={() => setActiveTag(null)}>
                Clear
              </button>
            )}
          </div>
          <div className="tagList">
            {tags.map((tag) => (
              <button key={tag} className={activeTag === tag ? 'tagChip active' : 'tagChip'} onClick={() => setActiveTag(tag)}>
                #{tag}
              </button>
            ))}
          </div>
        </div>

        <div className="backupPanel">
          <button className="secondaryButton" onClick={handleExport}>
            Export JSON
          </button>
          <button className="secondaryButton" onClick={() => importInputRef.current?.click()}>
            Import JSON
          </button>
          <input ref={importInputRef} className="hiddenInput" type="file" accept="application/json" onChange={handleImport} />
        </div>

        <div className="countPanel">
          <span>{filteredItems.length}</span>
          <p>cards in view</p>
        </div>
      </aside>

      <main className="boardArea">
        <div className="boardHeader">
          <div>
            <p className="eyebrow">Masonry board</p>
            <h2>Portfolio items</h2>
          </div>
          <p>{masonry.columnCount} columns</p>
        </div>

        <div ref={boardRef} className="masonryViewport">
          {filteredItems.length === 0 ? (
            <div className="emptyState">No matching cards. Try another search or filter.</div>
          ) : (
            <div className="masonryBoard" style={{ height: masonry.height }}>
              {filteredItems.map((item) => {
                const position = masonry.positionById.get(item.id)
                if (!position) return null

                return (
                  <button
                    key={item.id}
                    className={selectedItem?.id === item.id ? 'portfolioCard selected' : 'portfolioCard'}
                    style={{
                      transform: `translate(${position.left}px, ${position.top}px)`,
                      width: position.width,
                      height: position.height,
                    }}
                    onClick={() => setSelectedId(item.id)}
                  >
                    {item.thumbnailUrl && (
                      <img className="cardThumb" src={item.thumbnailUrl} alt="" loading="lazy" onError={useFallbackThumbnail} />
                    )}
                    <div className="cardTopline">
                      <span className={`categoryPill ${item.category.toLowerCase()}`}>{item.category}</span>
                      {item.featured && <span className="featuredBadge">Featured</span>}
                    </div>
                    <div className="statusLine">
                      <span className={`statusBadge ${item.status.toLowerCase().replaceAll(' ', '-')}`}>{item.status}</span>
                      <span>Updated {formatDate(item.updatedAt)}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p className="summary">{item.summary}</p>
                    <div className="stackList">
                      {item.techStack.slice(0, 5).map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                    <div className="cardTags">
                      {item.tags.slice(0, 5).map((tag) => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </main>

      <aside className="detailPanel">
        {selectedItem ? (
          <article>
            {selectedItem.thumbnailUrl && (
              <img className="detailThumb" src={selectedItem.thumbnailUrl} alt="" loading="lazy" onError={useFallbackThumbnail} />
            )}
            <div className="detailActions">
              <div className="detailMeta">
                <span className={`categoryPill ${selectedItem.category.toLowerCase()}`}>{selectedItem.category}</span>
                <span className={`statusBadge ${selectedItem.status.toLowerCase().replaceAll(' ', '-')}`}>{selectedItem.status}</span>
                {selectedItem.featured && <span className="featuredBadge">Featured</span>}
              </div>
              <div className="actionButtons">
                <button className="secondaryButton smallButton" onClick={() => openEditEditor(selectedItem)}>
                  Edit
                </button>
                <button className="dangerButton smallButton" onClick={() => handleDeleteItem(selectedItem)}>
                  Delete
                </button>
              </div>
            </div>
            <h2>{selectedItem.title}</h2>
            <p className="detailDate">
              Created {formatDate(selectedItem.createdAt)} · Updated {formatDate(selectedItem.updatedAt)}
            </p>
            <p className="detailSummary">{selectedItem.summary}</p>

            <section>
              <h3>Description</h3>
              <p>{selectedItem.description}</p>
            </section>
            <section>
              <h3>Problem Solving</h3>
              <p>{selectedItem.problemSolving}</p>
            </section>
            <section>
              <h3>Learned</h3>
              <p>{selectedItem.learned}</p>
            </section>

            <section>
              <h3>Tech Stack</h3>
              <div className="detailChips">
                {selectedItem.techStack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </section>

            <section>
              <h3>Tags</h3>
              <div className="detailChips tags">
                {selectedItem.tags.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>
            </section>

            {(selectedItem.githubUrl || selectedItem.demoUrl) && (
              <div className="linkRow">
                {selectedItem.githubUrl && (
                  <a href={selectedItem.githubUrl} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                )}
                {selectedItem.demoUrl && (
                  <a href={selectedItem.demoUrl} target="_blank" rel="noreferrer">
                    Demo
                  </a>
                )}
              </div>
            )}
          </article>
        ) : (
          <div className="detailEmpty">
            <h2>Select a card</h2>
            <p>Click a portfolio card to open the full story here.</p>
          </div>
        )}
      </aside>

      {isEditorOpen && (
        <div className="modalBackdrop" role="presentation">
          <form className="addModal" onSubmit={handleSaveItem} role="dialog" aria-modal="true" aria-label={editingId ? 'Edit portfolio item' : 'Add portfolio item'}>
            <div className="modalHeader">
              <div>
                <p className="eyebrow">{editingId ? 'Edit record' : 'New record'}</p>
                <h2>{editingId ? 'Edit portfolio item' : 'Add portfolio item'}</h2>
              </div>
              <button type="button" className="iconButton" onClick={closeEditor}>
                X
              </button>
            </div>

            <div className="formGrid">
              <label className="fieldLabel">
                Title
                <input required value={draft.title} onChange={(event) => updateDraft('title', event.target.value)} />
              </label>
              <label className="fieldLabel">
                Category
                <select value={draft.category} onChange={(event) => updateDraft('category', event.target.value as PortfolioCategory)}>
                  {categories.slice(1).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="formGrid">
              <label className="fieldLabel">
                Status
                <select value={draft.status} onChange={(event) => updateDraft('status', event.target.value as PortfolioStatus)}>
                  {editableStatuses.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <label className="fieldLabel">
                Thumbnail URL
                <input value={draft.thumbnailUrl} onChange={(event) => updateDraft('thumbnailUrl', event.target.value)} />
              </label>
            </div>

            <div className="thumbnailTools">
              <button type="button" className="secondaryButton" onClick={() => imageInputRef.current?.click()}>
                Upload Image
              </button>
              <button type="button" className="secondaryButton" onClick={() => updateDraft('thumbnailUrl', '')}>
                Clear Image
              </button>
              <input ref={imageInputRef} className="hiddenInput" type="file" accept="image/*" onChange={handleThumbnailFile} />
            </div>
            {draft.thumbnailUrl && <img className="thumbnailPreview" src={draft.thumbnailUrl} alt="" />}

            <label className="fieldLabel">
              Summary
              <textarea required rows={3} value={draft.summary} onChange={(event) => updateDraft('summary', event.target.value)} />
            </label>
            <label className="fieldLabel">
              Description
              <textarea required rows={4} value={draft.description} onChange={(event) => updateDraft('description', event.target.value)} />
            </label>
            <div className="formGrid">
              <label className="fieldLabel">
                Tech stack
                <input
                  required
                  value={draft.techStack}
                  onChange={(event) => updateDraft('techStack', event.target.value)}
                  placeholder="React, TypeScript, CSS"
                />
              </label>
              <label className="fieldLabel">
                Tags
                <input required value={draft.tags} onChange={(event) => updateDraft('tags', event.target.value)} placeholder="frontend, ui" />
              </label>
            </div>
            <label className="fieldLabel">
              Problem Solving
              <textarea required rows={3} value={draft.problemSolving} onChange={(event) => updateDraft('problemSolving', event.target.value)} />
            </label>
            <label className="fieldLabel">
              Learned
              <textarea required rows={3} value={draft.learned} onChange={(event) => updateDraft('learned', event.target.value)} />
            </label>
            <div className="formGrid">
              <label className="fieldLabel">
                GitHub URL
                <input value={draft.githubUrl} onChange={(event) => updateDraft('githubUrl', event.target.value)} />
              </label>
              <label className="fieldLabel">
                Demo URL
                <input value={draft.demoUrl} onChange={(event) => updateDraft('demoUrl', event.target.value)} />
              </label>
            </div>
            <label className="featuredToggle modalToggle">
              <input type="checkbox" checked={draft.featured} onChange={(event) => updateDraft('featured', event.target.checked)} />
              Featured project
            </label>

            <div className="modalActions">
              <button type="button" className="secondaryButton" onClick={closeEditor}>
                Cancel
              </button>
              <button type="submit" className="primaryButton">
                {editingId ? 'Save Changes' : 'Save Item'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default App
