import React from 'react';
import { JournalEntry as JournalEntryType } from '../../types';
import { Calendar, Tag } from 'lucide-react';

interface Props {
  entry: JournalEntryType;
}

export const JournalEntry: React.FC<Props> = ({ entry }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{new Date(entry.date).toLocaleDateString()}</span>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm ${
          entry.mood === 'happy' ? 'bg-green-100 text-green-800' :
          entry.mood === 'sad' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {entry.mood}
        </div>
      </div>

      <p className="text-gray-700">{entry.content}</p>

      {entry.photos.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {entry.photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Journal photo ${index + 1}`}
              className="rounded-lg object-cover w-full h-48"
            />
          ))}
        </div>
      )}

      {entry.tags.length > 0 && (
        <div className="flex items-center space-x-2">
          <Tag className="w-4 h-4 text-gray-400" />
          <div className="flex flex-wrap gap-2">
            {entry.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};