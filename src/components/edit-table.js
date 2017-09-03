import _ from 'lodash';

import {
  isJsonString,
  jsonIsEqual,
} from '@/helpers/utils';

export default {
  handleChangePage: function handleChangePage(page) {
    this.getItems(page);
  },
  handleSizeChange: function handleSizeChange(size) {
    this.pageSize = size;
    this.getItems(1);
  },
  handleSortChange: function handleSortChange({ prop, order }) {
    if (order === 'ascending') {
      this.sort = prop;
    } else {
      this.sort = `-${prop}`;
    }
    this.getItems(1);
  },
  handleAdd: function handleAdd() {
    this.dataToAdd = {};
  },
  handleSearch: function handleSearch() {
    this.getItems(1);
  },
  handleSave: async function handleSave() {
    const data = this.dataToAdd;
    this.dataToAdd = null;
    try {
      await this.save(data);
    } catch (err) {
      this.$alert(err);
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
  handleUpdate: async function handleUpdate(index, key) {
    const item = this.items[index];
    /* eslint no-underscore-dangle:0 */
    const id = item._id;
    this.editIndex = -1;
    const {
      keys,
      dataToUpdate,
    } = this;
    const data = {};
    _.forEach(keys, (v) => {
      const key = v.name;
      const updateItem = dataToUpdate[key];
      if (isJsonString(updateItem)) {
        let tmp = null;
        try {
          tmp = JSON.parse(updateItem);
        } catch (err) {
          this.$alert(err);
          throw err;
        }
        if (!jsonIsEqual(item[key], tmp)) {
          data[key] = tmp;
        }
      } else if (item[key] !== dataToUpdate[key]) {
        data[key] = dataToUpdate[key];
      }
    });
    if (_.isEmpty(data)) {
      return;
    }
    try {
      await this.update({
        id,
        data,
      });
      this.$message({
        showClose: true,
        message: `成功更新${item[key]}`,
      });
    } catch (err) {
      this.$alert(err);
    }
  },
  type: function type() {
    if (this.isValid) {
      return 3;
    }
    const userInfo = this.userInfo;
    if (!userInfo) {
      return 0;
    }
    if (userInfo.anonymous) {
      return 1;
    }
    const {
      roles,
    } = userInfo;
    const validRoles = this.validRoles || ['su', 'admin'];
    let found = false;
    _.forEach(roles, (role) => {
      if (found) {
        return;
      }
      if (_.includes(validRoles, role)) {
        found = true;
      }
    });
    if (!found) {
      return 2;
    }
    this.isValid = true;
    this.getItems(1);
    return 3;
  },
};
