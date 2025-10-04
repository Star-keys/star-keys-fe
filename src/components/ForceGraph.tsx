'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import type { GraphData, GraphNode, SimulationNode, SimulationLink } from '@/types/paper';
import { getNodeColor } from '@/utils/graphUtils';

interface ForceGraphProps {
  data: GraphData;
  width?: number;
  height?: number;
}

export default function ForceGraph({ data, width = 1200, height = 800 }: ForceGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [focusMode, setFocusMode] = useState(false);
  const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null);

  // Handle ESC key to exit focus mode
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && focusMode) {
        setFocusMode(false);
        setFocusedNodeId(null);
        setSelectedNode(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusMode]);

  useEffect(() => {
    if (!svgRef.current || !data.nodes.length) return;

    // Clear previous graph
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current);

    // Create main group for zoom/pan
    const g = svg.append('g');

    // Create zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    // Set initial zoom level (0.5 = 50% zoom out)
    const initialTransform = d3.zoomIdentity
      .translate(width / 2, height / 2)
      .scale(0.5)
      .translate(-width / 2, -height / 2);

    svg.call(zoom).call(zoom.transform, initialTransform);

    // Create force simulation
    const simulation = d3.forceSimulation<SimulationNode>(data.nodes as SimulationNode[])
      .force('link', d3.forceLink<SimulationNode, SimulationLink>(data.links as SimulationLink[])
        .id((d) => d.id)
        .distance((d) => 100 - (d.value * 10)) // Stronger links = shorter distance
        .strength((d) => d.value * 0.1)
      )
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide<SimulationNode>().radius((d) => 10 + Math.sqrt(d.keywordCount) * 3))
      .alphaDecay(0.02) // Slower cooling for smoother settlement
      .velocityDecay(0.3); // More friction to reduce jittering

    // Create arrow markers for links
    svg.append('defs').selectAll('marker')
      .data(['end'])
      .enter().append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 20)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#999');

    // Create links
    const link = g.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data<SimulationLink>(data.links as SimulationLink[])
      .enter().append('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', (d) => Math.sqrt(d.value) * 2);

    // Create nodes
    const node = g.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data<SimulationNode>(data.nodes as SimulationNode[])
      .enter().append('circle')
      .attr('r', (d) => 5 + Math.sqrt(d.keywordCount) * 3)
      .attr('fill', (d) => getNodeColor(d.keywords))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .call(d3.drag<SVGCircleElement, SimulationNode>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
      );

    // Add labels
    const labels = g.append('g')
      .attr('class', 'labels')
      .selectAll('text')
      .data<SimulationNode>(data.nodes as SimulationNode[])
      .enter().append('text')
      .text((d) => d.title.length > 30 ? d.title.substring(0, 30) + '...' : d.title)
      .attr('font-size', 10)
      .attr('dx', 15)
      .attr('dy', 4)
      .style('pointer-events', 'none')
      .style('user-select', 'none');

    // Add tooltips
    const tooltip = d3.select('body').append('div')
      .attr('class', 'graph-tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'white')
      .style('border', '1px solid #ddd')
      .style('border-radius', '4px')
      .style('padding', '10px')
      .style('box-shadow', '0 2px 4px rgba(0,0,0,0.1)')
      .style('max-width', '300px')
      .style('z-index', '1000');

    // Function to get connected node IDs
    function getConnectedNodeIds(nodeId: string): Set<string> {
      const connectedIds = new Set<string>();
      connectedIds.add(nodeId);

      data.links.forEach((l) => {
        const sourceId = typeof l.source === 'string' ? l.source : (l.source as SimulationNode).id;
        const targetId = typeof l.target === 'string' ? l.target : (l.target as SimulationNode).id;

        if (sourceId === nodeId) {
          connectedIds.add(targetId);
        }
        if (targetId === nodeId) {
          connectedIds.add(sourceId);
        }
      });

      return connectedIds;
    }


    node
      .on('mouseover', function(event, d) {
        if (!focusMode) {
          tooltip.style('visibility', 'visible')
            .html(`
              <strong>${d.title}</strong><br/>
              <small>PMC ID: ${d.pmcId}</small><br/>
              <small>Keywords: ${d.keywords.join(', ')}</small>
            `);
        }
      })
      .on('mousemove', function(event) {
        if (!focusMode) {
          tooltip
            .style('top', (event.pageY - 10) + 'px')
            .style('left', (event.pageX + 10) + 'px');
        }
      })
      .on('mouseout', function() {
        tooltip.style('visibility', 'hidden');
      })
      .on('click', function(event, d) {
        event.stopPropagation();
        setSelectedNode(d);
        setFocusMode(true);
        setFocusedNodeId(d.id);
      });

    // Click background to exit focus mode
    svg.on('click', function() {
      setFocusMode(false);
      setFocusedNodeId(null);
      setSelectedNode(null);
    });

    // Update positions on each tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d) => (d.source as SimulationNode).x || 0)
        .attr('y1', (d) => (d.source as SimulationNode).y || 0)
        .attr('x2', (d) => (d.target as SimulationNode).x || 0)
        .attr('y2', (d) => (d.target as SimulationNode).y || 0);

      node
        .attr('cx', (d) => d.x || 0)
        .attr('cy', (d) => d.y || 0);

      labels
        .attr('x', (d) => d.x || 0)
        .attr('y', (d) => d.y || 0);
    });

    // Drag functions
    function dragstarted(event: d3.D3DragEvent<SVGCircleElement, SimulationNode, SimulationNode>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: d3.D3DragEvent<SVGCircleElement, SimulationNode, SimulationNode>) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGCircleElement, SimulationNode, SimulationNode>) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    // Cleanup
    return () => {
      simulation.stop();
      tooltip.remove();
    };
  }, [data, width, height]);

  // Separate effect for focus mode
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const node = svg.selectAll('.nodes circle');
    const link = svg.selectAll('.links line');
    const labels = svg.selectAll('.labels text');

    function getConnectedNodeIds(nodeId: string): Set<string> {
      const connectedIds = new Set<string>();
      connectedIds.add(nodeId);

      data.links.forEach((l) => {
        const sourceId = typeof l.source === 'string' ? l.source : (l.source as SimulationNode).id;
        const targetId = typeof l.target === 'string' ? l.target : (l.target as SimulationNode).id;

        if (sourceId === nodeId) {
          connectedIds.add(targetId);
        }
        if (targetId === nodeId) {
          connectedIds.add(sourceId);
        }
      });

      return connectedIds;
    }

    if (!focusedNodeId) {
      // Normal mode - show all, reset highlights
      node.style('display', 'block')
          .style('opacity', 1)
          .attr('stroke', '#fff')
          .attr('stroke-width', 2);
      link.style('display', 'block').style('opacity', 0.6);
      labels.style('display', 'block').style('opacity', 1);
    } else {
      // Focus mode - show only connected nodes
      const connectedIds = getConnectedNodeIds(focusedNodeId);

      node.style('display', (d) => {
          const nodeData = d as SimulationNode;
          return connectedIds.has(nodeData.id) ? 'block' : 'none';
        })
        .style('opacity', 1)
        .attr('stroke', (d) => (d as SimulationNode).id === focusedNodeId ? '#ff6b6b' : '#fff')
        .attr('stroke-width', (d) => (d as SimulationNode).id === focusedNodeId ? 4 : 2);

      link.style('display', (l) => {
        const linkData = l as SimulationLink;
        const sourceId = typeof linkData.source === 'string' ? linkData.source : linkData.source.id;
        const targetId = typeof linkData.target === 'string' ? linkData.target : linkData.target.id;
        return (sourceId === focusedNodeId || targetId === focusedNodeId) ? 'block' : 'none';
      }).style('opacity', 0.6);

      labels.style('display', (d) => {
          const nodeData = d as SimulationNode;
          return connectedIds.has(nodeData.id) ? 'block' : 'none';
        })
        .style('opacity', 1);
    }
  }, [focusedNodeId, data.links, focusMode]);

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="border border-gray-200 rounded-lg bg-white"
      />
      {focusMode && (
        <div className="absolute top-4 left-4 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 shadow">
          <p className="text-sm text-blue-800 font-medium">
            Focus Mode • Press <kbd className="px-2 py-1 bg-blue-100 rounded text-xs">ESC</kbd> to exit
          </p>
        </div>
      )}
      {selectedNode && (
        <div className="absolute top-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-md">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg">{selectedNode.title}</h3>
            <button
              onClick={() => {
                setSelectedNode(null);
                setFocusMode(false);
                setFocusedNodeId(null);
              }}
              className="text-gray-500 hover:text-gray-700 ml-2"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-2">PMC ID: {selectedNode.pmcId}</p>
          <a
            href={selectedNode.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            View Article →
          </a>
          <div className="mt-3">
            <p className="text-sm font-semibold mb-1">Keywords:</p>
            <div className="flex flex-wrap gap-1">
              {selectedNode.keywords.map((keyword, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
