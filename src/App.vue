<template>
  <div>
    <password-input v-model="userPassword" @accepted="passwordIsValid = true" @rejected="passwordIsValid = false" />
    {{ passwordIsValid }}
    {{ userPassword }}
  </div>
</template>

<script>
import PasswordInput from './Password-Input.vue';

export default {
  components: {
    PasswordInput
  },
  data() {
    return {
      userPassword: '',
      passwordIsValid: false
    };
  }
};
</script>

