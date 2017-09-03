import { mapState, mapActions } from 'vuex';
import _ from 'lodash';

import editTable from '@/components/edit-table';

export default {
  data() {
    return {
      keyword: '',
      isValid: false,
      loading: false,
      pageSize: 10,
      pageSizes: [10, 20, 30, 50, 100],
      dataToUpdate: null,
      editIndex: -1,
      keys: [
        {
          name: 'category',
        },
        {
          name: 'name',
        },
        {
          name: 'en',
          type: 'textarea',
        },
        {
          name: 'zh',
          type: 'textarea',
        },
        {
          name: 'creator',
          readonly: true,
        },
      ],
      dataToAdd: null,
    };
  },
  methods: {
    ...mapActions([
      'langListAll',
      'langUpdate',
      'langAdd',
    ]),
    getItems: async function getItems() {
      if (this.loading) {
        return;
      }
      const {
        keyword,
      } = this;
      this.loading = true;
      try {
        const query = {};
        if (keyword) {
          query.category = keyword;
        }
        await this.langListAll(query);
      } catch (err) {
        this.$alert(err);
      } finally {
        this.loading = false;
      }
    },
    handleEdit: function handleEdit(index) {
      const item = this.items[index];
      const data = {};
      _.forEach(this.keys, (v) => {
        const name = v.name;
        data[name] = item[name];
      });
      this.dataToUpdate = data;
      this.editIndex = index;
    },
    update: function update(id, data) {
      return this.langUpdate(id, data);
    },
    handleUpdate: function handleUpdate(index) {
      editTable.handleUpdate.bind(this)(index, 'name');
    },
    save: function save(data) {
      return this.langAdd(data);
    },
    handleAdd: editTable.handleAdd,
    handleSave: editTable.handleSave,
    handleChangePage: editTable.handleChangePage,
    handleSizeChange: editTable.handleSizeChange,
    handleSortChange: editTable.handleSortChange,
    handleSearch: editTable.handleSearch,
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.info,
      items: (state) => {
        const items = state.lang.items;
        if (!items) {
          return null;
        }
        return items.concat({});
      },
      total: state => state.lang.total,
    }),
    type: editTable.type,
  },
};
