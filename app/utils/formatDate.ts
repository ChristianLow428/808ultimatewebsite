// app/utils/formatDate.ts

export function formatUnixDate(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000);
  
  const month = date.toLocaleDateString('en-US', { month: 'short', timeZone: 'Pacific/Honolulu' });
  const day = date.toLocaleDateString('en-US', { day: '2-digit', timeZone: 'Pacific/Honolulu' });
  
  // Forces a clean space separated layout: "Jul 01"
  return `${month} ${day}`;
}