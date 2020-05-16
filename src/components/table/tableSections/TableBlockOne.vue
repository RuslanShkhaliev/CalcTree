<template>
  <div>
    <div class="table__header">
      <span>Маркетинг-план, блок 1 (у.е {{common}}).</span>
      <span></span>
    </div>
    <div>
      <table-section-header :title="'block_1'"></table-section-header>
      <ul class="table__row"
          v-for="(obj, index) of data"
          :key="index"
      >
        <li class="table__col table__row-item">{{obj.user_id}}</li>
        <li class="table__col table__row-item">{{obj.lo}}</li>
        <li class="table__col table__row-item">{{obj.go_personal}}</li>
        <li class="table__col table__row-item">{{obj.go_block_1}}</li>
        <li class="table__col table__row-item">{{obj.go_common}}</li>
        <li class="table__col table__row-item">{{obj.percent}}</li>
        <li class="table__col table__row-item">{{obj.rank_id | convert_rank}}</li>
        <li class="table__col table__row-item">{{obj.ye}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import TableSectionHeader from "../TableSectionHeader";
  export default {
    components: {TableSectionHeader},
    props: {
      data: [Object, Array],
      common: Number
    }
  }
</script>

<style lang="scss">

</style>