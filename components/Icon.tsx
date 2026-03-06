import React from 'react';

interface IconProps {
  icon: 'play' | 'pause' | 'check' | 'edit' | 'delete' | 'refresh' | 'settings' | 'close' | 'info';
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ icon, className = 'w-5 h-5' }) => {
  const icons = {
    play: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
      </svg>
    ),
    pause: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
      </svg>
    ),
    check: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    edit: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
      </svg>
    ),
    delete: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.067-2.09.921-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
    ),
    refresh: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.664 0l3.181-3.183m-11.664 0-3.181 3.183m0 0-3.181-3.183m0 0h16.5m-16.5 0V6.348c0-1.657 1.343-3 3-3h10.5c1.657 0 3 1.343 3 3v2.999m-16.5 0h16.5" />
      </svg>
    ),
    settings: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-1.007 1.11-1.11a12.003 12.003 0 0 1 1.096 0c.55.103 1.02.568 1.11 1.11m-1.908-1.908a12.003 12.003 0 0 1 1.908 0M10.343 3.94a12.003 12.003 0 0 0-1.096 0c-.55-.103-1.02-.568-1.11-1.11a12.003 12.003 0 0 0-1.908 0m1.908 1.908a12.003 12.003 0 0 0-1.908 0m11.456 12.56a12.003 12.003 0 0 1-1.096 0c-.55.103-1.02.568-1.11 1.11a12.003 12.003 0 0 1-1.908 0c-.09-.542-.56-1.007-1.11-1.11a12.003 12.003 0 0 1-1.096 0c-.55-.103-1.02-.568-1.11-1.11a12.003 12.003 0 0 1-1.908 0m1.908 1.908a12.003 12.003 0 0 1 1.908 0m-1.908-1.908a12.003 12.003 0 0 0 1.096 0c.55.103 1.02.568 1.11 1.11a12.003 12.003 0 0 0 1.908 0m-1.908-1.908a12.003 12.003 0 0 0 1.908 0m-11.456-12.56a12.003 12.003 0 0 0 1.096 0c.55-.103 1.02-.568 1.11-1.11a12.003 12.003 0 0 0 1.908 0m-1.908-1.908a12.003 12.003 0 0 0-1.908 0m11.456 12.56a12.003 12.003 0 0 1-1.908 0m-9.548-9.548a12.003 12.003 0 0 1 1.096 0c.55.103 1.02.568 1.11 1.11a12.003 12.003 0 0 1 1.908 0m-1.908-1.908a12.003 12.003 0 0 1 1.908 0" />
        </svg>
      ),
    close: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    ),
    info: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.852l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
      )
  };

  return icons[icon] || null;
};