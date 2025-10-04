export interface Paper {
  id: string;
  title: string;
  link: string;
  pmcId: string;
  keywords: string[];
}

export interface GraphNode {
  id: string;
  title: string;
  link: string;
  pmcId: string;
  keywords: string[];
  keywordCount: number;
}

export interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  value: number; // number of common keywords
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

// D3 simulation node with position
export interface SimulationNode extends GraphNode {
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

// D3 simulation link
export interface SimulationLink extends GraphLink {
  source: SimulationNode | string;
  target: SimulationNode | string;
}
