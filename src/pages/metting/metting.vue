<template>
  <view class="min-h-screen bg-[#4169E1] px-4 pt-8 pb-4">
    <!-- 顶部欢迎区域 -->
    <view class="text-center text-white">
      <view class="text-2xl font-bold mb-1">欢迎参加花瑾堂</view>
      <view class="text-2xl mb-1">厦门之旅</view>
      <view class="text-xl mb-2">Welcome To Your Arrival</view>
      <view class="text-sm mb-0.5">欢迎参加花瑾堂厦门6天5夜会议之旅</view>
      <view class="text-sm">您的到来使我们荣幸至极!</view>
    </view>

    <!-- 查询卡片 -->
    <view class="bg-white rounded-2xl p-5 mt-8">
      <view class="text-lg text-[#355ED9] font-bold">人员签到信息查询</view>
      <view class="text-[#6C79A0] text-sm mt-2">
        花瑾堂厦门6天5晚会议之旅人员入住信息查询,请正确填写身份证信息,以免有误。
      </view>

      <view class="bg-[#DEE5FD] flex rounded-[90rpx] mt-4 mb-2 p-2">
        <input
          v-model="idNumber"
          type="text"
          maxlength="18"
          class="flex-1 px-4 py-2.5 bg-[#DEE5FD] text-base"
          placeholder="请输入身份证号码"
          placeholder-class="text-[#999999]"
        />
        <button
          class="bg-[#4169E1] text-white px-6 rounded-[38rpx]"
          @click="handleQuery"
          :disabled="loading"
        >
          {{ loading ? "查询中..." : "查询" }}
        </button>
      </view>
      <view class="text-[#999999] text-xs">*此查询用于客户入住签到*</view>
    </view>

    <!-- 人员信息卡片 -->
    <view v-if="userInfo" class="bg-white rounded-2xl p-5 mt-4">
      <view class="text-[#4169E1] text-[16px] font-bold mb-4">人员信息</view>
      <view>
        <view class="flex items-center h-[50px] border-b-24 border-b-red border-my">
          <text class="text-[#4169E1] w-[120px] whitespace-nowrap">姓名：</text>
          <text class="text-[#333333] text-[16px] flex-1">{{
            userInfo.name
          }}</text>
        </view>
        <view class="flex items-center h-[50px] border-my">
          <text class="text-[#4169E1] w-[120px] whitespace-nowrap"
            >身份证号码：</text
          >
          <text class="text-[#333333] text-[16px] flex-1">{{
            userInfo.idNumber
          }}</text>
        </view>
        <view class="flex items-center h-[50px] border-my">
          <text class="text-[#4169E1] w-[120px] whitespace-nowrap"
            >联系方式：</text
          >
          <text class="text-[#333333] text-[16px] flex-1">{{
            userInfo.phone
          }}</text>
        </view>
        <view class="flex items-center h-[50px] border-my">
          <text class="text-[#4169E1] w-[120px] whitespace-nowrap"
            >所属地区：</text
          >
          <text class="text-[#333333] text-[16px] flex-1">{{
            userInfo.region
          }}</text>
        </view>
        <view class="flex items-center h-[50px] border-my">
          <text class="text-[#4169E1] w-[120px] whitespace-nowrap"
            >入住房间号：</text
          >
          <text class="text-[#333333] text-[16px] flex-1">{{
            userInfo.roomNumber
          }}</text>
        </view>
        <view class="flex items-center h-[50px] border-my">
          <text class="text-[#4169E1] w-[120px] whitespace-nowrap"
            >入住人数：</text
          >
          <text class="text-[#333333] text-[16px] flex-1"
            >{{ userInfo.personCount }}人</text
          >
        </view>
      </view>
    </view>

    <!-- 底部签到按钮 -->
    <button
      v-if="userInfo && !userInfo.signed"
      class="w-[700rpx] h-[92rpx] mx-auto mt-4 rounded-3xl flex items-center justify-center text-[40rpx] font-medium text-[#CDD9FF]"
      :class="signingIn ? 'opacity-70' : ''"
      :style="{
        background:
          'linear-gradient(180deg, #1E3990 7%, rgba(21,42,114,0.72) 100%)',
        boxShadow: 'inset 0px 8px 20px 0px rgba(0,0,0,0.3)',
      }"
      @click="handleSignIn"
      :disabled="signingIn"
    >
      {{ signingIn ? "签到中..." : "签到" }}
    </button>

    <button
      v-else-if="userInfo && userInfo.signed"
      class="w-[700rpx] h-[92rpx] mx-auto mt-4 rounded-2xl flex items-center justify-center text-[40rpx] font-medium text-[#CDD9FF] bg-gray-500"
      disabled
    >
      已签到
    </button>

    <button
      v-else-if="userInfo && userInfo.signed"
      class="w-[700rpx] h-[92rpx] mx-auto mt-4 rounded-2xl text-lg font-medium text-white bg-gray-500"
      disabled
    >
      已签到
    </button>
  </view>
</template>
<script setup lang="ts">
import { ref } from "vue";

// 定义响应式数据
const idNumber = ref("513322199701132013");
const loading = ref(false);
const signingIn = ref(false);

// 用户信息接口定义
interface UserInfo {
  name: string;
  idNumber: string;
  phone: string;
  region: string;
  roomNumber: string;
  personCount: number;
  signed: boolean;
}

const userInfo = ref<UserInfo | null>(null);

// 身份证校验函数
const validateIdCard = (idCard: string) => {
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  
  if (!reg.test(idCard)) {
    uni.showToast({
      title: '请输入正确的身份证号码',
      icon: 'none'
    });
    return false;
  }
  return true;
};

// 查询处理函数
const handleQuery = async () => {
  if (!idNumber.value) {
    uni.showToast({
      title: '请输入身份证号码',
      icon: 'none'
    });
    return;
  }

  // 添加身份证校验
  if (!validateIdCard(idNumber.value)) {
    return;
  }

  loading.value = true;
  try {
    // 这里替换为实际的API调用
    const response = await uni.request({
      url: "你的API地址",
      method: "POST",
      data: {
        idNumber: idNumber.value,
      },
    });

    // 模拟数据，实际项目中需要使用真实API返回的数据
    userInfo.value = {
      name: "张三",
      idNumber: idNumber.value,
      phone: "13800138000",
      region: "北京",
      roomNumber: "A-301",
      personCount: 2,
      signed: false,
    };
  } catch (error) {
    uni.showToast({
      title: "查询失败，请重试",
      icon: "none",
    });
  } finally {
    loading.value = false;
  }
};

// 签到处理函数
const handleSignIn = async () => {
  signingIn.value = true;
  try {
    // 这里替换为实际的签到API调用
    await uni.request({
      url: "你的签到API地址",
      method: "POST",
      data: {
        idNumber: userInfo.value?.idNumber,
      },
    });

    if (userInfo.value) {
      userInfo.value.signed = true;
    }

    uni.showToast({
      title: "签到成功",
      icon: "success",
    });
  } catch (error) {
    uni.showToast({
      title: "签到失败，请重试",
      icon: "none",
    });
  } finally {
    signingIn.value = false;
  }
};
</script>
<style lang="scss" scoped>
.border-my {
  border-bottom: 2rpx solid #D8D8D8;
}
</style>
