"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var RedCircle = /** @class */ (function () {
    function RedCircle() {
    }
    RedCircle.prototype.drawCircle = function (x, y, radius, ctx) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
    };
    return RedCircle;
}());
var GreenCircle = /** @class */ (function () {
    function GreenCircle() {
    }
    GreenCircle.prototype.drawCircle = function (x, y, radius, ctx) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI);
        ctx.fillStyle = 'green';
        ctx.fill();
    };
    return GreenCircle;
}());
//实现抽象类
var Shape = /** @class */ (function () {
    function Shape() {
    }
    Shape.prototype.shape = function (drawAPI) {
        this.drawAPI = drawAPI;
    };
    return Shape;
}());
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(x, y, radius, drawAPI, canvas) {
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.y = y;
        _this.radius = radius;
        _this.drawAPI = drawAPI;
        _this.ctx = canvas.getContext('2d');
        return _this;
    }
    Circle.prototype.draw = function () {
        this.drawAPI.drawCircle(this.x, this.y, this.radius, this.ctx);
    };
    return Circle;
}(Shape));
var BridgeDemo = /** @class */ (function () {
    function BridgeDemo() {
        var circle = new Circle(30, 30, 30, new GreenCircle(), document.getElementById('canvas'));
        circle.draw();
    }
    return BridgeDemo;
}());
