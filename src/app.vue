<template lang='pug'>
  #app
    app-header
    app-nav
    .content-wrapper
      router-view
</template>

<script>
import { mapActions } from 'vuex';
import AppHeader from '@/components/app-header';
import AppNav from '@/components/app-nav';


export default {
  components: {
    AppHeader,
    AppNav,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions([
      'langList',
      'userGet',
    ]),
  },
  async beforeMount() {
    try {
      await this.userGet();
      await this.langList('basic');
    } catch (err) {
      this.$alert(err);
    }
  },
};
</script>

<style src='@/assets/styles/app.sss' lang='postcss'></style>
