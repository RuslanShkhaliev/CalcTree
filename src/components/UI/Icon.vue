<template>
    <svg :class="`svg-icon icon-${src} ${css}`">
        <use v-bind="{ 'xlink:href': `${sprite}#icon-${src}` }"></use>
    </svg>
</template>

<script
    setup
    lang="ts"
>
import sprite from '../../assets/icon/sprite.svg';

defineProps({
    src: String,
    css: String,
})

</script>


<style
    lang="scss"
    scoped
>

</style>
