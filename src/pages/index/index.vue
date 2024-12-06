<template>
  <view class="content">
    <view class="text-cool-gray-300 bg-red-600 ml-8 font-medium mt-4 ml-1">
      <view class=""> 这是数据</view>
    </view>
    <block v-for="item in state.userList" :key="item.id" >
      <up-row class=" mt-4">
        <up-col span = "4">
          <view class=" text-center text-blue-200">{{ item.username }}</view>
        </up-col>
        <up-col span = "4">
          <view class="text-center text-red-300">{{ item.nickname }}</view>
        </up-col>
        <up-col span = "4">
          <view class="text-center text-blue-100">{{ item.id }}</view>
        </up-col>
      </up-row>
    </block>
    <!--    分割线-->
    <view class="">
      <up-divider
        text="分割线"
        :hairline="true"
        textColor="#2979ff"
        lineColor="#2979ff"
        >这是分割线</up-divider
      >
    </view>
    
  
    <up-row class=" mt-4">
      <up-col span = "4">
        <view class=" text-center text-blue-200">{{ state.userInfo.username }}</view>
      </up-col>
      <up-col span = "4">
        <view class="text-center text-red-300">{{ state.userInfo.nickname }}</view>
      </up-col>
      <up-col span = "4">
        <view class="text-center text-blue-100">{{ state.userInfo.id }}</view>
      </up-col>
    </up-row>


    <view class=" ml-3">
      <up-form :model="form" :rules="rules" ref="uFormRef">
        <up-form-item label="用户名字" prop="uname">
          <up-input v-model="form.uname" />
        </up-form-item>

        <up-form-item label="ID" prop="id">
          <up-input v-model="form.id" />
        </up-form-item>
         <up-form-item label="nickname" prop="nickname">
          <up-input v-model="form.nickname" />
        </up-form-item>
      </up-form>
       
      <up-button @click="submit">提交</up-button>
    </view>
  </view>
</template>

<script setup>
import { userList, userById } from "@/api/index";
import { onLoad } from "@dcloudio/uni-app";
import { reactive, ref } from "vue";

onLoad(() => {
  getUserList();
});

const state = reactive({
  title: "Hello",
  count: 4,
  value: 2,
  userList: [],
  articleById: {},
});
// 响应式表单数据
const form = ref({
  uname: "",
  id: "",
  nickname:''
});
// 校验规则
const rules = {
  uname: [
    {
      required: false,
      message: "请输入用户名字",
      trigger: ["blur", "change"],
    },
  ],
  id: [
    {
      required: false,
      message: "请输入用户ID",
      trigger: ["blur", "change"],
    },
  ],
  nickname: [
    {
      required: false,
      message: "请输入用户别名",
      trigger: ["blur", "change"],
    },
  ],
};


// 表单引用
const uFormRef = ref(null);

/***
 * 获取文章列表
 * @param id
 * @returns {Promise<void>}
 */

async function getUserList(username,nickname) {
  try {
    let param = {
      username: username || "",
      nickname:nickname || '',
      pageNum: 1,
      pageSize: 6,
    };

    const { data } = await userList(param);
    state.userList = data.records;
  } catch (error) {
    console.log(error);
  }
}

/*
 * 通过id获取 文章详情
 * @param id
 * @returns {Promise<void>}
 * */
async function getUserById(id) {
  try {
    const { data, message } = await userById(id);
    state.userInfo = data;
  } catch (error) {}
}

// 提交方法
function submit() {
  uFormRef.value
    .validate()
    .then((valid) => {
      if (valid) {
        if (form.value.id != "") {
          getUserById(form.value.id);
        } else {
          getUserList(form.value.uname,form.value.nickname);
        }
      } else {
        uni.$u.toast("校验失败");
      }
    })
    .catch(() => {
      // 处理验证错误
      uni.$u.toast("校验失败");
    });
}
</script>
