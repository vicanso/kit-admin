import {
  getLang,
} from '@/store';

export const validateAccount = (rule, value, cb) => {
  if (!value) {
    cb(new Error(getLang('user.accountEmpty')));
  } else {
    cb();
  }
};

export const validateEmail = (rule, value, cb) => {
  if (!value) {
    cb(new Error(getLang('user.emailEmpty')));
  } else {
    cb();
  }
};

export const validatePassword = (rule, value, cb) => {
  if (!value) {
    cb(new Error(getLang('user.passwordEmpty')));
  } else {
    cb();
  }
};
