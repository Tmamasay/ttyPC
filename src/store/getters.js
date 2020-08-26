const getters = {
  language: state => state.app.language,
  token: state => state.user.token,
  showTab: state => state.user.showTab
}
export default getters
