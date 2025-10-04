# Star Keys - Space Biology Library

**NASA Space Apps Challenge 2025** Project

A web platform for searching and visualizing academic papers in Astrobiology. It represents the relationships between papers using a network graph and provides AI-based summarization features.

## Key Features

### 🔍 Paper Search
- Keyword-based academic paper search
- Search results list with pagination (15 papers/page)
- Display paper metadata (title, keywords, PMC ID)

### 📊 Network Visualization
- Interactive paper network graph powered by D3.js
- Visualization of keyword-based connections between papers
- Force-directed graph layout

### 📄 Paper Details
- Display paper title, authors, publication year, and full text
- AI-generated paper summaries
- ScientistAgent analysis feature

### 🪐 Planet Exploration
- **Planet #01**: Paper search functionality
- **Planet #02**: Coming Soon
- **Planet #03**: Team introduction and NASA resource links

## Tech Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **UI**: React 19.1.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Data Visualization**: D3.js 7.9.0
- **Build Tool**: Turbopack

## Getting Started

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root and configure the required environment variables.

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Build

```bash
npm run build
```

### Production Server

```bash
npm start
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Main page
│   ├── graph/                      # Network graph page
│   ├── paper/[id]/                 # Paper detail page
│   ├── planet/[id]/                # Planet pages (Search/About)
│   │   └── paper/[paperId]/        # Paper detail within Planet
│   └── api/
│       ├── papers/                 # Paper search API
│       └── paper/[id]/
│           └── summary/            # Paper summary API
├── components/
│   ├── ForceGraph.tsx              # D3 Force Graph component
│   └── PaperNetworkGraph.tsx      # Paper network graph
├── types/
│   └── paper.ts                    # Paper type definitions
└── utils/
    └── graphUtils.ts               # Graph utilities
```

## Main Pages

- `/` - Main page (search, network graph, planet introduction)
- `/graph` - Paper network graph
- `/paper/[id]` - Paper details
- `/planet/1` - Paper search
- `/planet/3` - About Us

## API Endpoints

- `GET /api/papers?q={query}` - Search papers
- `POST /api/paper/[id]/summary` - Generate paper summary

## Team

**Star Keys** - A team of five space explorers unlocking the secrets of life.

Our name comes from our mission: to find the hidden keys of life scattered among the stars. Each discovery is a key that unlocks another mystery of the universe.

## Related Resources

- [NASA Open Science Data Repository](https://science.nasa.gov/biological-physical/data/)
- [NASA Space Life Sciences Library](https://public.ksc.nasa.gov/nslsl/)
- [NASA Task Book](https://taskbook.nasaprs.com/tbp/welcome.cfm)
- [Open-Access Space Biology Publications](https://github.com/jgalazka/SB_publications/tree/main)

## Contact

For inquiries, please contact [zoloman316@gmail.com](mailto:zoloman316@gmail.com).

---

**Star Keys × NASA Space Apps Challenge 2025**
