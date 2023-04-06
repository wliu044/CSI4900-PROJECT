<template>
  <div>
    <el-form :model="searchForm" inline size="mini" class="search-goods">
      <el-form-item label="Search criteria">
        <el-input
          v-model.trim="searchForm.value"
          placeholder="Product ID, product name, product description"
          @clear="clearValue"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="Product category">
        <el-select
          @clear="clearCategory"
          clearable
          v-model="searchForm.category"
          placeholder="Please select a product category"
        >
          <el-option
            v-for="item in category"
            :key="item.cate_id"
            :label="item.cate_name"
            :value="item.cate_id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-button type="danger" size="mini" @click="reset">reset</el-button>
      <el-button type="default" size="mini" @click="search">Search</el-button>
    </el-form>
    <el-table border :data="tempData" style="width: 100%" height="600">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand">
            <el-form-item label="Trade name">
              <span>{{ props.row.short_name }}</span>
            </el-form-item>
            <el-form-item label="Item ID">
              <span>{{ props.row.goods_id }}</span>
            </el-form-item>
            <el-form-item label="Product category">
              <span>{{ formatterCategory(props.row) }}</span>
            </el-form-item>
            <el-form-item label="price">
              <span>{{ (props.row.price / 100) | priceFormat }}</span>
            </el-form-item>
            <el-form-item label="Commodity inventory">
              <span>{{ props.row.counts }}</span>
            </el-form-item>
            <el-form-item label="Product Description">
              <span>{{ props.row.goods_name }}</span>
            </el-form-item>
            <el-form-item label="Product image">
              <img :src="props.row.thumb_url" style="width:70px" />
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="Item ID" prop="goods_id">
        <template slot-scope="props">
          <el-badge
            value="Expediting shipment"
            class="item"
            :hidden="!props.row.is_urgent || props.row.is_urgent === '0'"
          >
            {{ props.row.goods_id }}
          </el-badge>
        </template>
      </el-table-column>
      <el-table-column label="Trade name" prop="goods_name"> </el-table-column>
      <el-table-column
        label="Product category"
        prop="category"
        :formatter="formatterCategory"
      >
      </el-table-column>
      <el-table-column label="consignee" show-overflow-tooltip prop="user_name" />
      <el-table-column
        label="Whether to pay"
        prop="is_pay"
        :formatter="row => (row.is_pay === '1' ? 'Paid' : 'Unpaid')"
      />
      <el-table-column label="The total price of the item">
        <template slot-scope="{ row }">
          {{ (row.buy_count * (row.price / 100)) | priceFormat }}
        </template>
      </el-table-column>
      <el-table-column label="Commodity inventory" prop="counts"> </el-table-column>
      <el-table-column label="operate" fixed="right" width="100">
        <template slot-scope="props">
          <template v-if="props.row.counts > 0">
            <span v-if="props.row.is_send === '1'">已发货</span>

            <el-button
              v-else
              size="mini"
              type="text"
              @click="handleSend(props.row)"
              >One click shipping</el-button
            >
          </template>

          <el-button
            v-else
            size="mini"
            type="text"
            @click="handleEdit(props.$index, props.row)"
            >replenishment</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="tempData.length <= total"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 15, 20, 50]"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import {
  getAllIndentGoods,
  getCategory,
  sendGoods
} from "./../../../api/index";
import { MessageBox } from "element-ui";
export default {
  data() {
    return {
      category: [],
      currentIndex: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      tempData: [],
      isStart: true,
      searchForm: { category: "", value: "" }
    };
  },
  mounted() {
    this.getAllGoods();
    this.getALlCategory();
  },
  methods: {
    handleEdit(index, row) {
      window.sessionStorage.setItem("goodsInfo", JSON.stringify(row));
      this.$router.push("/admin/adminupdate");
    },
    clearValue() {
      this.searchForm.value = "";
      this.getAllGoods();
    },
    clearCategory() {
      this.searchForm.category = "";
      this.getAllGoods();
    },
    search() {
      this.currentIndex = 1;
      this.pageSize = 10;
      this.getAllGoods();
    },
    reset() {
      this.currentIndex = 1;
      this.pageSize = 10;
      this.searchForm.category = "";
      this.searchForm.value = "";
      this.getAllGoods();
    },
    async getALlCategory() {
      try {
        const res = await getCategory();
        this.category = res.message;
      } catch (error) {}
    },
    formatterCategory(row) {
      return (this.category.find(item => item["cate_id"] == row.category) || {})
        .cate_name;
    },
    async handleSend(row) {
      try {
        const res = await sendGoods({
          buy_count: row.buy_count,
          goods_id: row.goods_id
        });
        this.getAllGoods();
        MessageBox({
          type: "success",
          message: res.message,
          showClose: true
        });
      } catch (error) {
        console.log(error);
      }
    },
    handleCurrentChange(val) {
      this.currentIndex = val;
      this.getAllGoods();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getAllGoods();
    },
    async getAllGoods() {
      try {
        const params = {
          pageNo: this.currentIndex,
          count: this.pageSize,
          ...this.searchForm
        };
        let result = await getAllIndentGoods(params);
        if (result.success_code === 200) {
          this.tempData = result.message;
          this.total = result.total;
        }
        if (this.isStart) {
          const is_urgent = this.tempData.some(item => item.is_urgent === "1");
          if (is_urgent) {
            this.$notify.error({
              title: "Urgent, urgent!!!",
              message: "A buyer is urging the shipment, please ship as soon as possible"
            });
            this.isStart = false;
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  filters: {
    priceFormat(price) {
      return price.toFixed(2);
    }
  }
};
</script>

<style scoped>
.el-table {
  margin: 0 auto 50px;
}
.search-goods {
  margin-top: 20px;
}
.demo-table-expand {
  font-size: 0;
  padding: 0 50px;
  box-sizing: border-box;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-pagination {
  text-align: center;
}
</style>
