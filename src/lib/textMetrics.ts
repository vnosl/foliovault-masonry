import { layout, prepare } from '@chenglou/pretext'

const DEFAULT_LINE_HEIGHT = 20

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
  const textWidth = Math.max(160, width - 40)
  const approxCharsPerLine = Math.max(24, Math.floor(textWidth / 7.5))
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
  const techRows = Math.max(1, Math.ceil(techCount / 3))
  const tagRows = Math.max(1, Math.ceil(tagCount / 3))
  const thumbnailHeight = hasThumbnail ? Math.round((cardWidth - 36) * 0.56) + 12 : 0

  return 166 + thumbnailHeight + summaryHeight + techRows * 28 + tagRows * 26
}
