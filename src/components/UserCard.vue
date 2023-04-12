<template>
    <Transition
        name="appear"
        appear
    >
        <div
            class="user-container"
            ref="container"
            :class="{root: card.root}"
        >
            <div
                :class="['user-card', {'tree-line-to': hasChildren}]"
                tabindex="0"
            >
                <div class="user-card__inner">
                    <div
                        class="user-card__body"
                        @mouseover="tooltipInfoOpen"
                        @mouseleave="tooltipInfoClose"
                    >
                        <div class="user-card__top">
                            <span class="user-card__top-name">
                                {{ fullName }}
                            </span>
                        </div>
                        <div class="user-card__line">
                            <span :title="card.l_amount">
                                ЛО: {{ card.l_amount }}
                            </span>
                            <span :title="card.groupVolume">
                                ГО: {{ card.groupVolume }}
                            </span>
                            <span :title="0">Ранг: R</span>
                        </div>
                        <div class="structure__table-about-progress progress">
                            <div class="structure__table-about-progress-inner"></div>
                        </div>
                    </div>
                    <button
                        class="user-card__btn user-card__btn-add"
                        v-if="!createDisabled"
                        @click="createCard(card)"
                    >
                        <Icon src="list" />
                    </button>
                    <Transition name="appear">
                        <button
                            class="user-card__btn user-card__btn-menu"
                            v-if="!removingIsActive"
                            @click="tooltipRemoveOpen"
                        >
                            <Icon src="menu"/>
                        </button>
                    </Transition>
                </div>
                <Transition
                    name="tooltip-appear"
                    mode="out-in"
                >
                    <CardTooltip
                        v-if="tooltipIsOpened"
                        :tooltipProps="tooltipProps"
                    />
                </Transition>
            </div>
            <Transition name="child-appear">
                <UserChildren
                    ref="children"
                    v-if="hasChildren"
                    :card-list="cardList"
                />
            </Transition>
        </div>
    </Transition>

</template>

<script
    lang="ts"
    setup
>
import {computed, ref} from 'vue';
import {useUserState} from '../composables/useUserState';
import CardTooltip from './tooltip/CardTooltip.vue';
import Icon from './UI/Icon.vue';
import UserChildren from './UserChildren.vue'; // const CardTooltip = () => import('./tooltip/CardTooltip.vue');
// const CardTooltip = () => import('./tooltip/CardTooltip.vue');

const props = defineProps({
    card: {
        type: Object,
        require: true,
    },
});

const btnIsVisible = ref(true);
const tooltipComponent = ref(null);
console.log(props.card.id, 'props.card.id');
// COMPUTED
const fullName = computed(() =>
    `${props.card.firstName} ${props.card.lastName}`);
const hasChildren = computed(() => props.card?.list.length);

const tooltipProps = computed(() => {
    if (tooltipIsOpened.value) {
        return {
            component: tooltipComponent.value,
            cardData: props.card,
        };
    }
    return null;
});
const tooltipIsOpened = computed(() => {
    return props.card.tooltip.isOpen;
});
const removingIsActive = computed(() => {
    return tooltipIsOpened.value && tooltipComponent.value === props.card.tooltip.removing;
});
const createDisabled = computed(() => {
    return props.card.list.length >= props.card.countOfChildren;
});
const cardList = computed(() => props.card.list);
// METHODS
const {
    tooltipIsShow,
    tooltipIsOpen,
    addCard,
    openTooltip,
    closeTooltipCache,
} = useUserState();

const createCard = (card) => {
    console.log(card, 'parent');
    addCard(card);
};
const tooltipClose = () => {
    if (tooltipIsOpen.value) {
        closeTooltipCache();
        props.card.tooltip.isOpen = false;
    }
};
const tooltipInfoClose = () => {
    if (removingIsActive.value) {
        return;
    }
    props.card.tooltip.isOpen = false;
};
const tooltipInfoOpen = () => {
    if (removingIsActive.value) {
        return;
    }
    tooltipComponent.value = props.card.tooltip.info;
    props.card.tooltip.isOpen = true;
};
const tooltipRemoveOpen = () => {
    openTooltip(props.card);
    tooltipComponent.value = props.card.tooltip.removing;
};

</script>

<style lang="scss">
.user-container {
    position: relative;
    display: flex;
    align-items: center;
}

.user-card {
    position: relative;
    z-index: 10;
    background: #fff;
    border-radius: 4px;
    width: 176px;
    height: 56px;
    box-shadow: 0 6px 20px rgba(57, 70, 111, .08), 0 1px 4px rgba(57, 70, 111, .06);
    transition: .4s ease;

    &:focus {
        outline-color: #ffc107;
        box-shadow: inset 0 1px 1px rgba(#ffc107, 0.075),
        0 0 12px rgba(#ffc107, 0.6);

        .user-card__body {
            color: #fff;
        }
    }

    &:hover {
        box-shadow: -3px 6px 10px 3px rgba(0, 0, 0, .1);
    }

    &:after {
        content: '';
        display: block;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(100%, -50%);
        background: rgba(#000, .7);
        height: 1px;
        width: 100%;
        max-width: 0;
    }

    &__body {
        position: relative;
        padding: 8px 12px;
        display: block;
        height: 56px;
    }

    &__top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;

        &-name {
            font-size: 12px;
            color: #000;
            font-weight: 500;
            position: relative;
            padding-left: 15px;
            max-width: 118px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            background: none;
            outline: none;

            &:after {
                content: "";
                position: absolute;
                top: 2px;
                left: 0;
                background: #ff9f0a;
                width: 10px;
                height: 10px;
                border-radius: 50%;
            }
        }
    }

    &__line {
        width: 100%;
        height: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
            font-weight: 500;
            font-size: 10px;
            color: #000;
            width: 35px;
            /*overflow: hidden;*/
            white-space: nowrap;
            /*text-overflow: ellipsis;*/
        }
    }

    &__btn {
        position: absolute;
        z-index: 10;
        display: flex;
        justify-content: center;
        outline: none;
        transition: .3s;

        svg {
            position: relative;
            z-index: 20;
            pointer-events: none;
        }

        &-add {
            width: 24px;
            height: 24px;
            right: -12px;
            top: calc(50% - 12px);
        }

        &-menu {
            border-radius: 4px;
            width: 24px;
            height: 24px;
            top: calc(50% - 12px);
            left: -12px;
        }

        @media only screen and (max-width: 768px) {
            &-menu {
                opacity: 1;
            }
            &-add {
                width: 30px;
                height: 30px;
                top: calc(50% - 15px);
                right: -15px;
            }
        }
    }


}

.structure__table-about-progress {
    position: absolute;
    bottom: 7px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(115, 139, 217, .3);
    border-radius: 5px;
    height: 4px;
    width: calc(100% - 24px);

    &-inner {
        background: #738bd9;
    }
}

.tree-line-to:after {
    animation: lazyAppear .6s forwards ease;
}

</style>
