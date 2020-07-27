export const state = () => ({
  colorstyle: "",
  worksCategory: "",
  count: 0,
  menuFlag: false
});

export const mutations = {
  increment(state) {
    state.count++;
  },
  menuOpenFlag(state, flag) {
    state.menuFlag = flag;
  },
  colorUpdate(state, color) {
    state.colorstyle = color;
  }
};

export const action = {};
export const getters = {
  getColor(state) {
    return state.colorstyle;
  }
};
