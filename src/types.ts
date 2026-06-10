export type PortfolioCategory =
  | 'Project'
  | 'Activity'
  | 'Certificate'
  | 'Award'
  | 'Study'
  | 'Retrospective'

export type PortfolioStatus = 'Planning' | 'In Progress' | 'Done' | 'Archived'

export interface PortfolioItem {
  id: string
  title: string
  category: PortfolioCategory
  status: PortfolioStatus
  summary: string
  description: string
  techStack: string[]
  problemSolving: string
  learned: string
  tags: string[]
  githubUrl?: string
  demoUrl?: string
  thumbnailUrl?: string
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface MasonryCardPosition {
  id: string
  top: number
  left: number
  width: number
  height: number
}
