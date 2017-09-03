import { mapState, mapActions } from 'vuex';

import editTable from '@/components/edit-table';

export default {
  data() {
    return {
      isValid: false,
      pageSize: 10,
      pageSizes: [10, 20, 30, 50, 100],
      sort: '',
      keyword: '',
      loading: false,
      roles: [
        'su',
        'admin',
        'buyer',
        'seller',
      ],
      currentRoles: null,
      editIndex: -1,
    };
  },
  methods: {
    ...mapActions([
      'accountList',
      'accountRolesUpdate',
    ]),
    getItems: async function getItems(page = 1) {
      if (this.loading) {
        return;
      }
      const {
        pageSize,
        sort,
        keyword,
      } = this;
      const skip = pageSize * (page - 1);
      this.loading = true;
      const query = {
        skip,
        limit: pageSize,
        'cache-control': 'no-cache',
      };
      if (skip === 0) {
        query.count = true;
      }
      if (sort) {
        query.sort = sort;
      }
      if (keyword) {
        query.keyword = keyword;
      }
      try {
        await this.accountList(query);
      } catch (err) {
        this.$alert(err);
      } finally {
        this.loading = false;
      }
    },
    handleEdit: function handleEdit(index) {
      const item = this.items[index];
      this.currentRoles = (item.roles || []).slice(0);
      this.editIndex = index;
    },
    handleUpdate: async function handleUpdate(index) {
      this.editIndex = -1;
      const item = this.items[index];
      /* eslint no-underscore-dangle:0 */
      const id = item._id;
      try {
        await this.accountRolesUpdate({
          id,
          roles: this.currentRoles,
        });
        this.$message({
          showClose: true,
          message: `成功更新${item.account} roles`,
        });
      } catch (err) {
        this.$alert(err);
      }
    },
    handleChangePage: editTable.handleChangePage,
    handleSizeChange: editTable.handleSizeChange,
    handleSortChange: editTable.handleSortChange,
    handleSearch: editTable.handleSearch,
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.info,
      items: state => state.account.items,
      total: state => state.account.total,
    }),
    type: editTable.type,
  },
};
