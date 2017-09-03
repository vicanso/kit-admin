import _ from 'lodash';
import { mapState, mapActions } from 'vuex';

import globals from '@/helpers/globals';
import paths from '@/router/paths';

export default {
  methods: {
    ...mapActions([
      'userLogout',
    ]),
    handleLangSelect(lang) {
      const currentLang = globals.get('CONFIG.lang');
      const href = `${location.pathname}${location.search}`;
      if (href.indexOf(currentLang) === 1) {
        location.href = href.replace(currentLang, lang);
      } else {
        location.href = `/${lang}${href}`;
      }
    },
  },
  computed: {
    ...mapState({
      userInfo: ({ user }) => user.info,
      basicLangs: ({ lang }) => lang.basic,
      commonLangs: ({ lang }) => lang.common,
    }),
    inited() {
      return this.basicLangs && this.commonLangs;
    },
    navItems() {
      const basicLangs = this.basicLangs;
      const nav = [
        'home',
        'news',
        'aboutUs',
      ];
      return _.map(nav, (key) => {
        const name = basicLangs[key];
        return {
          name,
          path: paths[key],
        };
      });
    },
  },
};
