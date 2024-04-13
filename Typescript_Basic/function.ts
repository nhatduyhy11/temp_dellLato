const sum = (a: number, b: number): number => {
  return a + b;
};

console.log(sum(1, 2));

const subtract = (a: number, b: number = 0): number => {
  return a - b;
};

console.log(subtract(15));
console.log(subtract(15, 3));

const logInfo = (a?: string) => {
  console.log(a);
};

logInfo("abc");
logInfo();
