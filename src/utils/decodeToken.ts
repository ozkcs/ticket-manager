/* eslint-disable react-hooks/rules-of-hooks */
import { useCookie } from '../hooks/useCookie';

// replace using JWT package
const parseJWT = (token: string = '' ) => {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch(e) {
    return null
  }
} 

export const decodeToken = () => {
  const { getItem } = useCookie()
  return parseJWT(getItem('token_id'))
  
}
