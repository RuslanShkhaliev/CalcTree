<template>
  <div>
    <button class="btn-calculate"
            @click="$emit('click', $event)"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script>
  export default {
    props: {

    }
  }
</script>

<style lang="scss">
  .btn-calculate {
    display: flex;
    align-items: center;
    &__icon {
      width: 25px;
      height: 25px;
      margin-right: 10px;
    }
    /*padding: 20px 40px;*/
    background: #ffc107;
    font-size: 18px;
    font-weight: 600;
    z-index: 1000;
  }
</style>