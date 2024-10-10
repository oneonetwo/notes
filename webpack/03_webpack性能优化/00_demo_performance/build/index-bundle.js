/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_00_demo"] = self["webpackChunk_00_demo"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("var btn1 = document.createElement('button');\nvar btn2 = document.createElement('button');\nbtn1.textContent = 'home';\nbtn2.textContent = 'about';\ndocument.body.append(btn1);\ndocument.body.append(btn2);\n\n//动态加载\nbtn1.onclick = function () {\n  __webpack_require__.e(/*! import() | home */ \"home\").then(__webpack_require__.t.bind(__webpack_require__, /*! ./pages/home */ \"./src/pages/home.js\", 23));\n};\nbtn2.onclick = function () {\n  __webpack_require__.e(/*! import() | about */ \"about\").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/about */ \"./src/pages/about.js\"));\n};\n\n//# sourceURL=webpack://00_demo/./src/index.js?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);