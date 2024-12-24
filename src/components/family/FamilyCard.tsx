import React from 'react';
import { Users } from 'lucide-react';
import { Family } from '../../types';
import { Link } from 'react-router-dom';

interface Props {
  family: Family;
}

export const FamilyCard: React.FC<Props> = ({ family }) => {
  return (
    <Link to={`/families/${family.id}`} className="block">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div className="h-48 relative">
          <img
            src={family.coverPhoto || 'https://images.unsplash.com/photo-1511895426328-dc8714191300'}
            alt={family.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <h3 className="text-xl font-semibold text-white">{family.name}</h3>
          </div>
        </div>
        <div className="p-4">
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">{family.description}</p>
          <div className="flex items-center text-gray-500 text-sm">
            <Users className="w-4 h-4 mr-1" />
            <span>{family.memberCount} members</span>
          </div>
        </div>
      </div>
    </Link>
  );
};