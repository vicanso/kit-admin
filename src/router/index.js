import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import applyRouterMiddlewares from './apply-middlewares';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes,
});

applyRouterMiddlewares(router);

export default router;
