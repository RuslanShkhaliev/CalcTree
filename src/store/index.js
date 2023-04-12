import {defineStore} from 'pinia';
import table from '../FAKE/table.json'

export const useUserStore = defineStore('user', {
   state: () => ({
     user: null,
     cacheCard: null,
     tooltipComponent: null,
     tooltipIsShow: false,
     userCounter: 1,
     tableData: null,
     modalIsOpen: false
   }),
  getters: {
    tooltipIsShow: state => state.tooltipIsShow,
    getRootUser: state => state.user,
    tableData: state => state.tableData,
    modalIsOpen: state => state.modalIsOpen,
    tooltipIsOpen: state => state.cacheCard.tooltip.isOpen
  },
  actions: {
    GET_USER(state) {
      this.state.user = {
        root: true,
        id: `Vasya-${state.id}`,
        firstName: "Vasya",
        lastName: "Pupkin",
        groupVolume: 0,
        groupVolumeProgressBar: 0,
        countOfChildren: 8,
        countOfFirstLine: "0",
        l_amount: 70,
        list: [],
        deepLvl: 1,
        tooltip: {
          isOpen: false,
          info: 'TooltipInfo',
          removing: 'TooltipRemove'
        }
      }
    },
    ADD_CARD_TO_CACHE(state, card) {
      state.tooltipIsShow = true;
      card.tooltip.isOpen = true;
      state.cacheCard = card;
    },
    CLOSE_TOOLTIP(state) {
      state.tooltipIsShow = false
      if (state.cacheCard) {
        state.cacheCard.tooltip.isOpen = false;
      }
    },
    ADD_CARD(state, [card, data]) {
      card.list.push(data);
    },
    OPEN_MODAL(state) {
      state.modalIsOpen = !state.modalIsOpen;
    },
    CLOSE_MODAL(state) {
      state.modalIsOpen = false;
    },
    SET_TABLE_DATA(state) {
      state.tableData = Object.assign({}, table)
    },
    DELETE_TABLE_DATA(state) {
      state.tableData = null
    },
    openModal({commit, state}) {
      commit('OPEN_MODAL');
      if (state.modalIsOpen) {
        setTimeout(() => commit('SET_TABLE_DATA'), 2000);
        document.body.style.overflow = 'hidden';
      } else {
        commit('DELETE_TABLE_DATA');
        document.body.style.overflow = '';
      }
    },
    closeModal({commit}) {
      commit('CLOSE_MODAL');
      commit('DELETE_TABLE_DATA');
      document.body.style.overflow = '';
    },
    closeTooltipCache({commit}) {
      commit('CLOSE_TOOLTIP');
    },
    closeOutside({commit}) {
      commit('CLOSE_TOOLTIP');
    },
    openTooltip({commit}, card) {
      commit('CLOSE_TOOLTIP');
      commit('ADD_CARD_TO_CACHE', card)
    },
    add_card({commit, state}, card) {
      if (!card) commit('GET_USER');
      if (card) {
        state.userCounter++;
        let data = {
          id: `partner-${state.userCounter}`,
          parentName: card.firstName,
          firstName: 'partner-',
          lastName: `${state.userCounter}`,
          groupVolume: 0,
          groupVolumeProgressBar: 0,
          countOfChildren: 8,
          countOfFirstLine: "0",
          l_amount: 0,
          list: [],
          deepLvl: card.deepLvl + 1,
          tooltip: {
            isOpen: false,
            info: 'TooltipInfo',
            removing: 'TooltipRemove'
          },
          parentCard: card
        }
        commit('ADD_CARD', [card, data]);
      }
    },
  }
})

//export default new Vuex.Store({
//  state: {
//    user: null,
//    cacheCard: null,
//    tooltipComponent: null,
//    tooltipIsShow: false,
//    userCounter: 1,
//    tableData: null,
//    modalIsOpen: false
//  },
//  mutations: {
//    ADD_CARD_TO_CACHE(state, card) {
//      state.tooltipIsShow = true;
//      card.tooltip.isOpen = true;
//      state.cacheCard = card;
//    },
//    CLOSE_TOOLTIP(state) {
//      state.tooltipIsShow = false
//      if (state.cacheCard) {
//        state.cacheCard.tooltip.isOpen = false;
//      }
//    },
//    GET_USER(state) {
//      Vue.set(state, "user", {
//        root: true,
//        id: `Vasya-${state.id}`,
//        firstName: "Vasya",
//        lastName: "Pupkin",
//        groupVolume: 0,
//        groupVolumeProgressBar: 0,
//        countOfChildren: 8,
//        countOfFirstLine: "0",
//        l_amount: 70,
//        list: [],
//        deepLvl: 1,
//        tooltip: {
//          isOpen: false,
//          info: 'TooltipInfo',
//          removing: 'TooltipRemove'
//        }
//      });
//    },
//    ADD_CARD(state, [card, data]) {
//      card.list.push(data);
//    },
//    OPEN_MODAL(state) {
//      state.modalIsOpen = !state.modalIsOpen;
//    },
//    CLOSE_MODAL(state) {
//      state.modalIsOpen = false;
//    },
//    SET_TABLE_DATA(state) {
//      state.tableData = Object.assign({}, {
//        "user_id": 995,
//        "lo": "70.00",
//        "go": 144661.33000000002,
//        "go_personal": 3368.1099999999997,
//        "rank_id": 12,
//        "all_ye": 15514.27,
//        "block_1_ye": 678.52,
//        "block_2_ye": 9009.07,
//        "block_3_ye": 5701.68,
//        "bonus": 125,
//        "data": {
//          "block_1": [
//            {
//              "user_id": 995,
//              "rank_id": 12,
//              "percent": 27,
//              "ye": 18.9,
//              "go_personal": 3368.1099999999997,
//              "go_common": 144661.33000000002,
//              "go": 144661.33000000002,
//              "go_block_1": "70.00",
//              "lo": "70.00",
//              "depth": 0
//            },
//            {
//              "user_id": 2792,
//              "rank_id": 4,
//              "percent": 20,
//              "ye": 304.42,
//              "go_personal": 1522.1200000000001,
//              "go_common": 15370.95,
//              "go": 15370.95,
//              "go_block_1": 70,
//              "lo": "70.00",
//              "depth": 1
//            },
//            {
//              "user_id": 1000,
//              "rank_id": 4,
//              "percent": 20,
//              "ye": 355.2,
//              "go_personal": 1775.9899999999998,
//              "go_common": 8751.91,
//              "go": 8751.91,
//              "go_block_1": 70,
//              "lo": "70.00",
//              "depth": 1
//            }
//          ],
//          "block_2": [
//            {
//              "depth": 1,
//              "real_d": 1,
//              "user_id": 1003,
//              "rank_id": 9,
//              "go_personal": 11550.11,
//              "go_personal_3": 11550.11,
//              "go_common": 36149.28,
//              "go": 36149.28,
//              "all_lo": 36149.28,
//              "lo": 36149.28,
//              "percent": 8,
//              "ye": 924.01
//            },
//            {
//              "depth": 6,
//              "real_d": 2,
//              "user_id": 12293,
//              "rank_id": 6,
//              "go_personal": 5679.23,
//              "go_personal_3": 5679.23,
//              "go_common": 5679.23,
//              "go": 5679.23,
//              "all_lo": 5679.23,
//              "lo": 5679.23,
//              "percent": 7,
//              "ye": 397.55
//            },
//            {
//              "depth": 5,
//              "real_d": 2,
//              "user_id": 1403,
//              "rank_id": 7,
//              "go_personal": 6284.03,
//              "go_personal_3": 6284.03,
//              "go_common": 9933.42,
//              "go": 9933.42,
//              "all_lo": 9933.42,
//              "lo": 9933.42,
//              "percent": 7,
//              "ye": 439.88
//            },
//            {
//              "depth": 10,
//              "real_d": 3,
//              "user_id": 25379,
//              "rank_id": 6,
//              "go_personal": 3649.3900000000003,
//              "go_personal_3": 3649.3900000000003,
//              "go_common": 3649.3900000000003,
//              "go": 3649.3900000000003,
//              "all_lo": 3649.3900000000003,
//              "lo": 3649.3900000000003,
//              "percent": 5,
//              "ye": 182.47
//            },
//            {
//              "depth": 4,
//              "real_d": 2,
//              "user_id": 21640,
//              "rank_id": 7,
//              "go_personal": 4177.51,
//              "go_personal_3": 4177.51,
//              "go_common": 8986.52,
//              "go": 8986.52,
//              "all_lo": 8986.52,
//              "lo": 8986.52,
//              "percent": 7,
//              "ye": 292.43
//            },
//            {
//              "depth": 5,
//              "real_d": 3,
//              "user_id": 25486,
//              "rank_id": 6,
//              "go_personal": 4809.01,
//              "go_personal_3": 4809.01,
//              "go_common": 4809.01,
//              "go": 4809.01,
//              "all_lo": 4809.01,
//              "lo": 4809.01,
//              "percent": 5,
//              "ye": 240.45
//            },
//            {
//              "depth": 3,
//              "real_d": 1,
//              "user_id": 12001,
//              "rank_id": 7,
//              "go_personal": 9555.65,
//              "go_personal_3": 9555.65,
//              "go_common": 13848.83,
//              "go": 13848.83,
//              "all_lo": 13848.83,
//              "lo": 13848.83,
//              "percent": 8,
//              "ye": 764.45
//            },
//            {
//              "depth": 7,
//              "real_d": 2,
//              "user_id": 12147,
//              "rank_id": 6,
//              "go_personal": 4293.18,
//              "go_personal_3": 4293.18,
//              "go_common": 4293.18,
//              "go": 4293.18,
//              "all_lo": 4293.18,
//              "lo": 4293.18,
//              "percent": 7,
//              "ye": 300.52
//            },
//            {
//              "depth": 1,
//              "real_d": 1,
//              "user_id": 1061,
//              "rank_id": 9,
//              "go_personal": 4750.37,
//              "go_personal_3": 4750.37,
//              "go_common": 27889.91,
//              "go": 27889.91,
//              "all_lo": 27889.91,
//              "lo": 27889.91,
//              "percent": 8,
//              "ye": 380.03
//            },
//            {
//              "depth": 3,
//              "real_d": 2,
//              "user_id": 2320,
//              "rank_id": 6,
//              "go_personal": 11442.73,
//              "go_personal_3": 11442.73,
//              "go_common": 11442.73,
//              "go": 11442.73,
//              "all_lo": 11442.73,
//              "lo": 11442.73,
//              "percent": 7,
//              "ye": 800.99
//            },
//            {
//              "depth": 3,
//              "real_d": 2,
//              "user_id": 3249,
//              "rank_id": 6,
//              "go_personal": 3566.96,
//              "go_personal_3": 3566.96,
//              "go_common": 3566.96,
//              "go": 3566.96,
//              "all_lo": 3566.96,
//              "lo": 3566.96,
//              "percent": 7,
//              "ye": 249.69
//            },
//            {
//              "depth": 9,
//              "real_d": 2,
//              "user_id": 30606,
//              "rank_id": 7,
//              "go_personal": 3058.29,
//              "go_personal_3": 3058.29,
//              "go_common": 8129.85,
//              "go": 8129.85,
//              "all_lo": 8129.85,
//              "lo": 8129.85,
//              "percent": 7,
//              "ye": 214.08
//            },
//            {
//              "depth": 11,
//              "real_d": 3,
//              "user_id": 32141,
//              "rank_id": 6,
//              "go_personal": 5071.56,
//              "go_personal_3": 5071.56,
//              "go_common": 5071.56,
//              "go": 5071.56,
//              "all_lo": 5071.56,
//              "lo": 5071.56,
//              "percent": 5,
//              "ye": 253.58
//            },
//            {
//              "depth": 6,
//              "real_d": 1,
//              "user_id": 1048,
//              "rank_id": 7,
//              "go_personal": 3944.52,
//              "go_personal_3": 3944.52,
//              "go_common": 6975.92,
//              "go": 6975.92,
//              "all_lo": 6975.92,
//              "lo": 6975.92,
//              "percent": 8,
//              "ye": 315.56
//            },
//            {
//              "depth": 11,
//              "real_d": 2,
//              "user_id": 61447,
//              "rank_id": 6,
//              "go_personal": 3031.4,
//              "go_personal_3": 3031.4,
//              "go_common": 3031.4,
//              "go": 3031.4,
//              "all_lo": 3031.4,
//              "lo": 3031.4,
//              "percent": 7,
//              "ye": 212.2
//            },
//            {
//              "depth": 1,
//              "real_d": 1,
//              "user_id": 1062,
//              "rank_id": 11,
//              "go_personal": 3257.92,
//              "go_personal_3": 3257.92,
//              "go_common": 56429.28,
//              "go": 56429.28,
//              "all_lo": 56429.28,
//              "lo": 56429.28,
//              "percent": 8,
//              "ye": 260.63
//            },
//            {
//              "depth": 3,
//              "real_d": 2,
//              "user_id": 1949,
//              "rank_id": 6,
//              "go_personal": 4494.16,
//              "go_personal_3": 4494.16,
//              "go_common": 4494.16,
//              "go": 4494.16,
//              "all_lo": 4494.16,
//              "lo": 4494.16,
//              "percent": 7,
//              "ye": 314.59
//            },
//            {
//              "depth": 2,
//              "real_d": 2,
//              "user_id": 1391,
//              "rank_id": 6,
//              "go_personal": 5776.570000000001,
//              "go_personal_3": 5776.570000000001,
//              "go_common": 5776.570000000001,
//              "go": 5776.570000000001,
//              "all_lo": 5776.570000000001,
//              "lo": 5776.570000000001,
//              "percent": 7,
//              "ye": 404.36
//            },
//            {
//              "depth": 2,
//              "real_d": 2,
//              "user_id": 1301,
//              "rank_id": 6,
//              "go_personal": 3541.71,
//              "go_personal_3": 3541.71,
//              "go_common": 3541.71,
//              "go": 3541.71,
//              "all_lo": 3541.71,
//              "lo": 3541.71,
//              "percent": 7,
//              "ye": 247.92
//            },
//            {
//              "depth": 2,
//              "real_d": 2,
//              "user_id": 1543,
//              "rank_id": 9,
//              "go_personal": 2491.09,
//              "go_personal_3": 2491.09,
//              "go_common": 29545.58,
//              "go": 29545.58,
//              "all_lo": 29545.58,
//              "lo": 29545.58,
//              "percent": 7,
//              "ye": 174.38
//            },
//            {
//              "depth": 4,
//              "real_d": 3,
//              "user_id": 3302,
//              "rank_id": 6,
//              "go_personal": 3208.64,
//              "go_personal_3": 3208.64,
//              "go_common": 3208.64,
//              "go": 3208.64,
//              "all_lo": 3208.64,
//              "lo": 3208.64,
//              "percent": 5,
//              "ye": 160.43
//            },
//            {
//              "depth": 4,
//              "real_d": 3,
//              "user_id": 1088,
//              "rank_id": 6,
//              "go_personal": 3734.72,
//              "go_personal_3": 3734.72,
//              "go_common": 3734.72,
//              "go": 3734.72,
//              "all_lo": 3734.72,
//              "lo": 3734.72,
//              "percent": 5,
//              "ye": 186.74
//            },
//            {
//              "depth": 3,
//              "real_d": 3,
//              "user_id": 1230,
//              "rank_id": 7,
//              "go_personal": 4886.95,
//              "go_personal_3": 4886.95,
//              "go_common": 20111.13,
//              "go": 20111.13,
//              "all_lo": 20111.13,
//              "lo": 20111.13,
//              "percent": 5,
//              "ye": 244.35
//            },
//            {
//              "depth": 5,
//              "real_d": 4,
//              "user_id": 1418,
//              "rank_id": 8,
//              "go_personal": 2358.03,
//              "go_personal_3": 2358.03,
//              "go_common": 15224.18,
//              "go": 15224.18,
//              "all_lo": 15224.18,
//              "lo": 15224.18,
//              "percent": 5,
//              "ye": 117.9
//            },
//            {
//              "depth": 7,
//              "real_d": 5,
//              "user_id": 13043,
//              "rank_id": 6,
//              "go_personal": 3010.59,
//              "go_personal_3": 3010.59,
//              "go_common": 3010.59,
//              "go": 3010.59,
//              "all_lo": 3010.59,
//              "lo": 3010.59,
//              "percent": 3,
//              "ye": 90.32
//            },
//            {
//              "depth": 7,
//              "real_d": 5,
//              "user_id": 2497,
//              "rank_id": 7,
//              "go_personal": 4181.88,
//              "go_personal_3": 4181.88,
//              "go_common": 9855.56,
//              "go": 9855.56,
//              "all_lo": 9855.56,
//              "lo": 9855.56,
//              "percent": 3,
//              "ye": 125.46
//            },
//            {
//              "depth": 9,
//              "real_d": 6,
//              "user_id": 2122,
//              "rank_id": 6,
//              "go_personal": 5673.68,
//              "go_personal_3": 5673.68,
//              "go_common": 5673.68,
//              "go": 5673.68,
//              "all_lo": 5673.68,
//              "lo": 5673.68,
//              "percent": 2,
//              "ye": 113.47
//            },
//            {
//              "depth": 5,
//              "real_d": 2,
//              "user_id": 1528,
//              "rank_id": 7,
//              "go_personal": 5498.2,
//              "go_personal_3": 5498.2,
//              "go_common": 9813.34,
//              "go": 9813.34,
//              "all_lo": 9813.34,
//              "lo": 9813.34,
//              "percent": 7,
//              "ye": 384.87
//            },
//            {
//              "depth": 6,
//              "real_d": 3,
//              "user_id": 1066,
//              "rank_id": 6,
//              "go_personal": 4315.139999999999,
//              "go_personal_3": 4315.139999999999,
//              "go_common": 4315.139999999999,
//              "go": 4315.139999999999,
//              "all_lo": 4315.139999999999,
//              "lo": 4315.139999999999,
//              "percent": 5,
//              "ye": 215.76
//            }
//          ],
//          "block_3": [
//            {
//              "depth": 1,
//              "user_id": 1003,
//              "rank_id": 9,
//              "go_block_3": 36149.28,
//              "percent": 5,
//              "procent_b3": 5,
//              "ye": 1807.46
//            },
//            {
//              "depth": 1,
//              "user_id": 1061,
//              "rank_id": 9,
//              "go_block_3": 27889.91,
//              "percent": 5,
//              "procent_b3": 5,
//              "ye": 1394.5
//            },
//            {
//              "depth": 1,
//              "user_id": 1062,
//              "rank_id": 11,
//              "go_block_3": 56429.28,
//              "percent": 1,
//              "procent_b3": 1,
//              "ye": 564.29
//            },
//            {
//              "user_id": 995,
//              "go_block_3": 24192.86,
//              "procent_b3": 8,
//              "rank_id": 12,
//              "ye": 1935.43
//            }
//          ],
//          "bonus": [
//            {
//              "user_id": 1003,
//              "depth": 1,
//              "point": 25
//            },
//            {
//              "user_id": 2792,
//              "depth": 1,
//              "point": 25
//            },
//            {
//              "user_id": 1061,
//              "depth": 1,
//              "point": 25
//            },
//            {
//              "user_id": 1000,
//              "depth": 1,
//              "point": 25
//            },
//            {
//              "user_id": 1062,
//              "depth": 1,
//              "point": 25
//            }
//          ]
//        }
//      })
//    },
//    DELETE_TABLE_DATA(state) {
//      state.tableData = null
//    }
//  },
//  actions: {
//
//  },
//
//})
