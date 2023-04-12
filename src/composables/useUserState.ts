import {computed, reactive} from 'vue';
import table from '../FAKE/table.json';
import {UserEntity} from '../models/userEntity';


export const useUserState = () => {
    const state = reactive<any>({
        user: new UserEntity(1, true),
        cacheCard: null,
        tooltipComponent: null,
        tooltipIsShow: false,
        userCounter: 1,
        tableData: null,
        modalIsOpen: false
    });

    // GETTERS
    const tooltipIsShow = computed(() => state.tooltipIsShow)
    const getRootUser = computed(() => state.user)
    const tableData = computed(() => state.tableData)
    const modalIsOpen = computed(() => state.modalIsOpen)
    const tooltipIsOpen = computed(() => state.cacheCard?.tooltip?.isOpen)

    // ACTIONS
    const closeModal = () => {
        state.modalIsOpen = false
        state.tableData = null
        document.body.style.overflow = '';
    };

    const getUser = () => {
       state.user = new UserEntity(1, true)
    }

    const addCard = (card?: UserEntity) => {
        if (!card) {
            getUser();
        }
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
            card.list.push(data)
        }

    };

    const closeTooltipCache = () => {
            state.tooltipIsShow = false
            if (state.cacheCard) {
                state.cacheCard.tooltip.isOpen = false;
            }
    };

    const openTooltip = (card) => {
        closeTooltipCache()
        state.tooltipIsShow = true;
        card.tooltip.isOpen = true;
        state.cacheCard = card;
    }

    const closeOutside = () => {
        closeTooltipCache();
    }

    const setTableData = () => {
        state.tableData = table
    }

    const deleteTableData = () => {
        state.tableData = null
    }

    const openModal = () => {
        state.modalIsOpen = !state.modalIsOpen;
        if (state.modalIsOpen) {
            setTimeout(setTableData, 2000);
            document.body.style.overflow = 'hidden';
        } else {
            deleteTableData();
            document.body.style.overflow = '';
        }
    }



    return {
        tooltipIsOpen,
        tooltipIsShow,
        getRootUser,
        tableData,
        modalIsOpen,
        closeModal,
        getUser,
        addCard,
        closeTooltipCache,
        openTooltip,
        closeOutside,
        setTableData,
        deleteTableData,
        openModal,
    }
}

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
//      state.tableData = Object.assign({}, )
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
