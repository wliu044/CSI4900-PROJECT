// 引入uuid
import { v4 as uuidv4 } from 'uuid';
export const getUUID = ()=>{
    // 向本地存储中获取UUID
  let  uuid_token = localStorage.getItem('UUID')
    // 如果没有uuid_token就生成一个uuid_token写入本地存储中
    if(!uuid_token){
        uuid_token = uuidv4()
        localStorage.setItem('UUID',uuid_token)
    }
    return uuid_token
}