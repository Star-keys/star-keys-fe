import type { Paper, GraphNode, GraphLink, GraphData } from '@/types/paper';

/**
 * Calculate the number of common keywords between two papers
 */
function getCommonKeywordsCount(keywords1: string[], keywords2: string[]): number {
  const set1 = new Set(keywords1);
  return keywords2.filter((keyword) => set1.has(keyword)).length;
}

/**
 * Transform paper data into graph data format for D3
 * Creates nodes from papers and links based on common keywords
 */
export function transformToGraphData(papers: Paper[]): GraphData {
  // Create nodes
  const nodes: GraphNode[] = papers.map((paper) => ({
    id: paper.id,
    title: paper.title,
    link: paper.link,
    pmcId: paper.pmcId,
    keywords: paper.keywords,
    keywordCount: paper.keywords.length,
  }));

  // Create links based on common keywords
  const links: GraphLink[] = [];

  for (let i = 0; i < papers.length; i++) {
    for (let j = i + 1; j < papers.length; j++) {
      const commonCount = getCommonKeywordsCount(
        papers[i].keywords,
        papers[j].keywords
      );

      // Only create link if papers have at least one common keyword
      if (commonCount > 0) {
        links.push({
          source: papers[i].id,
          target: papers[j].id,
          value: commonCount,
        });
      }
    }
  }

  return { nodes, links };
}

/**
 * Get unique keywords from all papers
 */
export function getAllKeywords(papers: Paper[]): string[] {
  const keywordSet = new Set<string>();
  papers.forEach((paper) => {
    paper.keywords.forEach((keyword) => keywordSet.add(keyword));
  });
  return Array.from(keywordSet).sort();
}

/**
 * Get color based on primary keyword category
 */
export function getNodeColor(keywords: string[]): string {
  // Define color mapping for keyword categories
  const colorMap: Record<string, string> = {
    'Microgravity': '#3b82f6', // blue
    'Space Mission': '#8b5cf6', // purple
    'Biomedical Research': '#10b981', // green
    'Mice': '#f59e0b', // amber
    'Training': '#ef4444', // red
    'In Vivo': '#ec4899', // pink
    'In Vitro': '#06b6d4', // cyan
  };

  // Find the first matching keyword category
  for (const keyword of keywords) {
    if (colorMap[keyword]) {
      return colorMap[keyword];
    }
  }

  // Default color
  return '#6b7280'; // gray
}
