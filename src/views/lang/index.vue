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
    div(
      :class='$style.filters'
    )
      +TableFilter("Search Category")
</template>
<script src='./lang.js'></script>
<style src='@/assets/styles/lang.sss' lang="postcss" module></style>
