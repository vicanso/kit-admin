import { mapState, mapActions } from 'vuex';
import {
  validateAccount,
  validatePassword,
} from '@/helpers/input';


export default {
  data() {
    return {
      form: {
        account: '',
        password: '',
      },
      loginRules: {
        account: [{
          validator: validateAccount,
          trigger: 'blur',
        }],
        password: [{
          validator: validatePassword,
          trigger: 'blur',
        }],
      },
      loading: false,
    };
  },
  computed: {
    ...mapState({
      userLangs: state => state.lang.user,
      commonLangs: state => state.lang.common,
    }),
    inited() {
      return this.userLangs && this.commonLangs;
    },
  },
  methods: {
    ...mapActions([
      'userLogin',
      'langList',
    ]),
    async onLogin() {
      const { account, password } = this.form;
      if (!account || !password) {
        return;
      }
      this.loading = true;
      try {
        await this.userLogin({
          account,
          password,
        });
        this.$router.push({ name: 'home' });
      } catch (err) {
        this.$alert(err);
      } finally {
        this.loading = false;
      }
    },
  },
  async beforeMount() {
    await this.langList('user');
  },
};
