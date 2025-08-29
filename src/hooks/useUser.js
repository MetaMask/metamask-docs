import { useState, useEffect } from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { GET_OPTIONS } from '../lib/constants'

export default function useUser() {
  const { siteConfig } = useDocusaurusContext()
  const { DASHBOARD_URL } = siteConfig?.customFields || {}
  const [user, setUser] = useState(undefined)
  const [loading, setLoading] = useState(true)
  const [keys, setKeys] = useState([])

  const getUserInfo = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${DASHBOARD_URL}/api/me`, GET_OPTIONS)
      const response = await res.json()
      if (response?.data) {
        setUser(response.data)
        const userId = response.data.id
        const upData = await fetch(`${DASHBOARD_URL}/api/v1/users/${userId}/projects`, GET_OPTIONS)
        if (upData.ok) {
          const upProjects = await upData.json()
          const keysArr = upProjects?.result?.projects
          const allKeys = []
          if (keysArr) {
            Object.keys(keysArr).forEach(key => {
              allKeys.push(keysArr[key])
            })
          }
          setKeys([...allKeys])
        }
      }
      if (response?.error) {
        setUser(undefined)
        setKeys([])
      }
    } catch (e) {
      setUser(undefined)
      setKeys([])
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getUserInfo()
  }, [])
  return {
    user,
    keys,
    loading,
  }
}
