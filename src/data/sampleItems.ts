import type { PortfolioItem } from '../types'

export const sampleItems: PortfolioItem[] = [
  {
    id: 'seed-foliovault',
    title: 'FolioVault Masonry Archive',
    category: 'Project',
    status: 'Done',
    summary:
      'A personal portfolio vault for collecting projects, study logs, certificates, and retrospectives in a responsive masonry board.',
    description:
      'Built a portfolio management interface that keeps fragmented achievements in one searchable place. The board estimates each card height before layout so the visual rhythm stays compact even when summaries have different lengths.',
    techStack: ['React', 'TypeScript', 'Vite', 'Pretext', 'CSS'],
    problemSolving:
      'The hardest part was making masonry placement deterministic while summary text remains fluid. Pretext-based text measurement feeds the placement engine before absolute positions are assigned.',
    learned:
      'Text metrics become much more useful when layout and data filtering are separated. The same height estimator can support search, filters, and responsive column changes.',
    tags: ['portfolio', 'masonry', 'frontend'],
    githubUrl: 'https://github.com/example/foliovault',
    demoUrl: 'https://example.com/foliovault',
    thumbnailUrl: '/thumbnails/foliovault.png',
    featured: true,
    createdAt: '2026-04-15T09:00:00.000Z',
    updatedAt: '2026-04-20T09:00:00.000Z',
  },
  {
    id: 'seed-study-react',
    title: 'React Rendering Notes',
    category: 'Study',
    status: 'In Progress',
    summary:
      'Collected notes about component boundaries, memoization, derived state, controlled inputs, and practical rendering performance checks.',
    description:
      'A study record focused on React mental models. It includes small experiments for state lifting, reducer-driven forms, and render tracing with browser devtools.',
    techStack: ['React', 'JavaScript', 'DevTools'],
    problemSolving:
      'Converted vague performance concerns into visible render traces and targeted component changes.',
    learned:
      'Most rendering issues became clearer after separating state ownership from display components.',
    tags: ['react', 'study', 'performance'],
    thumbnailUrl: '/thumbnails/react-notes.png',
    featured: false,
    createdAt: '2026-03-02T13:30:00.000Z',
    updatedAt: '2026-03-15T13:30:00.000Z',
  },
  {
    id: 'seed-cert-cloud',
    title: 'Cloud Practitioner Certificate',
    category: 'Certificate',
    status: 'Done',
    summary:
      'Validated core cloud concepts, billing models, IAM basics, deployment patterns, and shared responsibility boundaries.',
    description:
      'Prepared with daily quizzes and short architecture sketches. The certificate helped organize cloud terminology into a practical foundation for web deployment decisions.',
    techStack: ['Cloud', 'IAM', 'Networking'],
    problemSolving:
      'Mapped abstract service names to concrete deployment scenarios to make memorization less brittle.',
    learned:
      'Cost, observability, and identity design should be considered before the first production deployment.',
    tags: ['certificate', 'cloud', 'infra'],
    featured: true,
    createdAt: '2026-01-19T08:15:00.000Z',
    updatedAt: '2026-01-19T08:15:00.000Z',
  },
  {
    id: 'seed-hackathon',
    title: 'Campus Accessibility Hackathon',
    category: 'Activity',
    status: 'Archived',
    summary:
      'Collaborated on a map prototype that lets students report blocked ramps, broken elevators, and accessible route notes.',
    description:
      'The team built a clickable prototype and lightweight issue taxonomy during a weekend hackathon. I handled interaction flows and the report detail model.',
    techStack: ['Figma', 'React', 'Maps API'],
    problemSolving:
      'Reduced noisy user reports by adding issue categories, optional photos, and a status field.',
    learned:
      'Accessibility tools need maintenance workflows as much as discovery features.',
    tags: ['accessibility', 'hackathon', 'ux'],
    thumbnailUrl: '/thumbnails/hackathon.png',
    featured: false,
    createdAt: '2025-11-08T11:00:00.000Z',
    updatedAt: '2025-11-10T11:00:00.000Z',
  },
  {
    id: 'seed-retro',
    title: 'First Production Launch Retrospective',
    category: 'Retrospective',
    status: 'Done',
    summary:
      'A launch review covering scope control, QA checklists, analytics events, rollback planning, and communication habits.',
    description:
      'Wrote a structured retrospective after shipping a small product feature. The document separates what went well, what surprised the team, and what should become a repeatable launch checklist.',
    techStack: ['Product', 'QA', 'Analytics'],
    problemSolving:
      'Turned scattered launch stress into concrete checklist items and ownership notes.',
    learned:
      'A boring release plan is a gift to future teammates.',
    tags: ['retrospective', 'launch', 'process'],
    featured: true,
    createdAt: '2025-09-21T16:45:00.000Z',
    updatedAt: '2025-09-24T16:45:00.000Z',
  },
  {
    id: 'seed-award',
    title: 'Open Source Contribution Award',
    category: 'Award',
    status: 'Done',
    summary:
      'Recognized for documentation fixes, issue triage, and a small accessibility patch in an open source design tool.',
    description:
      'Contributed improvements to onboarding docs and fixed keyboard focus styling for a modal workflow. The maintainers highlighted the work in a community update.',
    techStack: ['TypeScript', 'CSS', 'A11y'],
    problemSolving:
      'Reproduced focus loss with keyboard-only navigation and added a regression checklist for the component.',
    learned:
      'Small, well-scoped open source contributions can have outsized community value.',
    tags: ['open-source', 'award', 'a11y'],
    featured: false,
    createdAt: '2025-07-12T10:10:00.000Z',
    updatedAt: '2025-07-12T10:10:00.000Z',
  },
]
