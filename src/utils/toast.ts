interface ToastOptions {
  duration?: number
  position?: 'top' | 'center' | 'bottom'
  icon?: 'success' | 'error' | 'loading' | 'none'
  mask?: boolean
}

const defaultOptions: ToastOptions = {
  duration: 1500,
  position: 'center',
  icon: 'none',
  mask: false
}

/**
 * 显示消息提示框
 * @param title 提示的内容
 * @param options 配置项
 */
export const showToast = (title: string, options: ToastOptions = {}) => {
  const mergedOptions = { ...defaultOptions, ...options }
  
  uni.showToast({
    title,
    duration: mergedOptions.duration,
    position: mergedOptions.position,
    icon: mergedOptions.icon,
    mask: mergedOptions.mask
  })
}

/**
 * 显示成功提示
 * @param title 提示的内容
 * @param duration 显示时长
 */
export const showSuccess = (title: string, duration = 1500) => {
  showToast(title, {
    icon: 'success',
    duration
  })
}

/**
 * 显示错误提示
 * @param title 提示的内容
 * @param duration 显示时长
 */
export const showError = (title: string, duration = 1500) => {
  showToast(title, {
    icon: 'error',
    duration
  })
}

/**
 * 显示加载提示
 * @param title 提示的内容
 */
export const showLoading = (title = '加载中...') => {
  uni.showLoading({
    title,
    mask: true
  })
}

/**
 * 隐藏加载提示
 */
export const hideLoading = () => {
  uni.hideLoading()
}

/**
 * 隐藏消息提示框
 */
export const hideToast = () => {
  uni.hideToast()
} 