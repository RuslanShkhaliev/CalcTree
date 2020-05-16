<template>
  <transition name="appear" appear>
    <div class="user-container"
         ref="container"
         :class="{root: card.root}"
    >
      <div :class="['user-card', {'tree-line-to': hasChildren}]"
           tabindex="0"
           v-autofocus="card.root"
      >
        <div class="user-card__inner"
             @mouseover="btnIsVisible = true"
             @mouseleave="btnIsVisible = false"
        >
          <div class="user-card__body"
               @mouseover="tooltipInfoOpen"
               @mouseleave="tooltipInfoClose"
          >
            <div class="user-card__top">
              <span class="user-card__top-name">{{fullName}}</span>
            </div>
            <div class="user-card__line">
              <span :title="card.l_amount">ЛО: {{card.l_amount}}</span>
              <span :title="card.groupVolume">ГО: {{card.groupVolume}}</span>
              <span :title="0">Ранг: R</span>
            </div>
            <div class="structure__table-about-progress progress">
              <div class="structure__table-about-progress-inner"></div>
            </div>
          </div>
          <button class="user-card__btn user-card__btn-add"
                  v-if="!createDisabled"
                  @click="createCard(card)"
          >
            <svg height="100%" viewBox="0 0 512 512" width="100%" xmlns="http://www.w3.org/2000/svg">
              <path
                d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0"
                fill="#ffc107"/>
              <path
                d="m368 277.332031h-90.667969v90.667969c0 11.777344-9.554687 21.332031-21.332031 21.332031s-21.332031-9.554687-21.332031-21.332031v-90.667969h-90.667969c-11.777344 0-21.332031-9.554687-21.332031-21.332031s9.554687-21.332031 21.332031-21.332031h90.667969v-90.667969c0-11.777344 9.554687-21.332031 21.332031-21.332031s21.332031 9.554687 21.332031 21.332031v90.667969h90.667969c11.777344 0 21.332031 9.554687 21.332031 21.332031s-9.554687 21.332031-21.332031 21.332031zm0 0"
                fill="#fafafa"/>
            </svg>
          </button>
          <transition name="appear">
            <button class="user-card__btn user-card__btn-menu"
                    v-if="!removingIsActive"
                    @click="tooltipRemoveOpen"
                    :class="{'is-visible': btnIsVisible}"
            >
              <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg"
                   xmlns:xlink="http://www.w3.org/1999/xlink"
                   version="1.1"
                    id="Capa_1" x="0px" y="0px" viewBox="0 0 54.981 54.981" style="enable-background:new 0 0 54.981 54.981;" xml:space="preserve">
<g>
	<g>
		<path style="fill:#3ABCA7;" d="M43.992,52H8.72c-4.619,0-8.364-3.745-8.364-8.364V8.364C0.356,3.745,4.101,0,8.72,0h35.272    c4.619,0,8.364,3.745,8.364,8.364v35.272C52.356,48.255,48.611,52,43.992,52z"/>
    <path style="fill:#FFFFFF;" d="M44.356,14h-18c-0.552,0-1-0.447-1-1s0.448-1,1-1h18c0.552,0,1,0.447,1,1S44.908,14,44.356,14z"/>
    <path style="fill:#FFFFFF;" d="M44.356,28h-18c-0.552,0-1-0.447-1-1s0.448-1,1-1h18c0.552,0,1,0.447,1,1S44.908,28,44.356,28z"/>
    <path style="fill:#FFFFFF;" d="M44.356,42h-18c-0.552,0-1-0.447-1-1s0.448-1,1-1h18c0.552,0,1,0.447,1,1S44.908,42,44.356,42z"/>
    <path style="fill:#FFFFFF;" d="M12.427,17c-0.209,0-0.42-0.065-0.6-0.2l-4.571-3.429c-0.442-0.331-0.531-0.958-0.2-1.399    c0.331-0.441,0.958-0.531,1.4-0.2l3.822,2.866l6.248-7.288c0.359-0.42,0.991-0.468,1.41-0.108c0.419,0.359,0.468,0.99,0.108,1.409    l-6.857,8C12.989,16.881,12.709,17,12.427,17z"/>
    <path style="fill:#FFFFFF;" d="M12.427,31c-0.209,0-0.42-0.065-0.6-0.2l-4.571-3.429c-0.442-0.331-0.531-0.958-0.2-1.399    c0.331-0.441,0.958-0.531,1.4-0.2l3.822,2.866l6.248-7.288c0.359-0.42,0.991-0.468,1.41-0.108c0.419,0.359,0.468,0.99,0.108,1.409    l-6.857,8C12.989,30.881,12.709,31,12.427,31z"/>
    <path style="fill:#FFFFFF;" d="M12.427,45.999c-0.209,0-0.42-0.065-0.6-0.2L7.256,42.37c-0.442-0.331-0.531-0.958-0.2-1.399    c0.331-0.441,0.958-0.531,1.4-0.2l3.822,2.866l6.248-7.287c0.359-0.421,0.991-0.469,1.41-0.108    c0.419,0.359,0.468,0.99,0.108,1.409l-6.857,7.999C12.989,45.88,12.709,45.999,12.427,45.999z"/>
	</g>
  <g>
		<polygon style="fill:#EDDCC7;" points="33.192,45.489 33.184,45.496 31.196,52.786 35.843,48.139   "/>
    <path style="fill:#D75A4A;" d="M52.442,31.54l-1.247-1.247c-0.775-0.775-2.032-0.775-2.807,0l-3.582,3.582l2.651,2.651    L52.442,31.54z"/>

    <rect x="38.45" y="32.795" transform="matrix(0.7071 0.7071 -0.7071 0.7071 40.8071 -16.5028)" style="fill:#F29C21;" width="3.749" height="16.424"/>
    <polygon style="fill:#D6C4B1;" points="38.841,51.153 38.849,51.145 35.843,48.139 31.196,52.786 31.063,53.274   "/>
    <path style="fill:#A34740;" d="M50.462,39.532l3.582-3.582c0.775-0.775,0.775-2.032,0-2.807l-1.602-1.602l-4.985,4.985    L50.462,39.532z"/>

    <rect x="41.027" y="35.623" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 42.6691 105.3453)" style="fill:#E18C25;" width="4.251" height="16.424"/>
    <path style="fill:#5E5E5E;" d="M30.356,54.981c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l2.207-2.207    c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414l-2.207,2.207C30.868,54.884,30.612,54.981,30.356,54.981z"/>
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
            </button>
          </transition>
        </div>
        <transition name="tooltip-appear" mode="out-in">
          <card-tooltip v-if="tooltipIsOpened"
                        :tooltipProps="tooltipProps"
          />
        </transition>
      </div>
      <transition name="child-appear">
        <user-children ref="children" v-if="hasChildren" :card-list="card.list"></user-children>
      </transition>
    </div>
  </transition>
</template>

<script>
  import {mapActions, mapGetters} from "vuex"
  import UserChildren from "./UserChildren";

  export default {
    components: {
      UserChildren,
      CardTooltip: () => import('./tooltip/CardTooltip'),
    },
    props: {
      card: {
        type: Object,
        require: true,
      },
    },
    data() {
      return {
        btnIsVisible: false,
        tooltipComponent: null,
      }
    },
    computed: {
      ...mapGetters(['tooltip_is_show', 'TOOLTIP_IS_OPEN']),
      fullName() {
        return `${this.card.firstName} ${this.card.lastName}`
      },
      hasChildren() {
        return this.card?.list.length
      },
      tooltipProps() {
        if (this.tooltipIsOpened) {
          return {
            component: this.tooltipComponent,
            cardData: this.card
          }
        } else return null
      },
      tooltipIsOpened() {
        return this.card.tooltip.isOpen
      },
      removingIsActive() {
        return this.tooltipIsOpened && this.tooltipComponent === this.card.tooltip.removing
      },
      createDisabled() {
        return this.card.list.length >= this.card.countOfChildren
      }

    },
    methods: {
      ...mapActions([
        'add_card',
        'closeTooltipCache',
        'openTooltip'
      ]),
      createCard(card) {
        this.add_card(card);
      },
      tooltipClose() {
        if (this.TOOLTIP_IS_OPEN) {
          this.closeTooltipCache();
          this.$set(this.card.tooltip, 'isOpen', false);
        }
      },
      tooltipInfoClose() {
        if (this.removingIsActive) return
        this.card.tooltip.isOpen = false;
      },
      tooltipInfoOpen() {
        if (this.removingIsActive) return
        this.tooltipComponent = this.card.tooltip.info
        this.card.tooltip.isOpen = true
      },
      tooltipRemoveOpen() {
        this.openTooltip(this.card);
        this.tooltipComponent = this.card.tooltip.removing
      },
    },
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
    border: 1px solid #dedede;
    background: #fff;
    border-radius: 4px;
    width: 176px;
    height: 56px;
    box-shadow: -2px 4px 6px rgba(0, 0, 0, .2);
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
      opacity: .6;

      &:hover {
        opacity: 1;
      }

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
        opacity: 0;
        border-radius: 4px;
        width: 24px;
        height: 24px;
        top: calc(50% - 12px);
        left: -12px;

        &.is-visible {
          opacity: 1;
        }
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