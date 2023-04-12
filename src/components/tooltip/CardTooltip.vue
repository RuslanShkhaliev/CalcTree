<template>
    <div class="tooltip-wrapper">
        <div class="tooltip-inner">
            <TooltipInfo
                v-if="tooltipProps.component === 'TooltipInfo'"
                :card="tooltipProps.cardData"
            />
            <TooltipRemove
                v-else
                :card="tooltipProps.cardData"
            />
        </div>
    </div>
</template>

<script
    setup
    lang="ts"
>
import TooltipInfo from './TooltipInfo.vue';
import TooltipRemove from './TooltipRemove.vue';

const props = defineProps({
    tooltipProps: Object,
});
console.log(props.tooltipProps);
</script>

<style lang="scss">
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
