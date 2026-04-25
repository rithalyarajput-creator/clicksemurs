import { useState, useEffect } from 'react'

const ADMIN_KEY = 'clicksemurs_admin'
const ADMIN_USER = 'admin'
const ADMIN_PASS = 'Admin@123'

export function useAdminAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!sessionStorage.getItem(ADMIN_KEY))

  const login = (username, password) => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      sessionStorage.setItem(ADMIN_KEY, '1')
      setIsLoggedIn(true)
      return true
    }
    return false
  }

  const logout = () => {
    sessionStorage.removeItem(ADMIN_KEY)
    setIsLoggedIn(false)
  }

  return { isLoggedIn, login, logout }
}
