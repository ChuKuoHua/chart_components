<script setup>
import dayjs from 'dayjs'
const props = defineProps({
  setTitle: {
    type: String,
    default: ''
  }
})

const now = dayjs(dashyyyymmddhhmmss()).unix()
const userStore = useUserStore()
const { setToken, setExpires, setId, setName, setRole } = userStore
const router = useRouter()
const vform = ref()
const user = ref({
  username: '',
  password: ''
})
const submitHandler = catchError(async () => {
  const { data } = await LoginApi(user.value)
  if (data.api_token) {
    const { api_token: apiToken, expires_in: expires, user_id: userId, role, name } = data
    const expiresTime = now + expires

    setToken(apiToken)
    setExpires(expiresTime)
    setId(userId)
    setName(name)
    setRole(role)
    const userData = {
      id: userId,
      name,
      apiToken,
      expired: expiresTime,
      role
    }
    // localStorage.setItem('chartUser', JSON.stringify(userData))
    const nowExpires = new Date()
    nowExpires.setTime(nowExpires.getTime() + 1000 * 60 * 60 * 24) // 設置 cookie 有效期為1天

    const setCookie = (key, value) => {
      document.cookie = `${key}=${JSON.stringify(value)}; expires=${nowExpires.toUTCString()}; path=/chart`
    }
    setCookie('id', userData.id)
    setCookie('name', userData.name)
    setCookie('apiToken', userData.apiToken)
    setCookie('expired', userData.expired)
    setCookie('role', userData.role)

    router.replace('/')
  }
})
</script>
<template>
  <div class="d-flex vh-100 justify-content-center">
    <div class="form__signup m-auto shadow">
      <div class="text-center pt-3">
        <h2 class="display-6">
          {{ props.setTitle }}
        </h2>
        <p>請輸入您的帳密登入系統。</p>
      </div>
      <VForm
        ref="vform"
        v-slot="{ errors }"
        class="text-start bg-middle p-4"
        @submit="submitHandler"
      >
        <div class="form-floating mb-2">
          <VField
            id="user_account"
            v-model="user.username"
            name="user_account"
            type="text"
            class="form-control"
            label="帳號"
            :class="{ 'is-invalid': errors['user_account'] }"
            placeholder="請輸入帳號"
            rules="required"
          />
          <ErrorMessage
            name="user_account"
            class="invalid-feedback"
          />
          <label for="user_account">帳號</label>
        </div>
        <div class="form-floating mb-3">
          <VField
            id="password"
            v-model="user.password"
            name="password"
            type="password"
            class="form-control"
            label="密碼"
            :class="{ 'is-invalid': errors['password'] }"
            placeholder="請輸入密碼"
            rules="required"
          />
          <ErrorMessage
            name="password"
            class="invalid-feedback"
          />
          <label for="password">密碼</label>
        </div>
        <div class="d-flex justify-content-between align-items-center mb-3">
          <button
            class="btn btn-primary w-100"
          >
            登入
          </button>
        </div>
      </VForm>
    </div>
  </div>
</template>

<style>
.form__signup{
  width: 33.33333%;
}

@media (max-width: 992px) {
  .form__signup{
    width: 75%;
  }
}

</style>
