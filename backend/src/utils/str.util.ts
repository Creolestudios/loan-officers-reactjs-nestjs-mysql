export const randomCode = (): number => {
  return Math.floor(100000 + Math.random() * 900000);
};
export const randomInputCode = (num: number): number => {
  return Math.floor(
    +Array(num)
      .fill(null)
      .map(() => Math.round(Math.random() * (num * num)))
      .join(''),
  );
};

export const randomNameWhiteSpaceRemoval = (name: string): string => {
  const filteredName = name.replace(/ /g, '_');
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');

  return `${filteredName}-${randomName}`;
};
