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
<script src='./mock.js'></script>
<style src='@/assets/styles/mock.sss' lang="postcss" module></style>
