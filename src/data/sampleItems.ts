import type { PortfolioItem } from '../types'

export const sampleItems: PortfolioItem[] = [
  {
    id: 'seed-career-gate',
    title: 'MY CAREER GATE 진로 포트폴리오 웹사이트',
    category: 'Project',
    status: 'Done',
    summary:
      'Unreal Engine Game Developer라는 목표를 중심으로 자기소개, 성장 과정, 프로젝트 경험, 기술 역량, 향후 계획을 정리한 개인 진로 포트폴리오 웹사이트입니다.',
    description:
      'HTML, CSS, JavaScript를 사용해 단일 페이지 포트폴리오 사이트를 제작했습니다. HOME, 구성, 소개, 성장, 프로젝트, 역량, 기술/기업, 이슈, 계획 섹션으로 나누어 진로 목표와 관련 경험을 한 흐름으로 보여주도록 구성했습니다. 사용자가 스크롤하며 자연스럽게 내용을 읽을 수 있도록 섹션별 카드, 히어로 영역, Quick Profile 모달, 모바일 메뉴를 포함했습니다.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Responsive UI'],
    problemSolving:
      '많은 텍스트를 단순히 나열하면 읽기 어렵기 때문에 섹션을 명확히 나누고, 카드형 구성과 네비게이션 앵커를 활용해 사용자가 원하는 내용으로 빠르게 이동할 수 있도록 설계했습니다. 모바일에서도 메뉴와 섹션이 무너지지 않도록 반응형 스타일을 적용했습니다.',
    learned:
      '포트폴리오 사이트는 예쁘게 만드는 것만큼 정보 구조가 중요하다는 점을 배웠습니다. 진로 목표, 경험, 역량, 계획을 연결해서 보여주면 단순한 자기소개보다 설득력이 높아진다는 것을 느꼈습니다.',
    tags: ['진로포트폴리오', '웹사이트', '게임개발', '자기소개'],
    thumbnailUrl: '/thumbnails/foliovault.png',
    featured: true,
    createdAt: '2026-05-31T12:00:00.000Z',
    updatedAt: '2026-05-31T12:00:00.000Z',
  },
  {
    id: 'seed-bouncing-over-it',
    title: 'Bouncing Over It Unreal Engine 팀 프로젝트',
    category: 'Project',
    status: 'Done',
    summary:
      '객체지향프로그래밍 수업에서 Unreal Engine과 C++를 활용해 진행한 3D 플랫포머 게임 팀 프로젝트입니다.',
    description:
      '팀장 역할을 맡아 Bouncing Over It이라는 3D 플랫포머 게임을 기획하고 개발했습니다. Getting Over It과 바운스 계열 게임에서 모티브를 얻어, 플레이어가 물리 반응과 충돌을 활용해 장애물을 넘어가는 게임을 목표로 했습니다. 팀원 모두가 게임 개발에 관심이 있었기 때문에 Unreal Engine을 사용한 C++ 기반 게임 제작으로 방향을 정했습니다.',
    techStack: ['Unreal Engine', 'C++', '3D Platformer', 'Physics', 'Collision'],
    problemSolving:
      '프로젝트 초반에는 Unreal Engine과 Visual Studio 2022 환경 설정이 가장 큰 문제였습니다. C++ 프로젝트 생성, 빌드 설정, IDE 연동 과정에서 오류가 발생했고, 공식 문서와 여러 자료를 확인하며 설정 요소를 하나씩 점검했습니다. 해결 과정을 팀원들과 공유해 같은 문제로 시간을 낭비하지 않도록 했습니다.',
    learned:
      '게임 개발에서 문제 해결은 단순히 오류 하나를 고치는 일이 아니라, 원인을 찾고 해결 과정을 정리해 팀과 공유하는 과정까지 포함된다는 점을 배웠습니다. 또한 초기 개발 환경 설정이 프로젝트 진행 속도에 큰 영향을 준다는 것도 알게 되었습니다.',
    tags: ['unreal', 'c++', '팀프로젝트', '3d게임', '물리'],
    thumbnailUrl: '/thumbnails/hackathon.png',
    featured: true,
    createdAt: '2026-05-20T09:00:00.000Z',
    updatedAt: '2026-05-31T09:00:00.000Z',
  },
  {
    id: 'seed-unreal-troubleshooting',
    title: 'Unreal Engine 초기 설정 문제 해결 기록',
    category: 'Retrospective',
    status: 'Done',
    summary:
      'Unreal Engine C++ 프로젝트를 처음 구성하면서 Visual Studio 2022 연동과 빌드 오류를 해결한 경험을 정리했습니다.',
    description:
      'Unreal Engine을 처음 사용하면서 프로젝트 생성과 C++ 파일 작성 단계에서 빌드가 되지 않거나 IDE가 정상적으로 동작하지 않는 문제가 발생했습니다. 처음에는 오류 메시지를 어떻게 해석해야 할지 몰라 막막했지만, Visual Studio 설치 구성 요소, Unreal Engine 버전, C++ 프로젝트 생성 방식, 빌드 설정을 차례대로 확인하며 원인을 좁혀갔습니다.',
    techStack: ['Unreal Engine', 'Visual Studio 2022', 'C++', 'Build Setting'],
    problemSolving:
      '오류 메시지를 그대로 넘기지 않고, 어떤 설정이 필요한지 항목별로 정리했습니다. 이후 같은 오류가 팀원에게도 발생할 수 있다고 판단해 해결 순서와 확인해야 할 설정을 팀에 공유했습니다.',
    learned:
      '개발 환경 문제는 코드 실력과 별개로 프로젝트를 멈추게 만들 수 있다는 점을 배웠습니다. 앞으로는 새 기술을 사용할 때 설치 환경, 버전, 필수 구성 요소를 먼저 문서화하는 습관을 가져야겠다고 느꼈습니다.',
    tags: ['문제해결', 'unreal', 'visualstudio', '빌드오류'],
    featured: false,
    createdAt: '2026-05-21T10:00:00.000Z',
    updatedAt: '2026-05-24T10:00:00.000Z',
  },
  {
    id: 'seed-team-leader-collaboration',
    title: '팀장 역할과 협업 갈등 조율 경험',
    category: 'Activity',
    status: 'Done',
    summary:
      'Bouncing Over It 프로젝트에서 역할 분담, 일정 관리, 팀원 간 참여도 차이를 조율하며 팀장으로 성장한 경험입니다.',
    description:
      '프로젝트 초반에는 어떤 기능을 누가 맡고 언제까지 구현할지 구체적으로 정하지 못해 진행 속도와 참여도에 차이가 생겼습니다. 팀장으로서 현재 상황을 공유하고, 각자의 생각을 이야기하는 시간을 만들었습니다. 이후 기능 목록과 역할, 마감 시점을 더 명확히 정리하면서 프로젝트가 다시 진행될 수 있도록 조율했습니다.',
    techStack: ['Team Leading', 'Communication', 'Planning', 'Game Project'],
    problemSolving:
      '처음에는 기능 구현에만 집중했지만, 프로젝트가 진행될수록 역할과 일정이 명확하지 않은 것이 결과물에 영향을 준다는 것을 발견했습니다. 팀원들과 직접 대화하며 부담을 조정하고, 각자가 맡은 일을 다시 정리했습니다.',
    learned:
      '팀 프로젝트에서 팀장의 역할은 모든 것을 혼자 해결하는 것이 아니라, 팀원이 같은 방향을 보고 움직일 수 있도록 상황을 정리하고 소통을 만드는 일이라는 점을 배웠습니다.',
    tags: ['협업', '팀장', '갈등조율', '일정관리'],
    featured: true,
    createdAt: '2026-05-25T11:00:00.000Z',
    updatedAt: '2026-05-31T11:00:00.000Z',
  },
  {
    id: 'seed-coding-motivation',
    title: 'Visual Basic 경험에서 시작된 게임 개발 관심',
    category: 'Retrospective',
    status: 'Done',
    summary:
      '고등학생 시절 상업경진대회를 준비하며 Visual Basic을 배우고, 코드가 화면에서 실제로 동작하는 경험을 통해 개발에 관심을 갖게 된 기록입니다.',
    description:
      '처음에는 코딩을 어렵고 낯선 것으로만 생각했지만, Visual Basic으로 작은 프로그램을 만들면서 생각이 바뀌었습니다. 데이터를 입력하고 버튼을 눌렀을 때 특정 기능이 실행되며 결과가 화면에 반영되는 과정을 보면서, 코딩이 단순한 글자 입력이 아니라 원하는 기능을 만들고 컴퓨터에게 일을 시키는 방법이라는 것을 알게 되었습니다.',
    techStack: ['Visual Basic', 'Programming Basics', 'Problem Solving'],
    problemSolving:
      '처음에는 문제를 이해하지 못해 답을 외우는 방식으로 접근했지만, 시간이 지나면서 문법과 데이터 처리 흐름을 이해하려고 노력했습니다. 이 과정에서 스스로 문제를 풀어냈을 때의 성취감을 경험했습니다.',
    learned:
      '작은 성공 경험이 진로 선택에 큰 영향을 줄 수 있다는 것을 배웠습니다. 이후 게임을 단순히 즐기는 입장이 아니라 구조를 분석하고 직접 만들어보고 싶은 대상으로 바라보게 되었습니다.',
    tags: ['성장과정', 'visualbasic', '진로동기', '코딩입문'],
    featured: false,
    createdAt: '2026-05-10T09:00:00.000Z',
    updatedAt: '2026-05-18T09:00:00.000Z',
  },
  {
    id: 'seed-unreal-unity-competency',
    title: 'Unreal 3D와 Unity 2D 게임 개발 역량 정리',
    category: 'Study',
    status: 'In Progress',
    summary:
      'Unreal Engine 3D 프로젝트와 Unity 2D 프로젝트 경험을 비교하며 게임 개발에 공통적으로 필요한 구조를 정리했습니다.',
    description:
      'Unreal Engine으로는 3D 공간에서의 캐릭터 조작, 물리 반응, 충돌 처리, 카메라 시점을 경험했고, Unity로는 2D 오브젝트 이동, UI 구성, 씬 전환, 아이템 상호작용 등을 경험했습니다. 두 엔진은 사용 방식이 다르지만 입력 처리, 오브젝트 상태 변화, 충돌 처리, UI 표시, 게임 규칙 구현은 공통적으로 중요하다는 점을 정리했습니다.',
    techStack: ['Unreal Engine', 'Unity', 'C++', 'C#', 'Game UI'],
    problemSolving:
      '엔진별 기능 이름이나 작업 방식에만 집중하면 전체 구조를 놓칠 수 있다고 판단했습니다. 그래서 특정 엔진보다 플레이어 경험을 중심으로 필요한 기능을 분류하고, 공통 개념을 정리했습니다.',
    learned:
      '게임 개발자는 하나의 엔진 사용법만 외우는 것이 아니라, 플레이어 입력과 게임 오브젝트, 상태 변화, UI, 규칙 구현이 어떻게 연결되는지 이해해야 한다는 점을 배웠습니다.',
    tags: ['unreal', 'unity', '게임개발역량', 'ui', '충돌처리'],
    thumbnailUrl: '/thumbnails/react-notes.png',
    featured: false,
    createdAt: '2026-05-26T08:30:00.000Z',
    updatedAt: '2026-05-31T08:30:00.000Z',
  },
  {
    id: 'seed-ai-code-security',
    title: 'AI 생성 코드와 보안 취약점 이슈 분석',
    category: 'Study',
    status: 'Done',
    summary:
      'AI 코딩 도구가 생성한 코드에서 발생할 수 있는 보안 취약점 문제를 조사하고, 개발자가 직접 검토해야 하는 이유를 정리했습니다.',
    description:
      'ChatGPT, GitHub Copilot과 같은 AI 코딩 도구는 반복 작업을 줄이고 빠르게 아이디어를 구현하는 데 도움을 준다. 그러나 AI가 생성한 코드가 항상 안전한 것은 아니며, 입력값 검증 부족, SQL Injection, XSS, 명령어 삽입, 인증 정보 하드코딩 같은 문제가 발생할 수 있다. 게임 개발에서도 로그인, 계정 정보, 서버 통신, 결제, 아이템 데이터처럼 보안이 필요한 기능이 있으므로 AI 코드 검토가 중요하다고 정리했습니다.',
    techStack: ['AI Coding Tool', 'Security', 'Code Review', 'GitHub Copilot'],
    problemSolving:
      'AI를 무조건 배제하거나 그대로 신뢰하는 대신, 개발자가 코드의 의미를 이해하고 보안 관점에서 검토해야 한다는 관점으로 정리했습니다. 입력 검증, 예외 처리, 인증 처리, 보안 검사 도구 활용을 주요 대응 방법으로 제시했습니다.',
    learned:
      'AI는 개발자를 대체하는 도구라기보다 보조 도구에 가깝다는 점을 배웠습니다. 빠르게 코드를 만드는 능력보다, 생성된 코드의 문제점을 판단하고 안전하게 개선하는 능력이 더 중요하다고 느꼈습니다.',
    tags: ['ai', '보안', '코드리뷰', '개발이슈'],
    featured: false,
    createdAt: '2026-05-28T13:00:00.000Z',
    updatedAt: '2026-05-31T13:00:00.000Z',
  },
  {
    id: 'seed-game-dev-future-plan',
    title: 'Unreal Engine 게임 개발자 성장 계획',
    category: 'Study',
    status: 'Planning',
    summary:
      'Unreal Engine 기초 정리, C++ 학습, 미니 게임 제작, 팀 프로젝트 개선, 취업 포트폴리오 정리를 포함한 향후 계획입니다.',
    description:
      '앞으로는 Unreal Engine의 기본 기능을 다시 정리하고, C++ 객체지향 개념을 게임 기능과 연결해 학습할 계획입니다. 이후 작은 규모라도 완성 가능한 미니 게임을 제작하고, 캐릭터 이동, 카메라 조작, 상호작용, UI, 게임 종료 조건 등을 포함해 실제 플레이 가능한 결과물을 만드는 것을 목표로 합니다. 또한 팀 프로젝트에서는 초반 역할 분담과 일정 관리를 더 명확히 하며, 제작한 결과물을 포트폴리오로 정리할 계획입니다.',
    techStack: ['Unreal Engine', 'C++', 'Blueprint', 'Portfolio', 'Career Plan'],
    problemSolving:
      '지금까지의 프로젝트에서 초기 환경 설정, 역할 분담, 일정 관리가 부족하면 결과물 완성도가 낮아질 수 있다는 점을 경험했습니다. 따라서 다음 프로젝트에서는 학습 계획과 구현 계획을 작게 나누고, 중간 점검을 반복하는 방식으로 개선하려고 합니다.',
    learned:
      '목표를 크게 잡는 것보다 작더라도 완성 가능한 결과물을 만드는 것이 중요하다고 느꼈습니다. 완성한 결과물과 문제 해결 과정을 기록하면 취업 포트폴리오로도 활용할 수 있습니다.',
    tags: ['futureplan', 'unreal', 'c++', '취업준비', '포트폴리오'],
    featured: true,
    createdAt: '2026-05-31T15:00:00.000Z',
    updatedAt: '2026-05-31T15:00:00.000Z',
  },
  {
    id: 'seed-game-company-research',
    title: 'Smilegate와 Epic Games 기업 조사',
    category: 'Study',
    status: 'Done',
    summary:
      '게임 개발 직무와 연결되는 기업으로 Smilegate와 Epic Games를 조사하고, Unreal Engine 개발자 진로와의 관련성을 정리했습니다.',
    description:
      'Smilegate는 다양한 게임과 콘텐츠를 통해 사용자에게 즐거움을 제공하는 국내 게임 기업으로, 게임 개발 직무와 직접적으로 연결되는 회사라고 판단했습니다. Epic Games는 Unreal Engine을 개발한 기업으로, Unreal Engine 게임 개발자를 목표로 하는 진로와 기술적으로 가장 밀접하게 연결됩니다.',
    techStack: ['Company Research', 'Smilegate', 'Epic Games', 'Unreal Engine'],
    problemSolving:
      '단순히 유명한 기업을 나열하는 대신, 내가 목표로 하는 Unreal Engine Game Developer 직무와 어떤 점에서 연결되는지 중심으로 정리했습니다. 기업의 기술, 채용 방향, 개발 문화가 진로 목표와 어떤 관련이 있는지 살펴보았습니다.',
    learned:
      '관심 기업 조사는 취업 정보 확인뿐 아니라 내가 어떤 기술을 더 배워야 하는지 파악하는 과정이 될 수 있다는 점을 배웠습니다.',
    tags: ['기업조사', 'smilegate', 'epicgames', '진로'],
    featured: false,
    createdAt: '2026-05-29T16:00:00.000Z',
    updatedAt: '2026-05-31T16:00:00.000Z',
  },
]
