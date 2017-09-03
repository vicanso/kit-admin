import { mapState } from 'vuex';
import Vue from 'vue';
import _ from 'lodash';

import {
  Carousel,
  CarouselItem,
} from 'element-ui';

Vue.use(Carousel)
  .use(CarouselItem);

export default {
  data() {
    const baseUrl = 'http://ove0r0rne.bkt.clouddn.com/home-slide-{index}.jpeg';
    return {
      items: _.map([1, 2, 3, 4], index => baseUrl.replace('{index}', `0${index}`)),
    };
  },
  computed: {
    ...mapState({
      userInfo : ({ user }) => user.info,
    }),
  },
};
