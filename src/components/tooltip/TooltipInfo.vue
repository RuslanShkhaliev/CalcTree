<template>
  <div class="tooltip-card">
    <div class="tooltip-card__body">
      <span class="tooltip-card__name">
        {{name}}
      </span>
      <span>ЛО: {{personalVolume}}</span>
      <span>ГО: {{groupVolume}}</span>
      <span>Ранг: R</span>
      <span>ГО ПЕРС.: {{groupVolume}}</span>
      <span>Кол-во менеджеров: {{partners}}</span>
      <span>Аллокация: {{allocate}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps<{
    personalVolume: number
    groupVolume: number
    partners: number | string
    name: string
    allocate: string
}>()
</script>

<style lang="scss">
  .tooltip-card {
    max-width: 280px;
    min-width: 220px;
    pointer-events: none;

    &__body {
      max-height: 160px;
      overflow-y: auto;
      background: #fff;
      padding: 10px;
      display: flex;
      flex-direction: column;

      span {
        font-size: 12px;
        font-weight: 500;
        margin-bottom: 5px;
      }
    }

    &__name {
      position: relative;
      padding-left: 18px;

      &:after {
        position: absolute;
        top: 2px;
        left: 0;
        background: #ff9f0a;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        content: " ";
      }
    }

    .icon {
      display: block;
      color: #fff;
      font-size: 40px;
      position: absolute;
      top: calc(100% - 28px);
      left: 0;
      transform: rotate(0);
    }
  }

</style>
