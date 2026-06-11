# FolioVault

개인 포트폴리오 기록을 카드 형태로 저장하고 관리하는 React + TypeScript + Vite 웹앱입니다.

프로젝트, 활동, 자격증, 수상, 공부 기록, 회고 등을 카드로 등록할 수 있고, 카드들은 반응형 Masonry 레이아웃으로 배치됩니다. 카드를 클릭하면 오른쪽 상세 패널에서 전체 내용을 확인할 수 있습니다.

## 주요 기능

- 포트폴리오 샘플 카드 제공
- 카드 추가, 수정, 삭제
- 브라우저 `localStorage` 저장
- 검색 기능
- 카테고리 필터
- 상태 필터
- 태그 필터
- 대표 항목만 보기
- 정렬 기능
- 오른쪽 상세 패널
- 반응형 Masonry 카드 보드
- `@chenglou/pretext`의 `prepare()`, `layout()`을 활용한 요약 텍스트 높이 계산
- 썸네일 URL 입력 또는 로컬 이미지 업로드
- JSON 백업 및 복원

## 기술 스택

- React
- TypeScript
- Vite
- CSS
- `@chenglou/pretext`

## 실행하는 방법

### 1. Node.js 설치

먼저 Node.js가 설치되어 있어야 합니다.

아래 사이트에서 LTS 버전을 설치하세요.

<https://nodejs.org/>

설치 후 PowerShell 또는 터미널을 새로 열고 아래 명령어로 설치 여부를 확인합니다.

```bash
node -v
npm -v
```

버전 번호가 출력되면 정상입니다.

### 2. 프로젝트 다운로드

Git이 설치되어 있다면 아래 명령어로 프로젝트를 받을 수 있습니다.

```bash
git clone https://github.com/vnosl/foliovault-masonry.git
cd foliovault-masonry
```


### 3. 필요한 패키지 설치

프로젝트 폴더 안에서 아래 명령어를 실행합니다.

```bash
npm install
```

이 명령어는 프로젝트 실행에 필요한 React, Vite, TypeScript, Pretext 관련 패키지를 설치합니다.

### 4. 개발 서버 실행

설치가 끝나면 아래 명령어로 웹사이트를 실행합니다.

```bash
npm run dev
```

