import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', () => {
  const id = ref('')
  const name = ref('')
  const role = ref('')
  const token = ref('')
  const refreshToken = ref('')
  const expires = ref('')

  const idGetter = computed(() => id.value)
  const nameGetter = computed(() => name.value)
  const roleGetter = computed(() => role.value)
  const tokenGetter = computed(() => token.value)
  const refreshTokenGetter = computed(() => refreshToken.value)
  const expiresGetter = computed(() => expires.value)

  const setId = (payload) => {
    id.value = payload
  }
  const setName = (payload) => {
    name.value = payload
  }
  const setRole = (payload) => {
    role.value = payload
  }
  const setToken = (payload) => {
    token.value = payload
  }
  const setRefreshToken = (payload) => {
    refreshToken.value = payload
  }
  const setExpires = (payload) => {
    expires.value = payload
  }

  return {
    id,
    name,
    role,
    token,
    refreshToken,
    expires,
    idGetter,
    nameGetter,
    roleGetter,
    tokenGetter,
    refreshTokenGetter,
    expiresGetter,
    setId,
    setName,
    setRole,
    setToken,
    setRefreshToken,
    setExpires

  }
})
