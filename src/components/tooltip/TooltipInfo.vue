<template>
  <div class="tooltip-card">
    <div class="tooltip-card__body">
        <span class="tooltip-card__name">
      {{card.firstName}} {{card.lastName}}
      </span>
      <span>ЛО: {{card.l_amount}}</span>
      <span>ГО: {{card.groupVolume}}</span>
      <span>Ранг: R</span>
      <span>ГО ПЕРС.: {{card.groupVolume}}</span>
      <span>Кол-во менеджеров: {{card.countOfChildren}}</span>
    </div>
  </div>
</template>

<script>

  export default {
    props: {
      card: Object
    },
  }
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