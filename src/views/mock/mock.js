import { mapState, mapActions } from 'vuex';
import _ from 'lodash';

import editTable from '@/components/edit-table';

export default {
  data() {
    return {
      isValid: false,
      loading: false,
      pageSize: 10,
      pageSizes: [10, 20, 30, 50, 100],
      dataToUpdate: null,
      editIndex: -1,
      keys: [
        {
          name: 'url',
        },
        {
          name: 'status',
          type: 'number',
        },
        {
          name: 'response',
          type: 'textarea',
        },
        {
          name: 'account',
        },
        {
          name: 'creator',
          readonly: true,
        },
      ],
      defaultItem: {
        url: '',
        status: null,
        response: null,
        account: '',
      },
      dataToAdd: null,
    };
  },
  methods: {
    ...mapActions([
      'mockList',
      'mockUpdate',
      'mockAdd',
    ]),
    getItems: async function getItems() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      try {
        await this.mockList();
      } catch (err) {
        this.$alert(err);
      } finally {
        this.loading = false;
      }
    },
    handleEdit: function handleEdit(index) {
      editTable.handleEdit.bind(this)(index);
      const {
        response,
      } = this.dataToUpdate;
      if (response) {
        this.dataToUpdate.response = JSON.stringify(response, null, 2);
      }
    },
    update: function update(id, data) {
      return this.mockUpdate(id, data);
    },
    handleUpdate: function handleUpdate(index) {
      editTable.handleUpdate.bind(this)(index, 'url');
    },
    save: function save(data) {
      return this.mockAdd(data);
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
        const items = state.mock.items;
        if (!items) {
          return null;
        }
        return items.concat({});
      },
      total: state => state.mock.total,
    }),
    type: editTable.type,
  },
};
