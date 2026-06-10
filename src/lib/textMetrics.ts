import { layout, prepare } from '@chenglou/pretext'

/** Estimated average character width ratio for Inter at 14px (~7.5px per char) */
const CHAR_WIDTH_RATIO = 7.5
const DEFAULT_LINE_HEIGHT = 20
const CARD_HORIZONTAL_PADDING = 36 // 18px padding × 2
const CARD_BASE_HEIGHT = 166 // title + status + topline + gaps + padding
const TECH_ROW_HEIGHT = 28
const TAG_ROW_HEIGHT = 26
const THUMBNAIL_RATIO = 9 / 16 // height/width for 16:9 aspect
const THUMBNAIL_EXTRA_GAP = 12
const ITEMS_PER_ROW = 3

function readNumber(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined
}

function inferHeight(result: unknown, fallbackLines: number): number {
  if (result && typeof result === 'object') {
    const record = result as Record<string, unknown>
    const direct = readNumber(record.height)
    if (direct) return direct

    const size = record.size
    if (size && typeof size === 'object') {
      const fromSize = readNumber((size as Record<string, unknown>).height)
      if (fromSize) return fromSize
    }

    const lines = record.lines
    if (Array.isArray(lines) && lines.length > 0) {
      return lines.length * DEFAULT_LINE_HEIGHT
    }
  }

  return fallbackLines * DEFAULT_LINE_HEIGHT
}

export function measureSummaryHeight(summary: string, width: number): number {
  const textWidth = Math.max(160, width - CARD_HORIZONTAL_PADDING)
  const approxCharsPerLine = Math.max(24, Math.floor(textWidth / CHAR_WIDTH_RATIO))
  const fallbackLines = Math.max(2, Math.ceil(summary.length / approxCharsPerLine))

  try {
    const prepared = prepare(summary, {
      fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
      fontSize: 14,
      lineHeight: DEFAULT_LINE_HEIGHT,
    })
    const laidOut = layout(prepared, {
      width: textWidth,
      fontSize: 14,
      lineHeight: DEFAULT_LINE_HEIGHT,
    })

    return Math.ceil(inferHeight(laidOut, fallbackLines))
  } catch {
    return fallbackLines * DEFAULT_LINE_HEIGHT
  }
}

export function estimateCardHeight(
  summary: string,
  cardWidth: number,
  techCount: number,
  tagCount: number,
  hasThumbnail = false,
) {
  const summaryHeight = measureSummaryHeight(summary, cardWidth)
  const techRows = techCount > 0 ? Math.ceil(techCount / ITEMS_PER_ROW) : 0
  const tagRows = tagCount > 0 ? Math.ceil(tagCount / ITEMS_PER_ROW) : 0
  const thumbnailHeight = hasThumbnail
    ? Math.round((cardWidth - CARD_HORIZONTAL_PADDING) * THUMBNAIL_RATIO) + THUMBNAIL_EXTRA_GAP
    : 0

  return CARD_BASE_HEIGHT + thumbnailHeight + summaryHeight + techRows * TECH_ROW_HEIGHT + tagRows * TAG_ROW_HEIGHT
}
