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

const categoryLabels: Record<'All' | PortfolioCategory, string> = {
  All: '전체',
  Project: '프로젝트',
  Activity: '활동',
  Certificate: '자격증',
  Award: '수상',
  Study: '공부',
  Retrospective: '회고',
}

const statusLabels: Record<'All' | PortfolioStatus, string> = {
  All: '전체',
  Planning: '계획 중',
  'In Progress': '진행 중',
  Done: '완료',
  Archived: '보관됨',
}

const sortOptions = [
  { value: 'updated', label: '최근 수정순' },
  { value: 'newest', label: '최근 생성순' },
  { value: 'oldest', label: '오래된 생성순' },
  { value: 'title', label: '제목순' },
  { value: 'featured', label: '대표 항목 우선' },
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
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
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
  if (!Array.isArray(candidate)) throw new Error('올바른 백업 파일이 아닙니다.')
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
  const [detailOpen, setDetailOpen] = useState(false)

  useEffect(() => {
    const ok = saveItems(items)
    if (!ok) setNotice('저장 공간이 부족해 저장하지 못했습니다. JSON으로 백업해 주세요.')
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

  useEffect(() => {
    function handleGlobalKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'n') {
        event.preventDefault()
        openAddEditor()
        return
      }

      if (event.key === 'Escape' && detailOpen && !isEditorOpen) {
        setDetailOpen(false)
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [detailOpen, isEditorOpen])

  const tags = useMemo(() => {
    const allTags = items.flatMap((item) => item.tags)
    return Array.from(new Set(allTags)).sort((a, b) => a.localeCompare(b, 'ko-KR'))
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
          statusLabels[item.status],
          categoryLabels[item.category],
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
      if (sortBy === 'title') return a.title.localeCompare(b.title, 'ko-KR')
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
      setNotice('항목을 수정했습니다.')
    } else {
      const newItem = buildItemFromDraft()
      setItems((current) => [newItem, ...current])
      setSelectedId(newItem.id)
      setNotice('항목을 추가했습니다.')
    }

    closeEditor()
  }

  function handleDeleteItem(item: PortfolioItem) {
    const confirmed = window.confirm(`"${item.title}" 항목을 삭제할까요? 이 작업은 되돌릴 수 없습니다.`)
    if (!confirmed) return

    setItems((current) => current.filter((candidate) => candidate.id !== item.id))
    setSelectedId((current) => {
      if (current === item.id) {
        return items.find((i) => i.id !== item.id)?.id ?? null
      }
      return current
    })
    setNotice('항목을 삭제했습니다.')
  }

  function handleThumbnailFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setNotice('이미지 파일을 선택해 주세요.')
      return
    }

    if (file.size > 1_200_000) {
      setNotice('이미지가 너무 큽니다. 1.2MB 이하 파일을 선택해 주세요.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateDraft('thumbnailUrl', reader.result)
        setNotice('썸네일을 불러왔습니다.')
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
    setNotice('JSON 백업을 내보냈습니다.')
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
            `현재 ${items.length}개 항목이 가져온 ${importedItems.length}개 항목으로 대체됩니다. 계속할까요?`
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
        setNotice(`${importedItems.length}개 항목을 가져왔습니다.`)
      } catch {
        setNotice('가져오기에 실패했습니다. 올바른 FolioVault JSON 파일을 선택해 주세요.')
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
            <p className="eyebrow">개인 아카이브</p>
            <h1>FolioVault</h1>
          </div>
          <button className="primaryButton" onClick={openAddEditor}>
            항목 추가
          </button>
        </div>

        {notice && <div className="notice">{notice}</div>}

        <label className="fieldLabel">
          검색
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="제목, 기술, 태그 검색..."
            className="textInput"
          />
        </label>

        <div className="formGrid sidebarGrid">
          <label className="fieldLabel">
            정렬
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value as SortOption)}>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="fieldLabel">
            상태
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as 'All' | PortfolioStatus)}>
              {statuses.map((item) => (
                <option key={item} value={item}>
                  {statusLabels[item]}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="filterGroup">
          <p className="filterTitle">카테고리</p>
          <div className="categoryGrid">
            {categories.map((item) => (
              <button key={item} className={category === item ? 'chip active' : 'chip'} onClick={() => setCategory(item)}>
                {categoryLabels[item]}
              </button>
            ))}
          </div>
        </div>

        <label className="featuredToggle">
          <input type="checkbox" checked={featuredOnly} onChange={(event) => setFeaturedOnly(event.target.checked)} />
          대표 항목만
        </label>

        <div className="filterGroup">
          <div className="tagHeader">
            <p className="filterTitle">태그</p>
            {activeTag && (
              <button className="textButton" onClick={() => setActiveTag(null)}>
                초기화
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
            JSON 내보내기
          </button>
          <button className="secondaryButton" onClick={() => importInputRef.current?.click()}>
            JSON 가져오기
          </button>
          <input ref={importInputRef} className="hiddenInput" type="file" accept="application/json" onChange={handleImport} />
        </div>

        <div className="countPanel">
          <span>{filteredItems.length}</span>
          <p>표시 중인 카드</p>
        </div>
      </aside>

      <main className="boardArea">
        <div className="boardHeader">
          <div>
            <p className="eyebrow">Masonry 보드</p>
            <h2>포트폴리오 항목</h2>
          </div>
          <p>{masonry.columnCount}열</p>
        </div>

        <div ref={boardRef} className="masonryViewport">
          {filteredItems.length === 0 ? (
            <div className="emptyState">조건에 맞는 카드가 없습니다. 검색어나 필터를 바꿔보세요.</div>
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
                    onClick={() => {
                      setSelectedId(item.id)
                      setDetailOpen(true)
                    }}
                  >
                    {item.thumbnailUrl && (
                      <img className="cardThumb" src={item.thumbnailUrl} alt="" loading="lazy" onError={useFallbackThumbnail} />
                    )}
                    <div className="cardTopline">
                      <span className={`categoryPill ${item.category.toLowerCase()}`}>{categoryLabels[item.category]}</span>
                      {item.featured && <span className="featuredBadge">대표</span>}
                    </div>
                    <div className="statusLine">
                      <span className={`statusBadge ${item.status.toLowerCase().replaceAll(' ', '-')}`}>{statusLabels[item.status]}</span>
                      <span>{formatDate(item.updatedAt)} 수정</span>
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

      <aside className={detailOpen ? 'detailPanel open' : 'detailPanel'}>
        {selectedItem ? (
          <article>
            <button type="button" className="detailCloseButton" onClick={() => setDetailOpen(false)} aria-label="상세 패널 닫기">
              X
            </button>
            {selectedItem.thumbnailUrl && (
              <img className="detailThumb" src={selectedItem.thumbnailUrl} alt="" loading="lazy" onError={useFallbackThumbnail} />
            )}
            <div className="detailActions">
              <div className="detailMeta">
                <span className={`categoryPill ${selectedItem.category.toLowerCase()}`}>{categoryLabels[selectedItem.category]}</span>
                <span className={`statusBadge ${selectedItem.status.toLowerCase().replaceAll(' ', '-')}`}>{statusLabels[selectedItem.status]}</span>
                {selectedItem.featured && <span className="featuredBadge">대표</span>}
              </div>
              <div className="actionButtons">
                <button className="secondaryButton smallButton" onClick={() => openEditEditor(selectedItem)}>
                  수정
                </button>
                <button className="dangerButton smallButton" onClick={() => handleDeleteItem(selectedItem)}>
                  삭제
                </button>
              </div>
            </div>
            <h2>{selectedItem.title}</h2>
            <p className="detailDate">
              생성 {formatDate(selectedItem.createdAt)} · 수정 {formatDate(selectedItem.updatedAt)}
            </p>
            <p className="detailSummary">{selectedItem.summary}</p>

            <section>
              <h3>설명</h3>
              <p>{selectedItem.description}</p>
            </section>
            <section>
              <h3>문제 해결</h3>
              <p>{selectedItem.problemSolving}</p>
            </section>
            <section>
              <h3>배운 점</h3>
              <p>{selectedItem.learned}</p>
            </section>

            <section>
              <h3>기술 스택</h3>
              <div className="detailChips">
                {selectedItem.techStack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </section>

            <section>
              <h3>태그</h3>
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
                    데모
                  </a>
                )}
              </div>
            )}
          </article>
        ) : (
          <div className="detailEmpty">
            <h2>카드를 선택하세요</h2>
            <p>포트폴리오 카드를 클릭하면 전체 내용을 여기에서 볼 수 있습니다.</p>
          </div>
        )}
      </aside>

      {isEditorOpen && (
        <div className="modalBackdrop" role="presentation" onClick={closeEditor}>
          <form
            className="addModal"
            onSubmit={handleSaveItem}
            role="dialog"
            onClick={(event) => event.stopPropagation()}
            aria-modal="true"
            aria-label={editingId ? '포트폴리오 항목 수정' : '포트폴리오 항목 추가'}
          >
            <div className="modalHeader">
              <div>
                <p className="eyebrow">{editingId ? '기록 수정' : '새 기록'}</p>
                <h2>{editingId ? '포트폴리오 항목 수정' : '포트폴리오 항목 추가'}</h2>
              </div>
              <button type="button" className="iconButton" onClick={closeEditor} aria-label="닫기">
                X
              </button>
            </div>

            <div className="formGrid">
              <label className="fieldLabel">
                제목
                <input required value={draft.title} onChange={(event) => updateDraft('title', event.target.value)} />
              </label>
              <label className="fieldLabel">
                카테고리
                <select value={draft.category} onChange={(event) => updateDraft('category', event.target.value as PortfolioCategory)}>
                  {categories.slice(1).map((item) => (
                    <option key={item} value={item}>
                      {categoryLabels[item]}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="formGrid">
              <label className="fieldLabel">
                상태
                <select value={draft.status} onChange={(event) => updateDraft('status', event.target.value as PortfolioStatus)}>
                  {editableStatuses.map((item) => (
                    <option key={item} value={item}>
                      {statusLabels[item]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="fieldLabel">
                썸네일 URL
                <input value={draft.thumbnailUrl} onChange={(event) => updateDraft('thumbnailUrl', event.target.value)} />
              </label>
            </div>

            <div className="thumbnailTools">
              <button type="button" className="secondaryButton" onClick={() => imageInputRef.current?.click()}>
                이미지 업로드
              </button>
              <button type="button" className="secondaryButton" onClick={() => updateDraft('thumbnailUrl', '')}>
                이미지 지우기
              </button>
              <input ref={imageInputRef} className="hiddenInput" type="file" accept="image/*" onChange={handleThumbnailFile} />
            </div>
            {draft.thumbnailUrl && <img className="thumbnailPreview" src={draft.thumbnailUrl} alt="" />}

            <label className="fieldLabel">
              요약
              <textarea required rows={3} value={draft.summary} onChange={(event) => updateDraft('summary', event.target.value)} />
            </label>
            <label className="fieldLabel">
              설명
              <textarea required rows={4} value={draft.description} onChange={(event) => updateDraft('description', event.target.value)} />
            </label>
            <div className="formGrid">
              <label className="fieldLabel">
                기술 스택
                <input
                  required
                  value={draft.techStack}
                  onChange={(event) => updateDraft('techStack', event.target.value)}
                  placeholder="React, TypeScript, CSS"
                />
              </label>
              <label className="fieldLabel">
                태그
                <input required value={draft.tags} onChange={(event) => updateDraft('tags', event.target.value)} placeholder="frontend, ui" />
              </label>
            </div>
            <label className="fieldLabel">
              문제 해결
              <textarea required rows={3} value={draft.problemSolving} onChange={(event) => updateDraft('problemSolving', event.target.value)} />
            </label>
            <label className="fieldLabel">
              배운 점
              <textarea required rows={3} value={draft.learned} onChange={(event) => updateDraft('learned', event.target.value)} />
            </label>
            <div className="formGrid">
              <label className="fieldLabel">
                GitHub URL
                <input value={draft.githubUrl} onChange={(event) => updateDraft('githubUrl', event.target.value)} />
              </label>
              <label className="fieldLabel">
                데모 URL
                <input value={draft.demoUrl} onChange={(event) => updateDraft('demoUrl', event.target.value)} />
              </label>
            </div>
            <label className="featuredToggle modalToggle">
              <input type="checkbox" checked={draft.featured} onChange={(event) => updateDraft('featured', event.target.checked)} />
              대표 항목
            </label>

            <div className="modalActions">
              <button type="button" className="secondaryButton" onClick={closeEditor}>
                취소
              </button>
              <button type="submit" className="primaryButton">
                {editingId ? '변경사항 저장' : '항목 저장'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default App
