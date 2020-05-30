import Vue from 'vue'
import i18n from '../i18n'

import {
  ValidationProvider,
  ValidationObserver,
  extend,
  configure,
} from 'vee-validate'
import {
  required,
  max,
  min,
  email,
} from 'vee-validate/dist/rules'

configure({
  // this will be used to generate messages.
  defaultMessage: (field, values) => {
    values._field_ = i18n.t(`fields.${field}`);
    return i18n.t(`validations.${values._rule_}`, values);
  }
});

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

extend('required', required)
extend('max', max)
extend('min', min)
extend('email', email)
