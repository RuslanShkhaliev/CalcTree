<template>
  <div>
    <div class="table__header">
      <span>Маркетинг-план, блок бонус.</span>
    </div>
   <div>
     <table-section-header :title="'bonus'"></table-section-header>
     <ul
       class="table__row"
       v-for="(obj, index) of data"
       :key="index"
     >
       <li class="table__col">{{obj.user_id}}</li>
       <li class="table__col">{{obj.point}}</li>
     </ul>
   </div>
  </div>
</template>

<script>
  import TableSectionHeader from "../TableSectionHeader";
  export default {
    components: {TableSectionHeader},
    props: {
      data: [Object,Array],
    },
    mounted() {
      console.log(this.data);
    }
  }
</script>

<style lang="scss">

</style>