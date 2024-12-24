import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';
import { FamilyMember } from '../../types';
import { FamilyTreeNode } from './FamilyTreeNode';

const nodeTypes = {
  familyMember: FamilyTreeNode,
};

interface Props {
  members: FamilyMember[];
}

export const FamilyTree: React.FC<Props> = ({ members }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  // Initialize nodes from family members
  React.useEffect(() => {
    const initialNodes: Node[] = members.map((member, index) => ({
      id: member.userId,
      type: 'familyMember',
      position: { x: index * 200, y: 0 },
      data: { member },
    }));

    setNodes(initialNodes);
  }, [members]);

  return (
    <div className="h-[600px] bg-white rounded-lg shadow-sm">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};