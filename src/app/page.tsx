import Image from 'next/image'
import styles from '@/app/page.module.scss'
import LandingPage from './landingPage/page'


export default function Home() {
  return (
    <main className={styles.main}>
        <LandingPage />
    </main>
  )
}
