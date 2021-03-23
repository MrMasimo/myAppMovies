<template>
  <div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Notifications',
  computed: {
    ...mapGetters(["getNotify"]),
  },
  watch: {
    getNotify: "showNotification"
  },
  methods:{
    showNotification( { msg, title, variant } ){
      this.$bvToast.toast(msg, {
          title,
          toaster: "b-toaster-bottom-right",
          variant,
          solid: true,

        })
    }
  }
}
</script>

<style scoped>

</style>