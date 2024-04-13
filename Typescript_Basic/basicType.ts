let age: number;
age = 20;

console.log(age);

let hello: string;
hello = "Hello World";

let isValid: boolean;
isValid = true;

let something: any;
something = 2;
something = "2";
something = true;
something = [];
console.log(something);

let products: Array<string>;
// let product: string []
products = ["laptop", "mouse", "keyboard"];

let student: object;
student = {
  name: "Lê Chuối",
  age: 20,
};

// Tuple
let mix: [string, number];
mix = [hello, age];

// Enum
const enum color {
  yellow = "yellow",
  red = "red",
  blue = "blue",
}

console.log(color.yellow);
console.log(color.red);
console.log(color.blue);
console.log(color.blue > color.yellow);

// react redux ACTION
// export const GET_ITEMS = "GET_ITEMS"
// export const CREATE_ITEMS = "CREATE_ITEMS"
const enum CrudItem {
  GET_ITEMS = "GET_ITEMS",
  CREATE_ITEMS = "CREATE_ITEMS",
}

console.log(CrudItem.CREATE_ITEMS);

let y: any;
