// 引入mockjs
import Mock from 'mockjs'
// 引入模拟数据
import banner from './banner.json'
import floor from './floor.json'
import userAddress from './userAddress.json'
// 模拟数据,第一个参数是路径，第二个参数是请求数据
Mock.mock("/banner",{code:200,data:banner})
Mock.mock("/floor",{code:200,data:floor})
Mock.mock("/userAddress",{code:200,data:userAddress})
