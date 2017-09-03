<template lang='pug'>
  .submit-form(
    v-loading="!inited || loading"
    :element-loading-text='commonLangs.loading'
  )
    el-form(
      ref='form'
      :model='form'
      :rules='loginRules'
      @submit.native.prevent='onLogin'
      v-if='inited'
    )
      el-form-item(style='margin-top: 30px')
        .bold.tac.font18 {{ userLangs.loginTitle }}
      el-form-item(
        prop="account"
        required
      )
        el-input(
          type='text'
          :placeholder='userLangs.account'
          v-model='form.account'
          autofocus=true
        )

      el-form-item(
        prop="password"
        required
      )
        el-input(
          type='password',
          :placeholder='userLangs.password'
          v-model='form.password'
          required
        )

      el-form-item
        el-button.block(
          type='primary'
          native-type='submit'
        ) {{ userLangs.login }}
</template>

<script src='./login.js'></script>
