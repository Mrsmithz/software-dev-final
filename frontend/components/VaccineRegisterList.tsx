import {Heading, Button, ListItem, HStack, VStack, Text} from '@chakra-ui/react'
type IRegister = {
    heading:string,
    button:string,
    detail:string,
    vaccine:number
}
import { useRouter } from 'next/router'
const Register = ({heading, button, detail, vaccine} : IRegister) => {
    const router = useRouter()
    const register = () => {
        let dose = '3ch'
        if (vaccine == 1){
            dose = '3rd'
        }
        else if (vaccine == 2){
            dose = '4th'
        }
        router.push(`/registration?dose=${dose}&location=ศูนย์ฉีดวัคซีนกลางบางซื่อ`)
    }
    return (
        <ListItem>
              <HStack>
                <Heading>{heading}</Heading>
                <Button onClick={register}>{button}</Button>
              </HStack>
              <VStack width={'20%'}>
                <Text>
                {detail}
                </Text>
              </VStack>
          </ListItem>
    )
}

export default Register