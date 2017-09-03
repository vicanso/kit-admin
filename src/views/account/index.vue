<template lang="pug">
  include ../common
  div(v-if='type !== 3')
    +AdminAuthority
  .clearfix(
    v-else
    :class='$style.table'
    v-loading='loading'
  )
      el-table(
        :data='items'
        v-if='items'
        v-loading='loading'
        @sort-change='handleSortChange'
      )
        el-table-column(
          prop='account'
          label='Account'
        )
        el-table-column(
          prop='email'
          label='Email'
        )
        el-table-column(
          label='Roles'
          prop='roles'
        )
          template(
            scope='scope'
          )
            el-select(
              v-if='scope.$index === editIndex'
              v-model='currentRoles'
              multiple
            )
              el-option(
                v-for='role in roles'
                :key='role'
                :label='role'
                :value='role'
              )
            span(v-else) {{scope.row.roles && scope.row.roles.join(',')}}
        el-table-column(
          prop='createdAt'
          label='Created At'
          sortable
        )
        el-table-column(
          label='OP'
          width='80'
        )
          template(
            scope='scope'
          )
            el-button(
              v-if='scope.$index !== editIndex'
              @click='handleEdit(scope.$index)'
              type='text'
              size='small'
            ) Edit 
            el-button(
              v-else
              type='text'
              size='small'
              @click='handleUpdate(scope.$index)'
            ) Update 
      div(
        v-if='total'
        :class='$style.filters'
      )
        +TableFilter("Search Account")
</template>
<script src='./account.js'></script>
<style src='@/assets/styles/account.sss' lang="postcss" module></style>
