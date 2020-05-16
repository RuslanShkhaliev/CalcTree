<template>
  <div>

  </div>
</template>

<script>
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
</style>