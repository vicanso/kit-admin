import * as localStore from '@/helpers/local-store';

export default (router) => {
  let pageLoadStats = null;

  router.beforeEach((to, from, next) => {
    pageLoadStats = {
      to: to.path,
      from: from.path,
      startedAt: Date.now(),
    };
    next();
  });

  router.afterEach(() => {
    const use = Date.now() - pageLoadStats.startedAt;
    delete pageLoadStats.startedAt;
    pageLoadStats.use = use;
    localStore.addRouterStats(pageLoadStats);
    pageLoadStats = null;
  });
};
