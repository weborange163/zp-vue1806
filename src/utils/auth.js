//import Cookies from 'js-cookie' //npm install js-cookie -s

const TokenKey = 'tokenId'

export function getToken() {
//return Cookies.get(TokenKey)
  return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
//return Cookies.set(TokenKey, token)
  return sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
//return Cookies.remove(TokenKey)
  return sessionStorage.removeItem(TokenKey)
}
export function getBaceUrl(){
  return process.env.BASE_API
}
export function getNickname(){
  return sessionStorage.getItem('nickname')
}