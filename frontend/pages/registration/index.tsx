import {useState} from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Heading,
    Box,
    Select,
    Input,
    HStack,
    Button,
    Text
  } from '@chakra-ui/react'
import DatePicker from "react-datepicker";
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router';
import axios from 'axios'
const RegistrationForm = () => {
    const [startDate, setStartDate] = useState(new Date())
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [cardPrefix, setCardPrefix] = useState('บัตรประชาชน')
    const [namePrefix, setNamePrefix] = useState('นาย')
    const [idNumber, setIdNumber] = useState('')
    const [address, setAddress] = useState('')
    const [tel, setTel] = useState('')
    const [province, setProvince] = useState('')
    const [district, setDistrict] = useState('')
    const [zone, setZone] = useState('')
    const [vaccineDate, setVaccineDate] = useState(new Date())
    const router = useRouter()
    const submit = async () => {
        try{
            const API_URL = process.env.NEXT_PUBLIC_API_URI
            const data = {
                firstName,
                lastName,
                namePrefix,
                cardPrefix,
                birthDate:startDate,
                cardId:idNumber,
                tel,
                vaccine:router.query.dose,
                location:router.query.location,
                vaccineDate,
                address:{
                    address,
                    province,
                    district,
                    zone
                }
            }
            const result = await axios.post(`${API_URL}/register`, data)
            alert('Register Success')
            router.push('/')
        }
        catch(err){
            console.error(err)
        }
    }
    return (
    <>
        <Box className={styles.main}>
            <Heading>ลงทะเบียนรับสิทธิ์วัคซีน</Heading>
            <Heading>ศูนย์ฉีดวัคซีนกลางบางซื่อ</Heading>
            <Box width={'40%'}>
            <FormControl>
                <FormLabel>ข้อมูลทั่วไป</FormLabel>
                <HStack>
                    <FormControl>
                        <FormLabel>คำนำหน้า</FormLabel>
                        <Select id="namePrefix">
                            <option>นาย</option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>ชื่อ</FormLabel>
                        <Input id="firstName" type="text" onChange={(e) => setFirstName(e.target.value)}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>นามสกุล</FormLabel>
                        <Input id="lastName" type="text" onChange={(e) => setLastName(e.target.value)}/>
                    </FormControl>
                </HStack>
                <HStack mt={5}>
                    <FormControl>
                        <FormLabel>บัตรประจำตัว</FormLabel>
                        <Select id="cardPrefix" onSelect={(e) => console.log(e)}>
                            <option value={'บัตรประชาชน'}>บัตรประชาชน</option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>เลขประจำตัว</FormLabel>
                        <Input id="idNumber" type="text" onChange={(e) => setIdNumber(e.target.value)}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>วันเกิด</FormLabel>
                        <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)}></DatePicker>
                    </FormControl>
                </HStack>
            </FormControl>
            <FormControl mt={5}>
                <FormLabel>ที่อยู่</FormLabel>
                <HStack>
                    <FormControl>
                        <FormLabel>รายละเอียดที่อยู่</FormLabel>
                        <Input id="address" type="text" onChange={(e) => setAddress(e.target.value)}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>จังหวัด</FormLabel>
                        <Input id="province" type="text" onChange={(e) => setProvince(e.target.value)}/>
                    </FormControl>
                </HStack>
                <HStack mt={5}>
                    <FormControl>
                        <FormLabel>เขต / อำเภอ</FormLabel>
                        <Input id="district" type="text" onChange={(e) => setDistrict(e.target.value)}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>แขวง / ตำบล</FormLabel>
                        <Input id="zone" type="text" onChange={(e) => setZone(e.target.value)}/>
                    </FormControl>
                </HStack>
                <HStack>
                    <FormControl>
                        <FormLabel>หมายเลขโทรศัพท์ของคุณ</FormLabel>
                        <Input id="tel" type="text"/>
                    </FormControl>
                </HStack>
            </FormControl>
            <FormControl mt={5}>
                <FormLabel>วันที่ต้องการจะฉีดวัคซีน</FormLabel>
                <DatePicker selected={vaccineDate} onChange={(date:Date) => setVaccineDate(date)}></DatePicker>
            </FormControl>
            </Box>
            <Button mt={10} onClick={submit}>ลงทะเบียน</Button>
        </Box>
        </>
    )
}

export default RegistrationForm