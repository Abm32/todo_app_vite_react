import React from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: Date;
  type: 'birthday' | 'anniversary' | 'event';
}

interface Props {
  events: Event[];
  onDateSelect: (date: Date) => void;
}

export const FamilyCalendar: React.FC<Props> = ({ events, onDateSelect }) => {
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    const dayEvents = events.filter(
      event => format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );

    if (view === 'month' && dayEvents.length > 0) {
      return (
        <div className="flex flex-col items-center">
          <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
          <div className="text-xs mt-1">{dayEvents.length}</div>
        </div>
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center space-x-2 mb-4">
        <CalendarIcon className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold">Family Calendar</h2>
      </div>
      <Calendar
        onChange={onDateSelect}
        tileContent={tileContent}
        className="rounded-lg border"
      />
    </div>
  );
};