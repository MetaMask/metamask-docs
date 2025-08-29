import React, { useEffect, useState } from 'react'
import { Redirect, useLocation } from '@docusaurus/router'
import useUser from '@site/src/hooks/useUser'
import { NO_FOUND_PAGE, AUTH_ROUTES } from '@site/src/lib/constants'

const AuthRedirect = () => {
  const location = useLocation()
  const { user, loading } = useUser()
  const [currentPage, setCurrentPage] = useState(location.pathname)

  useEffect(() => {
    const authRoute = location.pathname.includes(AUTH_ROUTES.GAS_API)
    const isAuth = user && user?.email.includes('@consensys.net')
    if (authRoute) {
      if (!isAuth && !loading) {
        setCurrentPage(NO_FOUND_PAGE)
        document.body.setAttribute('links', '')
      }
      if (isAuth && !loading) {
        setCurrentPage(location.pathname)
        document.body.setAttribute('links', 'visible')
      }
    } else {
      setCurrentPage(location.pathname)
      if (isAuth) {
        document.body.setAttribute('links', 'visible')
      }
    }
  }, [location.pathname, loading, user])

  return <Redirect to={currentPage} />
}

export default AuthRedirect
