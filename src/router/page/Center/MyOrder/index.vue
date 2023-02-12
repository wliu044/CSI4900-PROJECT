<template>
<div>
         <div class="orders">

              <table class="order-item" v-for="(order,index) in myOrder.records" :key="order.id">
                <thead>
                  <tr>
                    <th colspan="5">
                      <span class="ordertitle">{{order.createTime}}　订单编号：{{order.outTradeNo}} <span
                          class="pull-right delete"><img src="../images/delete.png"></span></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(orderDetail,index) in order.orderDetailList" :key="orderDetail.id">
                    <td width="60%">
                      <div class="typographic">
                        <img v-lazy="orderDetail.imgUrl" style="width:82px;height:82px">
                        <a href="#" class="block-text">{{orderDetail.skuName}}</a>
                        <span>x{{orderDetail.skuNum}}</span>
                        <a href="#" class="service">售后申请</a>
                      </div>
                    </td>
                    <td :rowspan="order.orderDetailList.length" width="8%" class="center" v-if="index == 0">{{order.consignee}}</td>
                    <td :rowspan="order.orderDetailList.length" width="13%" class="center" v-if="index == 0">
                      <ul class="unstyled">
                        <li>总金额¥{{order.totalAmount}}.00</li>
                        <li>在线支付</li>

                      </ul>
                    </td>
                    <td :rowspan="order.orderDetailList.length" width="8%" class="center" v-if="index == 0">
                      <a href="#" class="btn">{{order.orderStatusName}} </a>
                    </td>
                    <td :rowspan="order.orderDetailList.length" width="13%" class="center" v-if="index == 0">
                      <ul class="unstyled">
                        <li>
                          <a href="mycomment.html" target="_blank">评价|晒单</a>
                        </li>

                      </ul>
                    </td>
                  </tr>
                  
                </tbody>
              </table>

       
            </div>
                <Pagination 
            :pageNo="page" 
            :pageSize="limit" 
            :total="myOrder.total" 
            :continues="continues"
            @getPage="getPage"
            />
            </div>
</template>

<script>
export default {
  name:'',
  data() {
    return {
      // 初始显示第几页
      page:'1',
      // 美页最多显示多少笔订单
      limit:'3',
      // 用来存储请求回来的数据
      myOrder:{},
      // 分页器每页连续页数
      continues:5,
    }
  },
  mounted() {
   this.getData()
  },
  methods: {
    // 获取订单数据的请求
   async getData(){
     let res = await this.$API.reqMyOrderList(this.page,this.limit)
     if(res.data.code == 200){
     this.myOrder = res.data.data
     }
    },
      // 点击分页器向服务器发送请求page是当前点击的页数
    getPage(page){
      this.page = page
         this.getData()

    },
  },

}
</script>

<style>

</style>