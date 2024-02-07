'use client'
import { useEffect, useState } from 'react'
import styles from './Auth.module.css'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { BodyForLogin, UserRoles } from '@/app/interfaces/general.interface'
import { useAppContext } from '@/app/context/app.context'
import { Htag } from '../common/htag/Htag'
import { Input } from '../common/input/input'
import { Button } from '../common/button/Button';
import { Message } from '../common/message/message'
import { loginToApp } from '@/app/service/common/loginToApp'
import { showMessage } from '@/app/service/common/showMessage'
import ImgBread from './bread.jpg';

const defaultBody: BodyForLogin = {
  login: '',
  password: ''
}

export default function Auth() {
  
  const {mainData, setMainData} = useAppContext();
  const [body, setBody] = useState<BodyForLogin>(defaultBody) 

  const changeElements = (e: React.FormEvent<HTMLInputElement>) => {
      let target = e.currentTarget
      setBody(state => {
          return {
              ...state,
              [target.id]: target.value
          }
      })
  }

  const onSubmit = (body: BodyForLogin, setMainData: Function | undefined) => {
    const {login, password} = body;

    if (login.trim().length && password.trim().length) {
      loginToApp(body, setMainData )
    } else {
         showMessage("Кириш учун маълумотларни киритинг", 'error', setMainData)
    }
  }

  useEffect(() => {
    const {user} = mainData
    if (user != undefined && user?.role == UserRoles.HEADCOMPANY) {
      redirect('/dashboard')
    }
    if (user != undefined) {
      redirect('/users')
    }


  }, [mainData.user])

  return (
    <>
        <div className={styles.container}>
            <div className={styles.content}>
            <Htag tag='h1'>Дастурга кириш</Htag>
            <Htag tag='h3'>{`Иштихон тумани 'Шавкат Нон' хусусий корхонасида ишлаб чикариш ва савдо фаолиятини автоматизация килувчи веб-дастур`}</Htag>
            <Input value={body.login} placeholder='Email' label='' id='login' onChange={(e)=>changeElements(e)}/>
            <Input value={body.password} placeholder='Password' type='password' label='' id='password' onChange={(e)=>changeElements(e)}/>
            <Button appearance='primary' onClick={() => onSubmit(body, setMainData)}>Кириш</Button>
            </div>
            <Image
            // src={'/images/bread.jpg'}
            src={ImgBread}
            layout='responsive'
            width={448}
            height={300}
            alt='Рисунок главной страницы'
            className={styles.image}
            />
        </div>
        <Message/>
    </>
      
  )
}
