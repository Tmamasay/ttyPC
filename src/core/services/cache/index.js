import Cookies from 'js-cookie'
import { TOKEN_KEY, LANGUAGE_KEY, REFRSHTOKEN_KEY, USERINFO,SHOWTAB } from '@/constants/settings'
export const getToken = () => Cookies.get(TOKEN_KEY)
export const setToken = (token) => Cookies.set(TOKEN_KEY, token)
export const removeToken = () => Cookies.remove(TOKEN_KEY)
// 操作tab
export const getTab = () => Cookies.get(SHOWTAB)
export const setTab = (Tab) => Cookies.set(SHOWTAB, Tab)
export const removeTab = () => Cookies.remove(SHOWTAB)
// 操作用户信息
export const getUserInfo = () => JSON.parse(Cookies.get(USERINFO) ? Cookies.get(USERINFO) : null)
export const setUserInfo = (info) => Cookies.set(USERINFO, JSON.stringify(info))
export const removeUserInfo = () => Cookies.remove(USERINFO)

// 刷新token
export const getRefreshToken = () => Cookies.get(REFRSHTOKEN_KEY)
export const setRefreshToken = (token) => Cookies.set(REFRSHTOKEN_KEY, token)
export const removeRefreshToken = () => Cookies.remove(REFRSHTOKEN_KEY)

export const getLanguage = () => Cookies.get(LANGUAGE_KEY)
export const setLanguage = language => Cookies.set(LANGUAGE_KEY, language)

export const saveToLocalStorage = (name, content) => window.localStorage.setItem(name, JSON.stringify(content))
export const readFromLocalStorage = name => JSON.parse(window.localStorage.getItem(name))
export const cleanLocalStorage = name => window.localStorage.removeItem(name)
