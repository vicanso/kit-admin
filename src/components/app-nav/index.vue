<template lang="pug">
  div(
    :class='$style.nav'
  )
    div(
      :class='$style.logo'
    ) LOGO
    el-menu(
      unique-opened='unique-opened'
      @select='functionSelect'
      :class='$style.functions'
    )
      el-submenu(
        v-for='item, index in items'
        :key='item.name'
        :index='index.toString()'
      )
        template(slot='title')
          i.iconfont(:class='item.icon')
          span {{ item.name }}
        el-menu-item-group(:title='item.group')
          el-menu-item(
            v-for='subItem, subIndex in item.items'
            :key='item.name + subItem.name'
            :index='index + "=" + subIndex'
          )
            span {{ subItem.name }}
</template>

<script src='./app-nav.js'></script>
<style src='@/assets/styles/app-nav.sss' lang="postcss" module></style>
