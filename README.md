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

## 처음 받은 사람이 실행하는 방법

### 1. Node.js 설치

먼저 Node.js가 설치되어 있어야 합니다.

아래 사이트에서 **LTS 버전**을 설치하세요.

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

Git을 사용하지 않는다면 GitHub 페이지에서 **Code > Download ZIP**으로 내려받은 뒤 압축을 풀고, 압축을 푼 폴더에서 터미널을 열면 됩니다.

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

정상 실행되면 터미널에 아래와 비슷한 주소가 표시됩니다.

```text
Local: http://localhost:5173/
```

브라우저에서 터미널에 표시된 `Local` 주소를 열면 FolioVault를 사용할 수 있습니다.

포트 `5173`이 이미 사용 중이면 `5174`, `5175`처럼 다른 번호가 나올 수 있습니다. 반드시 터미널에 실제로 표시된 주소를 열어야 합니다.

### 5. 서버 종료

개발 서버를 종료하려면 실행 중인 터미널에서 아래 키를 누릅니다.

```text
Ctrl + C
```

종료 여부를 묻는 메시지가 나오면 `Y`를 입력하고 Enter를 누르면 됩니다.

## 빌드 방법

배포용 파일을 만들고 싶다면 아래 명령어를 실행합니다.

```bash
npm run build
```

빌드가 성공하면 `dist` 폴더가 생성됩니다.

## 빌드 결과 미리보기

빌드된 결과를 로컬에서 확인하려면 아래 명령어를 실행합니다.

```bash
npm run preview
```

터미널에 표시되는 `Local` 주소를 브라우저에서 열면 빌드 결과를 확인할 수 있습니다.

## 데이터 저장 방식

이 프로젝트는 별도의 백엔드를 사용하지 않습니다.

사용자가 추가하거나 수정한 카드 데이터는 브라우저의 `localStorage`에 저장됩니다. 따라서 같은 브라우저에서는 새로고침 후에도 데이터가 유지됩니다.

다른 브라우저나 다른 컴퓨터로 데이터를 옮기고 싶다면 앱 안의 **JSON 내보내기**와 **JSON 가져오기** 기능을 사용하면 됩니다.

## 프로젝트 구조

```text
src/
  App.tsx
  types.ts
  data/
    sampleItems.ts
  lib/
    masonry.ts
    storage.ts
    textMetrics.ts
  styles.css
```

- `src/App.tsx`: 화면 구성, 검색, 필터, 카드 추가/수정/삭제 등 주요 UI 로직
- `src/data/sampleItems.ts`: 처음 표시되는 샘플 카드 데이터
- `src/lib/textMetrics.ts`: Pretext를 사용한 요약 텍스트 높이 계산
- `src/lib/masonry.ts`: Masonry 레이아웃 배치 계산
- `src/lib/storage.ts`: localStorage 저장 및 불러오기
- `src/styles.css`: 전체 UI 스타일

## Pretext 사용 위치

카드 요약 텍스트의 높이는 `src/lib/textMetrics.ts`에서 계산합니다.

`@chenglou/pretext`의 `prepare()`와 `layout()`을 사용해 요약 텍스트가 카드 너비 안에서 차지할 높이를 추정하고, 이 값을 카드 전체 예상 높이에 더합니다.

이 예상 높이는 `src/lib/masonry.ts`에서 Masonry 배치를 계산할 때 사용됩니다.

## 실행 중 문제가 생겼을 때

### `npm` 명령어를 찾을 수 없다고 나오는 경우

Node.js가 설치되지 않았거나 터미널을 설치 전에 열어둔 상태일 수 있습니다.

Node.js LTS 버전을 설치한 뒤 PowerShell 또는 터미널을 새로 열고 다시 시도하세요.

### `npm install`에서 오류가 나는 경우

기존 설치 파일을 지우고 다시 설치해볼 수 있습니다.

```bash
rm -rf node_modules package-lock.json
npm install
```

Windows PowerShell에서는 아래처럼 실행할 수 있습니다.

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

### 화면에 예전 카드가 계속 보이는 경우

FolioVault는 `localStorage`를 사용하기 때문에 브라우저에 이전 데이터가 남아 있을 수 있습니다.

브라우저 개발자 도구에서 localStorage를 삭제하거나, 앱의 JSON 가져오기 기능으로 새 데이터를 불러오면 됩니다.
