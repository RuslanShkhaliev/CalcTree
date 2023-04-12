<template>
    <div
        class="tooltip-remove"
        tabindex="-1"
    >
        <button
            class="tooltip-remove__close"
            @click="closeTooltip"
        ></button>
        <div class="tooltip-remove__header">
            <span>{{ !editing ? 'Форматирование' : 'Личный Объем' }}</span>
        </div>
        <div class="tooltip-remove__body">
            <div v-if="!editing">
                <div
                    v-if="card.list.length"
                    class="tooltip-remove__row"
                >
                    <div
                        class="tooltip-remove__label"
                        @click.once="deleteChildren"
                    >
                          <span class="tooltip-remove__icon">
                            <Icon src="remove" />
                          </span>
                        <span>Удалить ветку</span>
                    </div>
                </div>
                <div
                    class="tooltip-remove__row"
                    v-if="!card.root"
                >
                    <div
                        class="tooltip-remove__label"
                        @click.once="deleteCardWithChildren"
                    >
                          <span class="tooltip-remove__icon">
                            <Icon src="layer-1" />
                          </span>
                        <span>Удалить партнера и ветку</span>
                    </div>
                </div>
                <div class="tooltip-remove__row">
                    <div
                        class="tooltip-remove__label"
                        @click.once="editPersonalVolume"
                        v-if="!editing"
                    >
                          <span class="tooltip-remove__icon">

                              <Icon src="capa-1" />
                          </span>
                        <span>Редактировать личный объем</span>
                    </div>
                </div>
            </div>
            <div
                class="tooltip-remove__edit"
                v-if="editing"
            >
                <input
                    class="tooltip-remove__edit-input"
                    type="text"
                    v-model.number="selfVolume"
                    placeholder="Введите значение"
                    @keypress.enter="savePersonalVolume"
                    maxlength="5"
                >
                <div class="tooltip-remove__edit__btn-group">
                    <button
                        @click="editing = false"
                        class="edit__btn edit__btn-cancel"
                    >Cancel
                    </button>
                    <button
                        @click="savePersonalVolume"
                        class="edit__btn edit__btn-save"
                    >Save
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script
    setup
    lang="ts"
>
import {computed, onMounted, onUnmounted, ref} from 'vue';
import {useUserState} from '../../composables/useUserState';
import Icon from '../UI/Icon.vue';

const props = defineProps({
    card: Object,
});


const removeCard = ref('children-tree');
const open = ref(true);
const tooltipDeleted = ref(false);
const editing = ref(false);
const selfVolume = ref(0);

const {tooltipIsOpen, tooltipIsShow, closeTooltipCache} = useUserState();

const selfVolumeParsed =
    computed(() =>
        selfVolume.value ? parseInt(selfVolume.value + '', 10) : 0);

const closeTooltip = () => {
    tooltipDeleted.value = true;
    closeTooltipCache();
}

const closeByKeypress = (e) => {
    if (props.card.tooltip.isOpen && e.key === 'Escape') {
        closeTooltip();
    }
};

const savePersonalVolume = () => {
    if (props.card.root && selfVolumeParsed.value <= 70) {
        return props.card.l_amount = 70;
    }
    props.card.l_amount = selfVolumeParsed.value;
    editing.value = false;
    closeTooltip();
}

const focusOut = (e) => {
    if (e.currentTarget.contains(e.target) && !e.target.classList.contains('user-card__btn')) {
        savePersonalVolume();
        closeTooltipCache();
        return false;
    }
}

const deleteChildren = () => {
    props.card.list = props.card.list.slice(0, 0);
    closeTooltip();
}

const deleteCardWithChildren = () => {
    let parentChildren = props.card.parentCard.list;
    let elemIndex = parentChildren.indexOf(this.card);

    closeTooltip()
    parentChildren.splice(elemIndex, 1);
}

const editPersonalVolume = () => {
    editing.value = true;
}


onMounted(() => {
    selfVolume.value = props.card.l_amount ?? 0;
    document.body.addEventListener('keydown', closeByKeypress);
});

onUnmounted(() => {
        document.body.removeEventListener('keydown', closeByKeypress);
})
</script>

<style lang="scss">
.tooltip-remove {
    width: auto;
    min-width: 100%;
    transform-origin: 0 50%;
    padding-bottom: 10px;

    &:focus {
        outline: none;

        .tooltip-remove__header {
            background: #324354;
            color: #fff;
        }

        .tooltip-remove__close {
            &:after,
            &:before {
                background: #fff;
            }
        }
    }

    &__close {
        position: absolute;
        z-index: 10;
        top: 2px;
        right: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        height: 20px;
        padding: 2px;
        outline: none;
        border-radius: 50%;
        transition: .3s;

        &:hover {
            background: rgba(#fff, .22);
        }

        &:before,
        &:after {
            content: '';
            position: absolute;
            display: block;
            width: 10px;
            height: 2px;
            background: rgba(#000, .4);
            top: 50%;
            left: 50%;
            transition: inherit;
        }

        &:before {
            transform: translate(-50%, -50%) rotate(45deg)
        }

        &:after {
            transform: translate(-50%, -50%) rotate(-45deg)
        }

        svg {
            pointer-events: none;
        }
    }

    &__header {
        font-size: 14px;
        font-weight: 600;
        background: #ffc107;
        color: #000;
        padding: 4px 10px;
        transition: .3s;
        display: flex;
        justify-content: center;
    }

    &__label {
        display: flex;
        align-items: center;
        padding: 8px 12px;
        white-space: nowrap;
        cursor: pointer;
        transition: .3s ease;
        font-size: 12px;
        color: #324354;

        &:hover {
            /*background: rgba(#ccc, .22);*/
            background: rgba(#ffc107, .33);
        }
    }

    &__edit {
        padding: 10px 10px 0;

        &-input {
            padding: 5px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            box-shadow: inset 0 1px 3px #ddd;
            border-radius: 4px;

            &:focus {
                box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
            }

        }

        &__btn-group {
            display: flex;
            justify-content: space-between;
        }
    }

    &__icon {
        display: flex;
        width: 18px;
        margin-right: 10px;
    }
}

.edit__btn {
    width: 45%;
    padding: 5px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    transition: .3s ease;
    border: 1px solid transparent;

    &-cancel {
        background: transparent;
        border-color: rgba(#363F3E, .4);

        &:hover {
            background: rgba(#363F3E, 1);
            color: #ffc107;
        }

        /*box-shadow: inset 0 0 1px 1px rgba(0, 0, 0, .5);*/
    }

    &-save {
        background: #ffc107;

        &:hover {
            background: darken(#ffc107, 5%);
        }
    }
}
</style>
