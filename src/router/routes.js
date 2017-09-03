import paths from '@/router/paths';
import globals from '@/helpers/globals';

const view = name => (resolve) => {
    require([`@/views/${name}/index.vue`], resolve); // eslint-disable-line
};

const path = (name) => {
  const appUrlPrefix = globals.get('CONFIG.appUrlPrefix');
  const lang = globals.get('CONFIG.lang');
  const currentPath = paths[name];
  if (!lang || lang === 'en') {
    return `${appUrlPrefix}${currentPath}`;
  }
  return `${appUrlPrefix}/${lang}${currentPath}`;
};


const create = name => ({
  name,
  path: path(name),
  component: view(name),
});

export default [
  create('home'),
  create('login'),
  create('register'),
  create('account'),
  create('lang'),
  create('mock'),
  create('monitor'),
  create('setting'),
];
