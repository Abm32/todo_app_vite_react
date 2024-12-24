import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useFamily } from '../contexts/FamilyContext';
import { FamilyCard } from '../components/family/FamilyCard';
import { CreateFamilyModal } from '../components/family/CreateFamilyModal';

export default function Families() {
  const { families } = useFamily();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Families</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5" />
          <span>Create Family</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {families.map((family) => (
          <FamilyCard key={family.id} family={family} />
        ))}
      </div>

      <CreateFamilyModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}