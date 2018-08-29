<template>
  <div class="wrap-page">
    <CashCouponHeader></CashCouponHeader>
    <CashCouponContent></CashCouponContent>
    <CashCouponNav></CashCouponNav>
  </div>
</template>

<script>
  import CashCouponContent from './myCashCoupon/CashCouponHeader.vue'
  import CashCouponHeader from './myCashCoupon/CashCouponContent.vue'
  import CashCouponNav from './myCashCoupon/CashCouponNav.vue'
export default {
  components: {
    CashCouponHeader,
    CashCouponContent,
    CashCouponNav
  },
  data(){
    return{

    }
  },
  methods:{

  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
