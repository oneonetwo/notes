import type { User } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

/*
 * @Descripttion: 用户仓库
 * @version:
 * @Author: D
 * @Date: 2024-06-13 17:15:08
 * @LastEditors: jy
 * @LastEditTime: 2024-06-13 17:45:42
 */
export const useUserStore = defineStore(
  'cp-user',
  () => {
    const user = ref<User>()
    const set = (u: User) => {
      user.value = u
    }
    const del = () => {
      user.value = undefined
    }

    return { user, set, del }
  },
  {
    persist: true
  }
)
