/*
 * @Descripttion: 简单工厂的例子，就是函数返回类的实现。
 * @version:
 * @Author: D
 * @Date: 2023-02-22 10:37:52
 * @LastEditors: jy
 * @LastEditTime: 2023-02-22 13:51:45
 */
interface jQuery {
	length: number;
	[index: number]: any;
}
class jQuery {
	constructor(selector: string) {
		let elements = Array.from(document.querySelectorAll(selector));
		this.length = elements ? elements.length : 0;
		for (let i = 0; i < elements.length; i++) {
			this[i] = elements[i];
		}
	}
	html(htmlText: string|undefined) {
		if (htmlText) {
			for (let i = 0; i < this.length; i++) {
				this[0].innerHTML = htmlText;
				return this;
			}
		} else {
			return this[0].innerHTML;
		}
	}
}
interface Window {
	$: any;
}
window.$ = function (selector: string) {
	return new jQuery(selector);
};
