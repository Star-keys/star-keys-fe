'use client';

import { useEffect, useState } from 'react';
import ForceGraph from '@/components/ForceGraph';
import type { Paper } from '@/types/paper';
import { transformToGraphData } from '@/utils/graphUtils';
import type { GraphData } from '@/types/paper';

export default function GraphPage() {
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPapers() {
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

    fetchPapers();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Paper Network Graph</h1>
          <p className="text-gray-600">
            Explore relationships between research papers based on shared keywords
          </p>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-96">
            <div className="text-lg text-gray-600">Loading graph...</div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">Error: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-4 bg-white border border-gray-200 rounded-lg p-4">
              <h2 className="font-semibold mb-2">Graph Information</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Papers:</span>{' '}
                  <span className="font-medium">{graphData.nodes.length}</span>
                </div>
                <div>
                  <span className="text-gray-600">Connections:</span>{' '}
                  <span className="font-medium">{graphData.links.length}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 mb-4">
              <h2 className="font-semibold mb-2">How to use:</h2>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <strong>Drag</strong> nodes to rearrange the graph</li>
                <li>• <strong>Scroll</strong> to zoom in/out</li>
                <li>• <strong>Click</strong> on a node to view paper details</li>
                <li>• <strong>Hover</strong> over a node to see a quick preview</li>
                <li>• Node size indicates the number of keywords</li>
                <li>• Link thickness indicates the number of shared keywords</li>
              </ul>
            </div>

            <div className="flex justify-center">
              <ForceGraph data={graphData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
