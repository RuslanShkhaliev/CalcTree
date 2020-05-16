<template>
  <div class="tooltip-wrapper">
    <div class="tooltip-inner">
      <component :is="tooltipProps.component" :card="tooltipProps.cardData"></component>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
      TooltipRemove: () => import('./TooltipRemove'),
      TooltipInfo: () => import('./TooltipInfo')
    },
    props: {
      tooltipProps: Object
    },
    computed: {
      // component() {
      //   return () => import(`@/components/tooltip/${this.tooltipProps.component}`)
      // }
    }
  }
</script>

<style lang="scss">
  .tooltip-wrapper {
    position: absolute;
    left: 0;
    bottom: 100%;
    z-index: 1000;
    width: auto;
    margin-bottom: 10px;
    /*box-shadow: 0 4px 8px rgba(0, 0, 0, .1);*/
    box-shadow: 0 4px 14px rgba(0, 0, 0, .1);
    &:before {
      content: '';
      position: absolute;
      z-index: -1;
      bottom: 0;
      left: 0;
      transform: translate(16px, 48%) rotate(45deg);
      width: 10px;
      height: 10px;
      border-radius: 16%;
      background: #fff;
    }
  }
  .tooltip-inner {
    background: #fff;
    border-radius: 5px;
    overflow: hidden;
  }
</style>