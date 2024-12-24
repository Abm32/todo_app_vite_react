import React, { memo } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { FamilyMember } from '../../types';

interface Props {
  data: {
    member: FamilyMember;
  };
}

export const FamilyTreeNode: React.FC<Props> = memo(({ data }) => {
  const { member } = data;

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-gray-200">
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center">
        <img
          src={member.profilePhoto}
          alt={member.name}
          className="w-10 h-10 rounded-full mr-2"
        />
        <div>
          <div className="text-sm font-bold">{member.name}</div>
          <div className="text-xs text-gray-500">{member.role}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});