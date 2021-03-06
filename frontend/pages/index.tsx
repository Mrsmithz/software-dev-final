import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import banner from '../public/banner.jpg'
import dataList from '../data/listData'
import VaccineRegisterList from '../components/VaccineRegisterList'
import {Heading, Button, List} from '@chakra-ui/react'
import { useState } from 'react'
const Home: NextPage = () => {
  const [showList, setShowList] = useState(false)
  return (
    <div className={styles.container}>
      <Head>
        <title>ดีแทคห่วงใยร่วมสู้ภัยโควิด | Dtac</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image src={banner} alt='banner'></Image>
        <Heading my={50}>ดีแทค เปิดลงทะเบียน รับการฉีดวัคซีนโควิด-19</Heading>
        <Heading as='h3'>เลือกศูนย์ฉีดวัคซีนโควิด - 19</Heading>
        <Button my={10} onClick={() => setShowList(!showList)}>ศูนย์ฉีดวัคซีนกลางบางซื่อ</Button>
        {showList && <List>
          {dataList.map((data, index) => {
            return (
              <VaccineRegisterList {...data} key={index} vaccine={index}></VaccineRegisterList>
            )
          })}
        </List>}
      </main>

      <footer className={styles.footer}>
        <h1></h1>
        <a
          target="_blank"
          rel="noopener noreferrer"
        >
          © 2565 บมจ.โทเทิ่ล แอ็คเซ็ส คอมมูนิเคชั่นบริษัทในกลุ่มเทเลนอร์
        </a>
      </footer>
    </div>
  )
}

export default Home
