import Cookies from "js-cookie"

export const useCookie = () => {
  const getItem = (key: string) => Cookies.get(key)
  const setItem = (key: string, value: string, expiration: number) => Cookies.set(key, value, { expires: expiration })
  const removeItem = (key: string) => Cookies.remove(key)

  return { getItem, setItem, removeItem }
}
