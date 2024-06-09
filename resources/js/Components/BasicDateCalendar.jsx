import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function BasicDateCalendar() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="w-full flex justify-center mt-8">
        <div className="w-full bg-white rounded-xl shadow-sm p-6">
            <h1 className="font-semibold text-slate-800 text-xl mb-6">Timeline</h1>
            <DateCalendar />
        </div>
      </div>
    </LocalizationProvider>
  );
}
