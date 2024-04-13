var sum = function (a, b) {
    return a + b;
};
console.log(sum(1, 2));
var subtract = function (a, b) {
    if (b === void 0) { b = 0; }
    return a - b;
};
console.log(subtract(15));
console.log(subtract(15, 3));
var logInfo = function (a) {
    console.log(a);
};
logInfo("abc");
logInfo();
