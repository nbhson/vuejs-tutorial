# Pinia Actions

Dưới đây là tóm tắt đầy đủ – dễ hiểu – có ví dụ cụ thể nội dung bài học Actions trong Pinia (Vue 3), dựa đúng theo nội dung tài liệu chính thức.

## 1. Actions trong Pinia là gì?

Actions tương đương với **methods** trong component Vue. Chúng được dùng để:
-   Xử lý logic nghiệp vụ (business logic).
-   Thay đổi trạng thái (state).
-   Gọi API hoặc thực hiện các tác vụ bất đồng bộ (async/await).

👉 Actions được khai báo trong `defineStore()` thông qua thuộc tính `actions`.

---

## 2. Khai báo Actions cơ bản

### Ví dụ Store Counter
```javascript
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      // Thay đổi state trực tiếp qua 'this'
      this.count++
    },
    randomizeCounter() {
      this.count = Math.round(100 * Math.random())
    },
  },
})
```

📌 **Lưu ý quan trọng:**
-   ❌ **Không dùng arrow function** cho actions vì nó sẽ làm mất ngữ cảnh `this`.
-   ✅ **Dùng function thường** để `this` trỏ đúng về instance của store.

---

## 3. `this` trong Actions

Trong Pinia Actions, `this` đại diện cho toàn bộ instance của store. Bạn có thể truy cập mọi thứ:
-   `this.count`: Truy cập state.
-   `this.doubleCount`: Truy cập getters.
-   `this.otherAction()`: Gọi một action khác.

---

## 4. Actions bất đồng bộ (Async / Await)

Actions cực kỳ phù hợp để xử lý các logic bất đồng bộ như gọi API.

### Ví dụ gọi API đăng ký User
```javascript
import { defineStore } from 'pinia'
import { mande } from 'mande' // hoặc axios, fetch...

const api = mande('/api/users')

export const useUsersStore = defineStore('users', {
  state: () => ({
    userData: null,
  }),
  actions: {
    async registerUser(login, password) {
      try {
        this.userData = await api.post({ login, password })
        alert(`Chào mừng ${this.userData.name}!`)
      } catch (error) {
        alert('Đăng ký thất bại: ' + error)
        return error // Trả về lỗi để component xử lý thêm nếu cần
      }
    },
  },
})
```

👉 Bạn có thể:
-   Sử dụng `await` cho các lời gọi API.
-   `return` dữ liệu để component sử dụng.

---

## 5. Gọi Actions trong Component

### Trong `<script setup>`
```html
<script setup>
import { useCounterStore } from '@/stores/counter'

const store = useCounterStore()

// Gọi như hàm bình thường
store.increment()
</script>
```

### Trong template
```html
<template>
  <button @click="store.randomizeCounter">
    Randomize
  </button>
</template>
```

---

## 6. Gọi Actions của store khác

Bạn không cần truyền props phức tạp; chỉ cần khởi tạo store khác ngay bên trong action.

```javascript
import { defineStore } from 'pinia'
import { useAuthStore } from './auth-store'

export const useSettingsStore = defineStore('settings', {
  actions: {
    async fetchUserPreferences() {
      const auth = useAuthStore()

      if (auth.isAuthenticated) {
        this.preferences = await fetchPreferences()
      } else {
        throw new Error('User must be authenticated')
      }
    },
  },
})
```

---

## 7. Dùng Actions với Options API

### 7.1. Dùng Options API + `setup()`
```html
<script>
import { useCounterStore } from '@/stores/counter'

export default {
  setup() {
    const counterStore = useCounterStore()
    return { counterStore }
  },
  methods: {
    incrementAndLog() {
      this.counterStore.increment()
      console.log('Count mới:', this.counterStore.count)
    },
  },
}
</script>
```

### 7.2. Dùng `mapActions` (không có `setup`)
```javascript
import { mapActions } from 'pinia'
import { useCounterStore } from '@/stores/counter'

export default {
  methods: {
    // Truy cập trực tiếp qua this.increment()
    ...mapActions(useCounterStore, ['increment']),
    
    // Đổi tên action sang this.increase()
    ...mapActions(useCounterStore, {
      increase: 'increment',
    }),
  },
}
```

---

## 8. Lắng nghe Actions với `$onAction()`

Dùng để theo dõi action trước khi chạy, sau khi thành công hoặc khi gặp lỗi. Rất hữu ích cho **Logging**, **Analytics**, hoặc **Error Tracking**.

```javascript
const unsubscribe = store.$onAction(
  ({ name, args, after, onError }) => {
    const start = Date.now()
    console.log(`Bắt đầu action "${name}" với tham số:`, args)

    after((result) => {
      console.log(`Hoàn thành "${name}" trong ${Date.now() - start}ms`)
    })

    onError((error) => {
      console.error(`Lỗi tại "${name}":`, error)
    })
  }
)

// Để hủy lắng nghe:
// unsubscribe()
```

📌 **Giữ subscription:** Mặc định `$onAction` sẽ tự hủy khi component unmount. Để giữ lại, truyền tham số `true`: `store.$onAction(callback, true)`.

---

## 11. Tổng kết nhanh

| Nội dung | Ghi nhớ |
| :--- | :--- |
| **Bản chất** | Tương đương `methods` trong component. |
| **Async** | Hỗ trợ hoàn hảo `async/await`. |
| **`this`** | Trỏ tới chính instance của store. |
| **Gọi store khác** | Gọi trực tiếp bên trong action. |
| **Options API** | Dùng `mapActions` hoặc `setup()`. |
| **`$onAction`** | Dùng để debug, audit hoặc theo dõi hiệu năng. |