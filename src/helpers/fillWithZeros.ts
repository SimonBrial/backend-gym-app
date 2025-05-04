export const fillWithZeros = (value: number, length: number): string => {
  const strValue = value.toString();
  const zerosToAdd = length - strValue.length;
  const filledValue = "N" + "0".repeat(zerosToAdd) + strValue;
  return filledValue;
};
