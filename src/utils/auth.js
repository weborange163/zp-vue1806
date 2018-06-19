//import Cookies from 'js-cookie' //npm install js-cookie -s

const TokenKey = 'tokenKey'

export function getToken() {
//return Cookies.get(TokenKey)
  return sessionStorage.getItem('tokenId')
}

export function setToken(token) {
//return Cookies.set(TokenKey, token)
  return sessionStorage.setItem('tokenId', token)
}

export function removeToken() {
//return Cookies.remove(TokenKey)
  return sessionStorage.removeItem('tokenId')
}