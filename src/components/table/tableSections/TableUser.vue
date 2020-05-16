<template>
  <div>
    <table-section-header :title="'user'"></table-section-header>
    <ul class="table__row">
      <li class="table__col table__row-item">{{id}}</li>
      <li class="table__col table__row-item">{{personalVolume}}</li>
      <li class="table__col table__row-item">{{data.go_personal}}</li>
      <li class="table__col table__row-item">{{data.go}}</li>
      <li class="table__col table__row-item">{{data.rank_id | convert_rank}}</li>
      <li class="table__col table__row-item">{{group_fee}}</li>
      <li class="table__col table__row-item">{{data.bonus}}</li>
      <li class="table__col table__row-item">{{data.all_ye}}</li>
    </ul>
  </div>
</template>

<script>
  import TableSectionHeader from "../TableSectionHeader";

  export default {
    components: {
      TableSectionHeader
    },
    props: {
      data: [Array,Object]
    },
    mounted() {
      console.log('user', this.data);
    },
    computed: {
      group_fee() {
        return this.data.block_1_ye + this.data.block_2_ye + this.data.block_3_ye
      },
      id() {
        return this.data.user_id ? this.data.user_id : '';
      },
      personalVolume() {
        return this.data.lo ? this.data.lo : ''
      }
    }
  }
</script>

<style lang="scss">

</style>