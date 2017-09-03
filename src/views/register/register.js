import { mapState, mapActions } from 'vuex';
import {
  validateAccount,
  validateEmail,
  validatePassword,
} from '@/helpers/input';


export default {
  data() {
    return {
      form: {
        account: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      registerRules: {
        account: [{
          validator: validateAccount,
          trigger: 'blur',
        }],
        email: [{
          validator: validateEmail,
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
      'userRegister',
      'langList',
    ]),
    async onRegister() {
      const { account, email, password } = this.form;
      if (!account || !email || !password) {
        return;
      }
      this.loading = true;
      try {
        await this.userRegister({ account, email, password });
        this.$router.push({ name: 'login' });
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
