export function calculateDaysAgo(givenDateStr: string): number {
  const currentDate: Date = new Date();

  const givenDate: Date = new Date(givenDateStr);

  const timeDifference: number = currentDate.getTime() - givenDate.getTime();

  const daysAgo: number = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return daysAgo;
}
