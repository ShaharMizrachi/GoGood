export const formatPhoneNumber = (phoneNumber: any) => {
  if (!phoneNumber) return phoneNumber;
  let formattedNumber = phoneNumber.replace(/-/g, '');

  if (formattedNumber.length === 10) {
    formattedNumber =
      formattedNumber.slice(0, 3) + '-' + formattedNumber.slice(3);
  }

  return formattedNumber;
};
