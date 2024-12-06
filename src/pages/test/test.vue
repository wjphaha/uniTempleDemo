<template>
  <view class="min-h-screen bg-gray-100">
    <!-- 顶部标题栏 -->
    <view class="fixed top-0 left-0 right-0 z-10">
      <view class="flex justify-between items-center px-4 py-3 bg-blue-600 text-white">
        <text class="text-lg font-bold">方案开单</text>
        <view class="flex items-center gap-3">
          <text class="i-carbon-overflow-menu-horizontal text-xl"></text>
          <text class="i-carbon-scan text-xl" @tap="handleScan"></text>
        </view>
      </view>
    </view>

    <!-- 主体内容 -->
    <view class="pt-16 px-4 pb-24">
      <!-- 选择门店 -->
      <view class="mt-4 bg-white rounded-lg" @tap="showStoreSelect">
        <view class="flex justify-between items-center p-4">
          <view>
            <text class="text-gray-600">选择门店</text>
            <text class="ml-2 text-blue-600">{{ selectedStore.name }}</text>
          </view>
          <text class="i-carbon-chevron-right text-gray-400"></text>
        </view>
      </view>

      <!-- 客户类型 -->
      <view class="mt-4 bg-white rounded-lg" @tap="showCustomerSelect">
        <view class="flex justify-between items-center p-4">
          <view>
            <text class="text-gray-600">客户类型</text>
            <text class="ml-2 text-blue-600">{{ selectedCustomer.name }}</text>
          </view>
          <text class="i-carbon-chevron-right text-gray-400"></text>
        </view>
      </view>

      <!-- 选择开单方案 -->
      <view class="mt-4 bg-white rounded-lg p-4">
        <view class="flex justify-between items-center mb-3">
          <text class="text-gray-600">选择开单方案</text>
          <view class="flex items-center text-blue-600" @tap="showPlanSelect">
            <text class="text-sm">添加方案</text>
            <text class="i-carbon-add ml-1"></text>
          </view>
        </view>
        <view v-if="selectedPlans.length" class="space-y-3">
          <view v-for="plan in selectedPlans" :key="plan.id" 
                class="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
            <text class="text-blue-600">{{ plan.name }}</text>
            <view class="flex items-center gap-4">
              <view class="flex items-center">
                <button class="w-[84rpx] h-[48rpx] flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors duration-200" 
                        @tap="updatePlanCount(plan, -1)">
                  <text class="text-2xl font-bold text-gray-600">-</text>
                </button>
                <text class="mx-4 min-w-[20px] text-center">{{ plan.count }}</text>
                <button class="w-[84rpx] h-[48rpx] flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors duration-200" 
                        @tap="updatePlanCount(plan, 1)">
                  <text class="text-2xl font-bold text-gray-600">+</text>
                </button>
              </view>
              <text class="i-carbon-close text-gray-400" @tap="removePlan(plan)"></text>
            </view>
          </view>
        </view>
        <view v-else class="py-8 text-center text-gray-400">
          <text>暂无选择方案</text>
        </view>
        
      </view>

      <!-- 技术类型 -->
      <view class="mt-4 bg-white rounded-lg p-4">
        <text class="text-gray-600 mb-3 block">技术类型</text>
        <view class="flex gap-4">
          <button v-for="type in techTypes" :key="type.value"
                  class="flex-1 rounded text-center transition-colors duration-200"
                  :class="[selectedTechType === type.value ? 
                          'bg-blue-600 text-white' : 
                          'border border-gray-200 text-gray-600']"
                  @tap="selectedTechType = type.value">
            {{ type.label }}
          </button>
        </view>
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="fixed bottom-0 left-0 right-0 px-4 py-3 bg-white border-t border-gray-100">
      <button class="w-full bg-blue-600 text-white rounded-full disabled:opacity-50"
              :disabled="!canSubmit"
              @tap="handleSubmit">
        确认生成二维码订单
      </button>
    </view>


  </view>

   <!-- 测试 -->
  
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { showToast } from '@/utils/toast'

// 门店相关
const selectedStore = ref({
  id: '1',
  name: '官方测试店铺'
})

const showStoreSelect = () => {
  // TODO: 实现门店选择弹窗
  showToast('选择门店')
}

// 客户相关
const selectedCustomer = ref({
  id: '1',
  name: '陈康'
})

const showCustomerSelect = () => {
  // TODO: 实现客户选择弹窗
  showToast('选择客户')
}

// 方案相关
const selectedPlans = ref([
  { id: '1', name: '黄金女人', count: 1 },
  { id: '2', name: '清爽度管理', count: 1 },
  { id: '3', name: '花粉节清爽度管理方案', count: 1 }
])

const showPlanSelect = () => {
  // TODO: 实现方案选择弹窗
  
  showToast('选择方案')
}

const updatePlanCount = (plan: any, delta: number) => {
  const newCount = plan.count + delta
  if (newCount >= 1) {
    plan.count = newCount
  }
}

const removePlan = (plan: any) => {
  selectedPlans.value = selectedPlans.value.filter(p => p.id !== plan.id)
}

// 技术类型
const techTypes = [
  { label: '顾客', value: 'customer' },
  { label: '门店', value: 'store' },
  { label: '免费', value: 'free' }
]
const selectedTechType = ref('customer')

// 扫码功能
const handleScan = () => {
  // TODO: 实现扫码功能
  showToast('扫码')
}

// 提交逻辑
const canSubmit = computed(() => {
  return selectedStore.value && 
         selectedCustomer.value && 
         selectedPlans.value.length > 0 && 
         selectedTechType.value
})

const handleSubmit = () => {
  if (!canSubmit.value) return
  
  const formData = {
    storeId: selectedStore.value.id,
    customerId: selectedCustomer.value.id,
    plans: selectedPlans.value,
    techType: selectedTechType.value
  }
  
  console.log('提交数据:', formData)
  showToast('提交成功')
}
</script> 