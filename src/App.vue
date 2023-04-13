<template>

    <panZoom
        selector=".inner-wrap"
        :options="{minZoom: 0.5, maxZoom: 5}"
    >
        <div class="wrapper">
            <div class="inner-wrap">
                <UserCard :card="root" />
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
    </panZoom>
</template>

<script
    lang="ts"
    setup
>
import {provide, ref} from 'vue';
import UserCard from './components/UserCard.vue';
import {UserEntity} from './models/user.entity';
//ModalCalculate: () => import('./components/modal/ModalCalculate')

// const VLoader = () => import('./components/preloader/VLoader.vue');

const counter = ref(0);
provide('counter', counter);

const root = ref(
    new UserEntity({
        id: counter.value,
        name: 'Root',
        parent: null,
    }),
);


</script>

<style lang="scss">
@import "./assets/style/main.scss";


.wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #fff;
    overflow: hidden;
}

.inner-wrap {
    padding: 20px;
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
</style>
