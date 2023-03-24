/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(123);
  }, 100);
});
p.then(data => console.log(data));
/******/ })()
;