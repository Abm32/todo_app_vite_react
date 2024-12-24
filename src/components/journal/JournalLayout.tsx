import React from 'react';
import { Book, Calendar, Hash } from 'lucide-react';

interface JournalLayoutProps {
  children: React.ReactNode;
}

export const JournalLayout = ({ children }: JournalLayoutProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <nav className="space-y-2">
              <a
                href="#entries"
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
              >
                <Book className="w-5 h-5" />
                <span>All Entries</span>
              </a>
              <a
                href="#calendar"
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
              >
                <Calendar className="w-5 h-5" />
                <span>Calendar</span>
              </a>
              <a
                href="#tags"
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
              >
                <Hash className="w-5 h-5" />
                <span>Tags</span>
              </a>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};