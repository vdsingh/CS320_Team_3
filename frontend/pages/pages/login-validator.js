import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'

const message = async () =>{
    if (getCookie('login') == undefined){
        if (process.browser){
            //Runs only on client side
            const router = useRouter()
            router.push('/pages/login-page')
        }
        return false
    }
    return true
}
export default function loginValidator(){
    return message()
}