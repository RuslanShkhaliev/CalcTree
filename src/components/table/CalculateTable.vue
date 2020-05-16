<template>
  <div class="table">
    <table-user class="table-section" :data="blockData.user"></table-user>
    <table-block-one class="table-section" :data="blockData.block_1" :common="blockOne"></table-block-one>
    <table-block-two class="table-section" :data="blockData.block_2" :common="blockTwo"></table-block-two>
    <table-block-three class="table-section" :data="blockData.block_3" :common="blockThree"></table-block-three>
    <table-bonus class="table-section" :data="blockData.bonus"></table-bonus>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    components: {
      TableUser: () => import('./tableSections/TableUser'),
      TableBlockOne: () => import('./tableSections/TableBlockOne'),
      TableBlockTwo: () => import('./tableSections/TableBlockTwo'),
      TableBlockThree: () => import('./tableSections/TableBlockThree'),
      TableBonus: () => import('./tableSections/TableBonus'),
    },
    data() {
      return {
        tableData: null,
        blockData: null
      }
    },
    mounted() {
      this.tableData = {...this.TABLE_DATA}
      this.getBlocks();
      this.roundValue(this.blockData);
    },
    computed: {
      ...mapGetters(['TABLE_DATA']),
      user() {
        return this.blockData.user ? this.blockData.user : null
      },
      blockOne() {
        return this.blockData.user.block_1_ye
      },
      blockTwo() {
        return this.blockData.user.block_2_ye
      },
      blockThree() {
        return this.blockData.user.block_3_ye
      }

    },
    methods: {
      getBlocks() {
        this.blockData = {...this.tableData.data}
        delete this.tableData.data;
        this.blockData.user = {...this.tableData}
        return this.blockData;
      },

      roundValue(data) {
        Object.values(data).forEach(item => {
          if (!(item instanceof Array)) {
            Object.entries(item).forEach(([key, val]) => {
              val = Math.ceil(val * 100) / 100
              item[key] = val;
            })
          } else {
            item.forEach(obj => {
              Object.entries(obj).forEach(([key, val]) => {
                val = Math.ceil(val * 100) / 100
                obj[key] = val;
              })
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss">

  .table {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px 25px;
    background: #f8f8f8;
    &-section {
      margin-bottom: 40px;
    }

    &__header {
      text-align: center;
      font-size: 24px;
      font-weight: 600;
    }

    &__row {
      padding: 5px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid darken(#ccc, 10%);

      &-item {
        color: #000;
        padding: 10px;
        font-weight: 400;
      }
    }

    &-title {
      &__list {
        padding: 10px;
        display: flex;
      }
      &__item {
        flex-grow: 1;
        padding: 5px;
        font-size: 12px;
      }
    }

    &__col {
      padding: 5px;
      flex-grow: 1;
      display: flex;
      width: calc(100% / 8);
    }
  }
</style>