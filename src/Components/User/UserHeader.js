import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './UserHeader.module.css'
import UserHeaderNav from './UserHeaderNav'

const UserHeader = () => {
  const [title, setTitle] = useState(null)
  const location = useLocation()
  useEffect(() => {
    if (location.pathname === '/conta') setTitle('Feed')
    if (location.pathname === '/conta/estatisticas') setTitle('Estatísticas')
    if (location.pathname === '/conta/postar') setTitle('Postar foto')
  }, [location])

  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  )
}

export default UserHeader
