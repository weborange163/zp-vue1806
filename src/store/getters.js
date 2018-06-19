const getters = {
  token: state => state.user.token,
  name: state => state.user.name,
  addRouters: state => state.permission.addRouters
}
export default getters