import { createRouter } from "vue-router";

import HomeView from "../views/home.vue";
import AboutView from "../views/about.vue";

const routes = [
	{ path: "/", component: HomeView },
	{ path: "/about", component: AboutView },
];

export default (history) => {
	return createRouter({
		history,
		routes,
	});
};
