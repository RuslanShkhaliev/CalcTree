<template>
  <div>
      app work !
    <div class="wrapper">
      <div class="inner-wrap">
            <UserCard v-if="getRootUser" :card="getRootUser"/>
      </div>
<!--      <button-->
<!--        class="btn-calculate"-->
<!--        v-if="!MODAL_IS_OPEN"-->
<!--        @click="openModal">-->
<!--        Рассчитать-->
<!--      </button>-->
<!--      <modal-calculate v-if="MODAL_IS_OPEN && TABLE_DATA"/>
      <v-loader v-else-if="MODAL_IS_OPEN && !TABLE_DATA"></v-loader>-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import UserCard from './components/UserCard.vue';
import {useUserState} from './composables/useUserState.ts';
//ModalCalculate: () => import('./components/modal/ModalCalculate')

// const VLoader = () => import('./components/preloader/VLoader.vue');

const {getRootUser, addCard, openModal, modalIsOpen, tableData} = useUserState();
console.log(getRootUser.value, 'root')

</script>

<style lang="scss">
  @import "./assets/style/main.scss";

  html, body {
    min-height: 100%;
  }

  body {
    font-family: Helvetica, sans-serif;
    font-size: 16px;
    line-height: 1.2;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .wrapper {
    position: relative;
    min-height: 100vh;
    background: #fff;
    display: flex;
    align-items: center;
  }

  .btn-calculate {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 20px 25px;
    font-weight: 600;
    font-size: 18px;
    background: #FFC200;
  }

  .inner-wrap {
    padding: 20px;

    margin: 0 auto;
  }

  .user-wrapper {
    display: flex;
  }

  /*.btn-calculate {*/
  /*  position: fixed;*/
  /*  top: 10px;*/
  /*  right: 40px;*/
  /*  padding: 20px 40px;*/
  /*  background: #ffc107;*/
  /*  font-size: 18px;*/
  /*  font-weight: 600;*/
  /*  z-index: 1000;*/
  /*}*/
</style>
