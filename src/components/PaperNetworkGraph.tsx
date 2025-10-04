'use client';

import { useEffect, useState } from 'react';
import ForceGraph from '@/components/ForceGraph';
import type { Paper } from '@/types/paper';
import { transformToGraphData } from '@/utils/graphUtils';
import type { GraphData } from '@/types/paper';

interface PaperNetworkGraphProps {
  width?: number;
  height?: number;
}

export default function PaperNetworkGraph({ width = 1200, height = 600 }: PaperNetworkGraphProps) {
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGraphData() {
      try {
        setLoading(true);
        const response = await fetch('/api/papers');
        if (!response.ok) {
          throw new Error('Failed to fetch papers');
        }
        const data = await response.json();
        const allPapers: Paper[] = data.papers;

        // Sort by keyword count and take middle 200
        const sorted = allPapers.sort((a, b) => b.keywords.length - a.keywords.length);
        const startIndex = Math.floor((sorted.length - 200) / 2);
        const middlePapers = sorted.slice(startIndex, startIndex + 200);

        // Transform papers to graph data
        const graph = transformToGraphData(middlePapers);
        setGraphData(graph);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchGraphData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center" style={{ height }}>
        <p className="text-gray-600">Loading graph...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center" style={{ height }}>
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return <ForceGraph data={graphData} width={width} height={height} />;
}
