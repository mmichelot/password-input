<template>
  <b-button @click="generate">Generate a password</b-button>
</template>

<script>
export default {
  methods: {
    generate() {
      let password = '';
      for (let i = 0; i < 3; i++) {
        password += 'abcdefghijklmnopqrstuvwxyz'.charAt(Math.floor(Math.random() * 26));
        password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(Math.floor(Math.random() * 26));
        password += '0123456789'.charAt(Math.floor(Math.random() * 10));
        password += '![]{}()%&*$#^<>~@|'.charAt(Math.floor(Math.random() * 18));
      }

      this.$emit("input", this.shuffle(password))
    },
    shuffle(s) {
      var a = s.split(""),
        n = a.length;

      for (var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
      }
      return a.join("");
    }
  },


}
</script>

<style>
</style>