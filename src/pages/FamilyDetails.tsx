import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFamily } from '../contexts/FamilyContext';
import { Users, ArrowLeft } from 'lucide-react';

export default function FamilyDetails() {
  const { id } = useParams<{ id: string }>();
  const { families, familyMembers, getFamilyMembers } = useFamily();
  const family = families.find(f => f.id === id);

  useEffect(() => {
    if (id) {
      getFamilyMembers(id);
    }
  }, [id]);

  if (!family) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/families"
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Families</span>
      </Link>

      <div className="relative h-64 rounded-xl overflow-hidden mb-8">
        <img
          src={family.coverPhoto || 'https://images.unsplash.com/photo-1511895426328-dc8714191300'}
          alt={family.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
          <h1 className="text-3xl font-bold text-white">{family.name}</h1>
          <p className="text-white/80 mt-2">{family.description}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Users className="w-5 h-5 text-gray-500" />
          <h2 className="text-xl font-semibold">Family Members</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {familyMembers.map((member) => (
            <div key={member.userId} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <img
                src={member.profilePhoto}
                alt={member.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}