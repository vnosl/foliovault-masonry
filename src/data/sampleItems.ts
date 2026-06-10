import type { PortfolioItem } from '../types'

export const sampleItems: PortfolioItem[] = [
  {
    id: 'seed-foliovault',
    title: 'FolioVault 메이슨리 아카이브',
    category: 'Project',
    status: 'Done',
    summary:
      '프로젝트, 공부 기록, 자격증, 회고를 반응형 Masonry 보드에 모아 관리하는 개인 포트폴리오 저장소입니다.',
    description:
      '흩어진 성취와 기록을 검색 가능한 한 공간에 모으는 포트폴리오 관리 인터페이스를 만들었습니다. 요약 길이가 달라도 카드 높이를 미리 예측해 촘촘하고 안정적인 보드 흐름을 유지합니다.',
    techStack: ['React', 'TypeScript', 'Vite', 'Pretext', 'CSS'],
    problemSolving:
      '가장 어려웠던 부분은 요약 텍스트가 유동적으로 바뀌는 상황에서도 Masonry 배치를 예측 가능하게 유지하는 일이었습니다. Pretext 기반 텍스트 측정값을 배치 엔진에 전달한 뒤 absolute 위치를 계산했습니다.',
    learned:
      '텍스트 측정, 필터링, 레이아웃 계산을 분리하면 훨씬 다루기 쉬워진다는 점을 배웠습니다. 같은 높이 추정 로직이 검색, 필터, 반응형 열 변경에도 그대로 적용됩니다.',
    tags: ['포트폴리오', 'masonry', '프론트엔드'],
    githubUrl: 'https://github.com/example/foliovault',
    demoUrl: 'https://example.com/foliovault',
    thumbnailUrl: '/thumbnails/foliovault.png',
    featured: true,
    createdAt: '2026-04-15T09:00:00.000Z',
    updatedAt: '2026-04-20T09:00:00.000Z',
  },
  {
    id: 'seed-study-react',
    title: 'React 렌더링 노트',
    category: 'Study',
    status: 'In Progress',
    summary:
      '컴포넌트 경계, 메모이제이션, 파생 상태, 제어 입력, 렌더링 성능 점검 방법을 정리한 공부 기록입니다.',
    description:
      'React 사고 모델을 정리하기 위한 학습 기록입니다. 상태 끌어올리기, reducer 기반 폼, 브라우저 개발자 도구를 활용한 렌더 추적 실험을 포함합니다.',
    techStack: ['React', 'JavaScript', 'DevTools'],
    problemSolving:
      '막연했던 성능 걱정을 실제 렌더 추적으로 확인하고, 필요한 컴포넌트만 대상으로 개선했습니다.',
    learned:
      '대부분의 렌더링 문제는 상태 소유권과 표시 컴포넌트를 분리했을 때 훨씬 명확해졌습니다.',
    tags: ['react', '공부', '성능'],
    thumbnailUrl: '/thumbnails/react-notes.png',
    featured: false,
    createdAt: '2026-03-02T13:30:00.000Z',
    updatedAt: '2026-03-15T13:30:00.000Z',
  },
  {
    id: 'seed-cert-cloud',
    title: '클라우드 기초 자격증',
    category: 'Certificate',
    status: 'Done',
    summary:
      '클라우드 핵심 개념, 과금 모델, IAM 기초, 배포 패턴, 공동 책임 모델을 검증한 자격 기록입니다.',
    description:
      '매일 짧은 퀴즈와 아키텍처 스케치로 준비했습니다. 이 자격증을 통해 클라우드 용어를 웹 배포 의사결정에 필요한 실용적인 기반으로 정리할 수 있었습니다.',
    techStack: ['Cloud', 'IAM', 'Networking'],
    problemSolving:
      '추상적인 서비스 이름을 실제 배포 시나리오와 연결해 단순 암기에 그치지 않도록 만들었습니다.',
    learned:
      '첫 프로덕션 배포 전에 비용, 관측 가능성, 권한 설계를 함께 고려해야 한다는 점을 배웠습니다.',
    tags: ['자격증', 'cloud', 'infra'],
    featured: true,
    createdAt: '2026-01-19T08:15:00.000Z',
    updatedAt: '2026-01-19T08:15:00.000Z',
  },
  {
    id: 'seed-hackathon',
    title: '캠퍼스 접근성 해커톤',
    category: 'Activity',
    status: 'Archived',
    summary:
      '막힌 경사로, 고장 난 엘리베이터, 접근 가능한 동선 메모를 학생들이 제보할 수 있는 지도 프로토타입을 협업했습니다.',
    description:
      '주말 해커톤 동안 클릭 가능한 프로토타입과 가벼운 이슈 분류 체계를 만들었습니다. 저는 인터랙션 흐름과 제보 상세 모델을 담당했습니다.',
    techStack: ['Figma', 'React', 'Maps API'],
    problemSolving:
      '이슈 카테고리, 선택 사진, 상태 필드를 추가해 산만한 사용자 제보를 정리했습니다.',
    learned:
      '접근성 도구에는 발견 기능만큼이나 유지보수 흐름이 중요하다는 점을 배웠습니다.',
    tags: ['접근성', '해커톤', 'ux'],
    thumbnailUrl: '/thumbnails/hackathon.png',
    featured: false,
    createdAt: '2025-11-08T11:00:00.000Z',
    updatedAt: '2025-11-10T11:00:00.000Z',
  },
  {
    id: 'seed-retro',
    title: '첫 프로덕션 출시 회고',
    category: 'Retrospective',
    status: 'Done',
    summary:
      '범위 관리, QA 체크리스트, 분석 이벤트, 롤백 계획, 커뮤니케이션 습관을 돌아본 출시 회고입니다.',
    description:
      '작은 제품 기능을 배포한 뒤 구조화된 회고를 작성했습니다. 잘된 점, 예상 밖이었던 점, 반복 가능한 출시 체크리스트로 남길 점을 나눠 정리했습니다.',
    techStack: ['Product', 'QA', 'Analytics'],
    problemSolving:
      '출시 과정의 산발적인 긴장감을 구체적인 체크리스트와 담당자 메모로 바꿨습니다.',
    learned:
      '지루할 정도로 명확한 릴리스 계획은 미래의 팀원에게 큰 선물이 됩니다.',
    tags: ['회고', '출시', '프로세스'],
    featured: true,
    createdAt: '2025-09-21T16:45:00.000Z',
    updatedAt: '2025-09-24T16:45:00.000Z',
  },
  {
    id: 'seed-award',
    title: '오픈소스 기여상',
    category: 'Award',
    status: 'Done',
    summary:
      '오픈소스 디자인 도구에서 문서 개선, 이슈 정리, 접근성 패치를 진행한 공로를 인정받았습니다.',
    description:
      '온보딩 문서를 개선하고 모달 흐름의 키보드 포커스 스타일을 수정했습니다. 유지보수 팀이 커뮤니티 업데이트에서 해당 기여를 소개했습니다.',
    techStack: ['TypeScript', 'CSS', 'A11y'],
    problemSolving:
      '키보드만 사용하는 탐색에서 포커스가 사라지는 문제를 재현하고, 컴포넌트 회귀 체크리스트를 추가했습니다.',
    learned:
      '작고 범위가 명확한 오픈소스 기여도 커뮤니티에는 큰 가치를 만들 수 있습니다.',
    tags: ['오픈소스', '수상', 'a11y'],
    featured: false,
    createdAt: '2025-07-12T10:10:00.000Z',
    updatedAt: '2025-07-12T10:10:00.000Z',
  },
]
