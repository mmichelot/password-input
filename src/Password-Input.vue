<template>
  <section>
    <b-field label="Password">
      <b-input type="password" :value="value" @input="checkPassword" password-reveal message="">
      </b-input>
    </b-field>
    <div class="po-password-strength-bar" :class="powerLabel"></div>
    {{ powerLabel }}
    <b-field label="Repeat password">
      <b-input type="password" v-model="validationPassword" @input="checkValidationPassword" password-reveal>
      </b-input>
    </b-field>
    <password-generator @input="generatePassword"></password-generator>
  </section>
</template>

<script>
import PasswordGenerator from './Password-generator.vue'

export default {
  components: {
    PasswordGenerator
  },
  props: {
    value: {
      default: '',
      type: String
    }
  },
  computed: {

  },
  data() {
    return {
      password: '',
      validationPassword: '',
      passwordPower: 0,
      powerLabel: '',
    }
  },
  methods: {
    checkPassword(e) {
      this.passwordPower = 0
      this.password = e
      this.powerLabel = null
      if (this.password.length < 8) {
        this.$emit('rejected')
        return
      }

      this.passwordPower = this.calcPower(this.password)
      this.powerLabel = this.nameScore(this.passwordPower)
      this.checkValidationPassword()
    },
    checkValidationPassword() {
      if (this.validationPassword === this.password && this.password.length !== 0) {
        this.$emit('accepted')
        this.$emit('input', this.password)
      } else {
        this.$emit('rejected')
      }
    },
    generatePassword(e) {
      navigator.clipboard.writeText(e)
        .then(() => {
          this.$buefy.toast.open('Password copy to clipboard')
          this.validationPassword = e
          this.checkPassword(e)
        })
    },
    calcPower(password) {
      let power = 0
      const specialCharRegex = /[^A-Za-z0-9]/g
      const lowercaseRegex = /(.*[a-z].*)/g
      const uppercaseRegex = /(.*[A-Z].*)/g
      const numberRegex = /(.*[0-9].*)/g

      const hasSpecialChar = specialCharRegex.test(password)
      const hasLowerCase = lowercaseRegex.test(password)
      const hasUpperCase = uppercaseRegex.test(password)
      const hasNumber = numberRegex.test(password)

      if (hasSpecialChar) {
        power++
      }
      if (hasLowerCase) {
        power++
      }
      if (hasUpperCase) {
        power++
      }
      if (hasNumber) {
        power++
      }
      return power
    },
    nameScore(score) {
      switch (score) {
        case 1:
          return 'Faible'
        case 2:
          return 'Moyen'
        case 3:
          return 'Fort'
        case 4:
          return 'Très-fort'
        default:
          return null
      }
    }
  }
}
</script>

<style>
.po-password-strength-bar {
  border-radius: 2px;
  transition: all 0.2s linear;
  height: 5px;
  margin-top: 8px;
}

.po-password-strength-bar.Faible {
  background-color: #f95e68;
  width: 25%;
}

.po-password-strength-bar.Moyen {
  background-color: #fdd244;
  width: 50%;
}

.po-password-strength-bar.Fort {
  background-color: #b0dc53;
  width: 75%;
}

.po-password-strength-bar.Très-fort {
  background-color: #35cc62;
  width: 100%;
}
</style>