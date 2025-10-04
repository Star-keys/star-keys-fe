# Star Keys - Space Biology Library

**NASA Space Apps Challenge 2025** 프로젝트

우주생물학(Astrobiology) 분야의 학술 논문을 검색하고 시각화하는 웹 플랫폼입니다. 논문 간의 연결 관계를 네트워크 그래프로 표현하고, AI 기반 요약 기능을 제공합니다.

## 주요 기능

### 🔍 논문 검색
- 키워드 기반 학술 논문 검색
- 검색 결과 리스트 및 페이지네이션 (15개/페이지)
- 논문 메타데이터 표시 (제목, 키워드, PMC ID)

### 📊 네트워크 시각화
- D3.js 기반 대화형 논문 네트워크 그래프
- 키워드 기반 논문 간 연결 관계 시각화
- Force-directed graph layout

### 📄 논문 상세 정보
- 논문 제목, 저자, 발행연도, 본문 표시
- AI 기반 논문 요약 생성
- ScientistAgent 분석 기능

### 🪐 Planet 탐색
- **Planet #01**: 논문 검색 기능
- **Planet #02**: Coming Soon
- **Planet #03**: 팀 소개 및 NASA 리소스 링크

## 기술 스택

- **Framework**: Next.js 15.5.4 (App Router)
- **UI**: React 19.1.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Data Visualization**: D3.js 7.9.0
- **Build Tool**: Turbopack

## 시작하기

### 설치

```bash
npm install
```

### 환경 변수 설정

`.env.local` 파일을 프로젝트 루트에 생성하고 필요한 환경 변수를 설정하세요.

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
```

### 프로덕션 서버 실행

```bash
npm start
```

## 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx                    # 메인 페이지
│   ├── graph/                      # 네트워크 그래프 페이지
│   ├── paper/[id]/                 # 논문 상세 페이지
│   ├── planet/[id]/                # Planet 페이지 (검색/About)
│   │   └── paper/[paperId]/        # Planet 내 논문 상세
│   └── api/
│       ├── papers/                 # 논문 검색 API
│       └── paper/[id]/
│           └── summary/            # 논문 요약 API
├── components/
│   ├── ForceGraph.tsx              # D3 Force Graph 컴포넌트
│   └── PaperNetworkGraph.tsx      # 논문 네트워크 그래프
├── types/
│   └── paper.ts                    # 논문 타입 정의
└── utils/
    └── graphUtils.ts               # 그래프 유틸리티
```

## 주요 페이지

- `/` - 메인 페이지 (검색, 네트워크 그래프, Planet 소개)
- `/graph` - 논문 네트워크 그래프
- `/paper/[id]` - 논문 상세 정보
- `/planet/1` - 논문 검색
- `/planet/3` - About Us

## API 엔드포인트

- `GET /api/papers?q={query}` - 논문 검색
- `POST /api/paper/[id]/summary` - 논문 요약 생성

## 팀 소개

**Star Keys** - 다섯 명의 우주 탐험가들이 생명의 비밀을 풀어가는 팀입니다.

우리의 이름은 우리의 미션에서 유래했습니다: 별들 사이에 흩어진 생명의 숨겨진 열쇠를 찾는 것. 각각의 발견은 우주의 또 다른 미스터리를 여는 열쇠입니다.

## 관련 리소스

- [NASA Open Science Data Repository](https://science.nasa.gov/biological-physical/data/)
- [NASA Space Life Sciences Library](https://public.ksc.nasa.gov/nslsl/)
- [NASA Task Book](https://taskbook.nasaprs.com/tbp/welcome.cfm)
- [Open-Access Space Biology Publications](https://github.com/jgalazka/SB_publications/tree/main)

## Contact

문의사항은 [zoloman316@gmail.com](mailto:zoloman316@gmail.com)으로 연락주세요.

---

**Star Keys × NASA Space Apps Challenge 2025**
