<template lang="pug">
  div(
    :class='$style.header'
  )
    el-dropdown.pull-right(
      trigger='click'
      :class='$style.langs'
      @command='handleLangSelect'
    )
      span.el-dropdown-link
        | Langage
        i.el-icon-caret-bottom.el-icon--right
      el-dropdown-menu(
        :class='$style.dropdownMenu'
        slot='dropdown'
      )
        el-dropdown-item(command='en') English 
        el-dropdown-item(command='zh') 中文
    .pull-right(
      :class='$style.userFunctions'
      v-if='inited'
    )
      span(v-if='!userInfo')
        i.el-icon-loading
        | {{ commonLangs.loading }}
      div(v-else-if='userInfo.anonymous')
        a(
          href='javascript:;'
          @click='$router.push("login")'
        )
          i.icon-account.iconfont.bold.font15
          | {{ basicLangs.login }}
        span |
        a(
          href='javascript:;'
          @click='$router.push("register")'
        )
          i.icon-register.iconfont.bold
          | {{ basicLangs.register }}
      div(v-else)
        a(
          href='javascript:;'
          @click='userLogout'
        )
          i.icon-log-out.iconfont.bold
          | {{ userInfo.account }}

    el-menu(
      theme='dark'
      router
      :default-active='$route.path'
      mode='horizontal'
      :class='$style.menu'
      v-if='inited'
    )
      el-menu-item.tac(
        :class='$style.navItem'
        v-for='(item, index) in navItems'
        :route='{ path: item.path }'
        :key='item.path'
        :index='item.path'
      ) {{ item.name }}
</template>

<script src='./app-header.js'></script>
<style src='@/assets/styles/app-header.sss' lang="postcss" module></style>
