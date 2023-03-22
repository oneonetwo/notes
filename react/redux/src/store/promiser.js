/*
 * @Descripttion:
 * @version:
 * @Author: D
 * @Date: 2023-03-22 11:29:49
 * @LastEditors: jy
 * @LastEditTime: 2023-03-22 11:32:15
 */
/*
 * @Descripttion:
 * @version:
 * @Author: D
 * @Date: 2023-03-22 10:28:27
 * @LastEditors: jy
 * @LastEditTime: 2023-03-22 11:23:22
 */
/**
 * 中间件的写法是固定的
 * middlewareAPI  是一个对象，里面有二个属性，一个是getState,dispatch重新派发动作
 * dispatch 是我们改造后的dispatch
 */
function promiser({ getState, dispatch }) {
	return function (next) {
		return function (action) {
			if (action.then && typeof action.then === "function") {
				action.then(dispatch).catch(dispatch);
			} else if (
				action.payload &&
				typeof action.payload.then === "function"
			) {
				action.payload
					.then((result) => dispatch({ ...action, payload: result }))
					.catch((error) => {
						dispatch({ ...action, payload: error, error: true });
						return Promise.reject(error); //返回失败的promise
					});
			} else {
				next(action);
			}
		};
	};
}

export default promiser;
