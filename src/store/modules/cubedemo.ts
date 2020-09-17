let selectedLabelDefault = {
  label: 'home',
  icon: 'cubeic-home'
};
try {
  if (localStorage.selectedLabelDefault) {
    selectedLabelDefault = localStorage.selectedLabelDefault;
  }
} catch (e) {}
const CubeDemo = {
  state: {
    selectedLabelDefault
  },
  mutations: {
    CHANGE_SELECTED_LABEL(state: any, label: any ) {
    state.selectedLabelDefault = label;
    try {
      localStorage.selectedLabelDefault = label;
    } catch (e) {}
    }
  },
  actions: {
      changeSelectedLabel( {commit}: any, {label}: any ) {
          commit('CHANGE_SELECTED_LABEL', label);
      }
  }
};
export default CubeDemo;
