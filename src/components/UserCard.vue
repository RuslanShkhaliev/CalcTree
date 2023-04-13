<template>
    <Transition
        name="appear"
        appear
    >
        <div
            class="user-container"
            ref="container"
            :class="{root: card.isRoot}"
        >
            <div
                :class="['user-card', {'tree-line-to': card.hasPartners}]"
                tabindex="0"
            >
                <div class="user-card__inner">
                    <div
                        class="user-card__body"
                        @mouseenter="showTooltipInfo = true"
                        @mouseleave="showTooltipInfo = false"
                    >
                        <div class="user-card__top">
                            <span class="user-card__top-name">
                                {{ card.name }}
                            </span>
                        </div>
                        <div class="user-card__line">
                            <span :title="card.personalVolume">
                                ЛО: {{ card.personalVolume }}
                            </span>
                            <span :title="card.groupVolume">
                                ГО: {{ card.groupVolume }}
                            </span>
                            <span :title="0">Ранг: R</span>
                        </div>
                        <div class="structure__table-about-progress progress">
                            <div class="structure__table-about-progress-inner"
                                 :style="{width: progressBar}"
                            ></div>
                        </div>
                    </div>
                    <button
                        class="user-card__btn user-card__btn-add"
                        v-if="!createDisabled"
                        @click="createCard"
                    >
                        <Icon src="list" />
                    </button>
                    <Transition name="appear">
                        <button
                            class="user-card__btn user-card__btn-menu"
                            @click.stop="showTooltipSettings =
                            !showTooltipSettings"
                        >
                            <Icon src="menu"/>
                        </button>
                    </Transition>
                </div>

                    <div class="tooltip-wrapper">
                        <div class="tooltip-inner">
                            <TransitionGroup
                                name="tooltip-appear"
                                mode="out-in"
                            >
                                    <TooltipInfo
                                        v-if="canShowInfo"
                                        :group-volume="card.groupVolume"
                                        :name="card.name"
                                        :partners="card.partners.length"
                                        :personal-volume="card.personalVolume"
                                        :allocate="progressBar"
                                    />
                                    <TooltipSettings
                                        v-if="showTooltipSettings"
                                        :card="card"
                                        @set-volume="setVolume"
                                        @remove-branches="removePartners"
                                        @remove-partner="removePartner"
                                        @remove-partner-with-save="removePartnerWithSave"
                                        @close="showTooltipSettings = false"
                                    />
                            </TransitionGroup>
                        </div>
                    </div>
            </div>
            <Transition name="child-appear">
                <UserChildren
                    ref="children"
                    :card-list="card.partners"
                />
            </Transition>
        </div>
    </Transition>

</template>

<script
    lang="ts"
    setup
>
import {computed, inject, Ref, ref} from 'vue';
import {UserEntity} from '../models/user.entity';
import TooltipInfo from './tooltip/TooltipInfo.vue';
import TooltipSettings from './tooltip/TooltipSettings.vue';
import Icon from './UI/Icon.vue';
import UserChildren from './UserChildren.vue'; // const CardTooltip = () => import('./tooltip/CardTooltip.vue');
// const CardTooltip = () => import('./tooltip/CardTooltip.vue');

const props = defineProps<{card: UserEntity}>()

const showTooltipInfo = ref(false)
const showTooltipSettings = ref(false)

const canShowInfo = computed(() => showTooltipInfo.value &&
    !showTooltipSettings.value)

console.log(props.card.id, 'props.card.id');
// COMPUTED


const createDisabled = computed(() => props.card.partners.length >= 8);
// METHODS

const counter = inject('counter') as Ref<number>

const progressBar = computed(() => props.card.allocate + '%')

const createCard = () => {
    try {
        props.card.addPartner(
            new UserEntity({
                id: ++counter.value,
                name: `Partner-${counter.value}`,
                parent: props.card
            })
        )
    } catch (e) {
        alert(e.message)
    }
};



const setVolume = (volume) => {
    try {
        props.card.setVolume(volume)
    } catch (e) {
        alert(e.message)
    }
}

const removePartners = () => {
    props.card.removePartners()
}
const removePartner = () => {
    console.log('remove-partner')
    props.card.removePartner()
}

const removePartnerWithSave = () => {
    props.card.removePartnerWithSave()
}


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
    overflow: hidden;

    &-inner {
        height: 100%;
        background: #738bd9;
    }
}

.tree-line-to:after {
    animation: lazyAppear .6s forwards ease;
}

.tooltip-wrapper {
    position: absolute;
    left: 0;
    bottom: 100%;
    z-index: 1000;
    width: auto;
    margin-bottom: 10px;
    /*box-shadow: 0 4px 8px rgba(0, 0, 0, .1);*/
    box-shadow: 0 4px 14px rgba(0, 0, 0, .1);

    &:before {
        content: '';
        position: absolute;
        z-index: -1;
        bottom: 0;
        left: 0;
        transform: translate(16px, 48%) rotate(45deg);
        width: 10px;
        height: 10px;
        border-radius: 16%;
        background: #fff;
    }
}

.tooltip-inner {
    background: #fff;
    border-radius: 5px;
    overflow: hidden;
}

</style>
