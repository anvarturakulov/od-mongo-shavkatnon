'use client'
import { useState } from 'react'
import { Htag } from './components/htag/Htag'
import { Input } from './components/input/Input'
import styles from './page.module.css'
import Image from 'next/image'
import Link from 'next/link'


export default function Home() {
  const [currentUser, SetCurrentUser] = useState<string>('dashboard')

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Htag tag='h1'>Дастурга кириш</Htag>
        <Htag tag='h3'>{`Иштихон тумани 'Шавкат Нон' хусусий корхонасида ишлаб чикариш ва савдо фаолиятини автоматизация килувчи веб-дастур`}</Htag>
        {/* <Input placeholder='Фойдаланувчи исми' /> */}
        <select
          name="users"
          id="users"
          className={styles.users}
          onChange={(e) => SetCurrentUser(e.target.value)}
          defaultValue={'dashboard'}
        >
          <option value="dashboard">Бош хисобчи</option>
          <option value="gild">Цехдаги сотувчи</option>
          <option value="delivery">Дамасчи</option>
        </select>
        <Input placeholder='Калит' type='password' />
        <Link href={`/${currentUser}`} className={styles.login}>Кириш</Link>
      </div>
      <Image
        src={'/images/bread.jpg'}
        layout='responsive'
        width={448}
        height={300}
        alt='Рисунок главной страницы'
        className={styles.image}
      />
    </div>
  )
}
