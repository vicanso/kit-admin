import _ from 'lodash';

export default {
  data() {
    return {
      items: [
        {
          name: '业务配置',
          icon: 'icon-category',
          group: '业务人员使用',
          items:[
            {
              name: '账号审核',
              type: 'account',
            },
            {
              name: '多语言配置',
              type: 'lang',
            },
          ],
        },
        {
          name: '测试配置',
          icon: 'icon-link',
          group: '测试人员使用',
          items: [
            {
              name: 'Mock',
              type: 'mock',
            },
          ],
        },
        {
          name: '应用配置',
          icon: 'icon-security',
          group: '开发人员使用',
          items: [
            {
              name: '监控配置',
              type: 'monitor',
            },
            {
              name: '程序配置',
              type: 'setting',
            },
          ],
        },
      ],
      defaultActive: '-1',
    };
  },
  methods: {
    functionSelect(index) {
      const indexes = index.split('=');
      let result = this;
      _.forEach(indexes, (value) => {
        result = result.items[value];
      });
      if (!result) {
        return;
      }
      this.$router.push({
        name: result.type,
      });
    },
  },
};
