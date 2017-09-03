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
<script src='./monitor.js'></script>
<style src='@/assets/styles/monitor.sss' lang="postcss" module></style>
