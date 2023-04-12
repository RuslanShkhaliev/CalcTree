<template>
    <div class="children-container">
        <ul :class="['card-list', {'tree-line-from': cardList.length > 1}]">
            <li
                v-for="card of cardList"
                :key="card.id"
                class="card-list__item"
            >
                <UserCard :card="card" />
            </li> 
        </ul>
    </div>

</template>

<script
    lang="ts"
    setup
>
import {UserEntity} from '../models/user.entity';
import UserCard from './UserCard.vue';

const props = defineProps<{
    cardList: UserEntity[]
}>();
console.log(props.cardList);

</script>

<style lang="scss">
.children-container {
    position: relative;
    margin-left: 55px;
}

.card-list {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    z-index: 50;

    &__item {
        position: relative;
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }

        &:before {
            content: '';
            position: absolute;
            left: -50px;
            width: 1px;
            background: #324354;
            transition: opacity .4s ease;
        }

        &:not(:last-child):before,
        &:not(:first-child):before {
            top: 50%;
            height: calc(100% + 22px);
            transform: translateY(-50%) scale(0) rotate(180deg);
            transform-origin: 50% 100%;
            transition-delay: .4s;

        }

        &:first-child:before {
            height: calc(50% + 11px);
            transform: scale(0);
            transform-origin: 50% 100%;
        }

        &:last-child:before {
            height: calc(50% + 11px);
            transform: scale(0);
            top: -11px;
            transform-origin: 50% 0;
        }

    }
}

.tree-line-from {
    padding-left: 50px;

    & > .card-list__item {
        &:before {
            transform: translateY(-50%) scale(1);
            opacity: 1;
        }

        &:first-child:before {
            transform: scale(1);
        }

        &:last-child:before {
            transform: scale(1);
        }

        &:after {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            height: 1px;
            width: 50px;
            background: rgba(#000, .7);
            transform: translate(-100%, -50%);
            transition: .3s ease;
        }
    }

}

.card__item-btn {
    position: absolute;
    z-index: 50;
    left: 0;
    transform: translate(-50%, -50%);
}
</style>
