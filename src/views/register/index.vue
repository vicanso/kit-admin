<template lang='pug'>
  .submit-form(
    v-loading="!inited || loading"
    :element-loading-text='commonLangs.loading'
  )

    el-form(
      ref='form'
      :model='form'
      :rules='registerRules'
      @submit.native.prevent='onRegister'
      v-if='inited'
    )
      el-form-item(style='margin-top: 30px')
        .bold.tac.font18 {{ userLangs.registerTitle }}

      el-form-item(
        prop='account'
        required
      )
        el-input(
          type='text',
          :placeholder='userLangs.account',
          v-model='form.account',
          autofocus=true
        )

      el-form-item(
        prop='email'
        required
      )
        el-input(
          type='email',
          :placeholder='userLangs.email',
          v-model='form.email',
        )

      el-form-item(
        prop='password'
        required
      )
        el-input(
          type='password',
          :placeholder='userLangs.password',
          v-model='form.password'
        )

      el-form-item
        el-button.block(
          type='primary'
          native-type='submit'
        ) {{ userLangs.register }}
</template>

<script src='./register.js'></script>
