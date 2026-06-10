import { sampleItems } from '../data/sampleItems'
import type { PortfolioItem, PortfolioStatus } from '../types'

const STORAGE_KEY = 'foliovault.items.v1'
const statuses: PortfolioStatus[] = ['Planning', 'In Progress', 'Done', 'Archived']
const categories: PortfolioItem['category'][] = ['Project', 'Activity', 'Certificate', 'Award', 'Study', 'Retrospective']

function readString(record: Record<string, unknown>, key: string, fallback = '') {
  const value = record[key]
  return typeof value === 'string' ? value : fallback
}

function readStringArray(record: Record<string, unknown>, key: string) {
  const value = record[key]
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
}

function readStatus(record: Record<string, unknown>): PortfolioStatus {
  const value = record.status
  return typeof value === 'string' && statuses.includes(value as PortfolioStatus) ? (value as PortfolioStatus) : 'Done'
}

function readCategory(record: Record<string, unknown>): PortfolioItem['category'] {
  const value = record.category
  return typeof value === 'string' && categories.includes(value as PortfolioItem['category'])
    ? (value as PortfolioItem['category'])
    : 'Project'
}

export function normalizeItems(value: unknown): PortfolioItem[] {
  if (!Array.isArray(value)) return sampleItems

  return value
    .filter((item): item is Record<string, unknown> => item !== null && typeof item === 'object')
    .map((record, index) => {
      const createdAt = readString(record, 'createdAt', new Date().toISOString())
      const updatedAt = readString(record, 'updatedAt', createdAt)

      return {
        id: readString(record, 'id', `imported-${index}-${crypto.randomUUID()}`),
        title: readString(record, 'title', 'Untitled item'),
        category: readCategory(record),
        status: readStatus(record),
        summary: readString(record, 'summary'),
        description: readString(record, 'description'),
        techStack: readStringArray(record, 'techStack'),
        problemSolving: readString(record, 'problemSolving'),
        learned: readString(record, 'learned'),
        tags: readStringArray(record, 'tags'),
        githubUrl: readString(record, 'githubUrl') || undefined,
        demoUrl: readString(record, 'demoUrl') || undefined,
        thumbnailUrl: readString(record, 'thumbnailUrl') || undefined,
        featured: Boolean(record.featured),
        createdAt,
        updatedAt,
      }
    })
}

export function loadItems(): PortfolioItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return sampleItems

    const parsed = JSON.parse(raw)
    return normalizeItems(parsed)
  } catch {
    return sampleItems
  }
}

export function saveItems(items: PortfolioItem[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    return true
  } catch {
    console.warn('Failed to save items to localStorage (quota likely exceeded)')
    return false
  }
}
