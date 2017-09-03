import { mapState, mapActions } from 'vuex';

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
          name: 'category',
        },
        {
          name: 'name',
        },
        {
          name: 'data',
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
      'monitorList',
      'monitorUpdate',
      'monitorAdd',
    ]),
    getItems: async function getItems() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      try {
        await this.monitorList();
      } catch (err) {
        this.$alert(err);
      } finally {
        this.loading = false;
      }
    },
    handleEdit: function handleEdit(index) {
      editTable.handleEdit.bind(this)(index);
      const {
        data,
      } = this.dataToUpdate;
      if (data) {
        this.dataToUpdate.data = JSON.stringify(data, null, 2);
      }
    },
    update: function update(id, data) {
      return this.monitorUpdate(id, data);
    },
    handleUpdate: function handleUpdate(index) {
      editTable.handleUpdate.bind(this)(index, 'name');
    },
    save: function save(data) {
      return this.monitorAdd(data);
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
        const items = state.monitor.items;
        if (!items) {
          return null;
        }
        return items.concat({});
      },
      total: state => state.monitor.total,
    }),
    type: editTable.type,
  },
};
