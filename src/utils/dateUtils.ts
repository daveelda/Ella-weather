export function formatLocalDateTime(timezone: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());
}

export function formatDayDate(dateStr: string): { day: string; date: string } {
  const date = new Date(dateStr + 'T12:00:00');
  return {
    day: date.toLocaleDateString('en-US', { weekday: 'long' }),
    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  };
}

export function formatTime(isoString: string, timezone: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(isoString));
}
