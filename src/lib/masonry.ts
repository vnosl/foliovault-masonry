import type { MasonryCardPosition, PortfolioItem } from '../types'
import { estimateCardHeight } from './textMetrics'

const MIN_COLUMN_WIDTH = 276
const GAP = 18

export function getColumnCount(width: number) {
  if (width < 420) return 1
  return Math.max(1, Math.floor((width + GAP) / (MIN_COLUMN_WIDTH + GAP)))
}

export function buildMasonryLayout(items: PortfolioItem[], containerWidth: number) {
  const columnCount = getColumnCount(containerWidth)
  const cardWidth = Math.floor((containerWidth - GAP * (columnCount - 1)) / columnCount)
  const columnHeights = Array.from({ length: columnCount }, () => 0)
  const positionById = new Map<string, MasonryCardPosition>()

  for (const item of items) {
    const columnIndex = columnHeights.indexOf(Math.min(...columnHeights))
    const height = estimateCardHeight(
      item.summary,
      cardWidth,
      item.techStack.length,
      item.tags.length,
      Boolean(item.thumbnailUrl),
    )
    const top = columnHeights[columnIndex]
    const left = columnIndex * (cardWidth + GAP)

    positionById.set(item.id, {
      id: item.id,
      top,
      left,
      width: cardWidth,
      height,
    })

    columnHeights[columnIndex] += height + GAP
  }

  return {
    positionById,
    height: Math.max(0, ...columnHeights) - GAP,
    columnCount,
  }
}
