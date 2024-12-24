import React from 'react';
import { JournalLayout } from '../components/journal/JournalLayout';
import { JournalForm } from '../components/journal/JournalForm';
import { JournalEntry } from '../components/journal/JournalEntry';
import { PenSquare } from 'lucide-react';

const mockEntries = [
  {
    id: '1',
    userId: '1',
    date: '2024-03-15',
    content: 'Had a great day today! The weather was perfect for a walk in the park.',
    mood: 'happy',
    photos: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e'],
    tags: ['outdoors', 'nature', 'relaxation'],
    createdAt: '2024-03-15T10:00:00Z'
  },
] as const;

export default function Journal() {
  const [isWriting, setIsWriting] = React.useState(false);

  return (
    <JournalLayout>
      {!isWriting ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Your Journal</h1>
            <button
              onClick={() => setIsWriting(true)}
              className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              <PenSquare className="w-5 h-5" />
              <span>Write New Entry</span>
            </button>
          </div>

          <div className="grid gap-6">
            {mockEntries.map(entry => (
              <JournalEntry key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">New Entry</h2>
            <button
              onClick={() => setIsWriting(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
          <JournalForm onComplete={() => setIsWriting(false)} />
        </div>
      )}
    </JournalLayout>
  );
}