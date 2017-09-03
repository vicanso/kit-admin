<template lang="pug">
  include ../common
  div(v-if='type !== 3')
    +AdminAuthority
  .clearfix(
    v-else
    :class='$style.table'
    v-loading='loading'
  )
    +EditTable
</template>
<script src='./setting.js'></script>
<style src='@/assets/styles/setting.sss' lang="postcss" module></style>
