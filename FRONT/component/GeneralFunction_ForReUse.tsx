import {hebrew} from './Hebrew';

export const calculatingTime = (data: Date) => {
  const timeLeft = Math.floor(
    (new Date().getTime() - new Date(data).getTime()) / (1000 * 60 * 60 * 24),
  );
  switch (timeLeft) {
    case 0:
      return hebrew.today;
    case 1:
      return hebrew.yesterday;
    case 2:
      return hebrew.day_before_yesterday;
  }

  if (timeLeft < 29) {
    return hebrew.before + ' ' + timeLeft + ' ' + hebrew.days;
  } else {
    const years = Math.floor(timeLeft / 365);
    const months = Math.floor((timeLeft % 365) / 30);
    const days = (timeLeft % 365) % 30;
    let result = '';
    if (years === 1) {
      result += 'שנה';
    } else if (years === 2) {
      result += 'שנתיים';
    } else if (years > 2) {
      result += `${years} שנים`;
    }

    if (months === 1) {
      result += ' חודש';
    } else if (months === 2) {
      result += ' חודשיים';
    } else if (months > 2) {
      result += ` ${months} חודשים`;
    }

    if (days > 0) {
      result += ` ${days} ימים`;
    }
    return result.trim();
  }
};

export const roundKilometer = (numDistance: number) => {
  if (numDistance > 1000) {
    return (numDistance *= 0.001).toFixed(0) + ' ' + hebrew.Km_from_you;
  } else {
    return numDistance + ' ' + hebrew.meterFromYourPlace;
  }
};

// export const  dateFormmater

const powerUserList: string[] = [
  '0577777777', // Google Get
  '0588888888', // Google Give
  '0511111111', // ShaharGetTest
  '0522222222', // ShaharGiveTest
];

export const powerUserCheck = (num: string) => {
  const result = powerUserList.find(numFromList => num === numFromList);
  return result !== undefined;
};
