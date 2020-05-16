<template>
  <div class="modal">
    <div class="modal-bg" @click="closeModalOutside">
    </div>
    <transition name="appear" appear>
      <div class="modal-inner">
        <div class="modal-header">
          <h2 class="modal-header__title">
            {{ TABLE_DATA ? 'Результат вычисления' : 'Вычисление' }}
          </h2>
          <button class="btn-close" @click="closeModal">
            <span>Вернуться к вычислению</span>
            <span class="btn-close__icon">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                   xmlns:xlink="http://www.w3.org/1999/xlink"
                   version="1.1"
                   id="Capa_1" x="0px" y="0px" viewBox="0 0 438.483 438.483"
                   style="enable-background:new 0 0 438.483 438.483;" xml:space="preserve">
<g>
	<g>
		<path
      d="M431.168,230.762c-23.552-75.776-98.304-127.488-187.904-129.024V13.162c0-4.096-3.584-7.68-7.68-7.68    c-1.536,0-3.072,0.512-4.608,1.536L3.136,171.882c-3.584,2.56-4.096,7.168-1.536,10.752c0.512,0.512,1.024,1.024,1.536,1.536    l227.84,163.84c3.584,2.56,8.192,1.536,10.752-1.536c1.024-1.536,1.536-3.072,1.536-4.608v-88.064    c55.296,0,101.888,26.112,118.272,65.536c13.824,33.792,2.56,70.144-30.208,100.352c-3.072,3.072-3.584,7.68-0.512,10.752    c1.536,1.536,3.584,2.56,5.632,2.56h6.144c1.536,0,3.072-0.512,4.096-1.536C421.952,381.802,454.208,304.49,431.168,230.762z"/>
	</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
            </span>
          </button>
        </div>
        <div class="modal-body">
          <calculate-table v-if="TABLE_DATA"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import ClickOutside from 'vue-click-outside';
  import {mapActions, mapGetters} from 'vuex';

  export default {
    components: {
      CalculateTable: () => import ('../table/CalculateTable'),
    },
    directives: {
      ClickOutside,
    },
    computed: {
      ...mapGetters(['TABLE_DATA'])
    },
    methods: {
      ...mapActions(['closeModal']),
      closeModalOutside(e) {
        if (e.target.classList.contains('modal-bg')) {
          console.log(e.target);
          this.closeModal()
        }
      },
    },

  }
</script>

<style lang="scss">
  .modal {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    z-index: 200;
    padding: 50px 20px 20px;
    background: rgba(0, 0, 0, .5);

    &-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(0, 0, 0, .5);
      cursor: pointer;
    }

    &-inner {
      position: relative;
      min-width: 780px;
      width: 80vw;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #f8f8f8;
      border-radius: 6px 6px 0 0 ;
      overflow: hidden;
      padding-bottom: 20px;
    }

    &-header {
      position: sticky;
      top: -100px;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      padding: 0 20px;
      background: #ffc107;

      &__title {
        font-size: 20px;
        font-weight: 600;
        text-transform: uppercase;
      }
    }

    .btn-close {
      align-self: stretch;
      display: flex;
      align-items: center;
      &__icon {
        width: 25px;
        height: 25px;
        margin: 0 10px;
      }

      background: #ffc107;
      font-size: 18px;
      font-weight: 600;
      z-index: 1000;
    }

    &-body {
      min-width: 712px;
      width: 100%;
      height: 80vh;
      overflow-y: auto;
      flex-grow: 1;
    }

  }
</style>