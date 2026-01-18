# Pinia Getters

Dưới đây là tóm tắt đầy đủ – dễ hiểu bài học Getters trong Pinia, kèm ví dụ cụ thể cho từng phần, dựa đúng theo nội dung tài liệu chính thức.

## 1. Getters là gì?

Getters trong Pinia tương đương với **computed property** trong Vue:
-   Dùng để tính toán dữ liệu dẫn xuất (derived state) từ state.
-   Được **cache** (chỉ chạy lại khi dữ liệu phụ thuộc thay đổi).

📌 **Đặc điểm quan trọng:**
-   Không thay đổi state (chỉ đọc).
-   Truy cập như một thuộc tính, không cần gọi hàm (không có cặp ngoặc `()`).

### Ví dụ cơ bản
```javascript
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
})
```
👉 `doubleCount` luôn tự động cập nhật khi `count` thay đổi.

---

## 2. Truy cập getters trong component

Getters được sử dụng giống hệt như state.

### Ví dụ với `<script setup>`
```html
<script setup>
import { useCounterStore } from './counterStore'

const store = useCounterStore()
</script>

<template>
  <p>Double count: {{ store.doubleCount }}</p>
</template>
```

---

## 3. Sử dụng `this` để truy cập getter khác

Khi một getter cần truy cập một getter khác trong cùng Store, bạn phải:
1.  Sử dụng **function thường** (không dùng arrow function).
2.  Khai báo **kiểu trả về** (nếu dùng TypeScript).

### Ví dụ (TypeScript)
```typescript
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount(state) {
      return state.count * 2
    },
    // Truy cập getter khác qua 'this'
    doublePlusOne(): number {
      return this.doubleCount + 1
    },
  },
})
```
📌 **Lưu ý:** Việc khai báo kiểu trả về là bắt buộc trong TypeScript do hạn chế về khả năng suy luận kiểu khi dùng `this`.

---

## 4. Kết hợp nhiều getters

Các getters có thể kết hợp với nhau một cách linh hoạt để tạo ra các logic phức tạp hơn.

```javascript
getters: {
  doubleCount(state) {
    return state.count * 2
  },
  doubleCountPlusOne(): number {
    return this.doubleCount + 1
  },
}
```

---

## 5. Truyền tham số cho getters (Passing arguments)

🚫 Getters mặc định **không** nhận tham số trực tiếp.
✅ **Giải pháp:** Getter trả về một function (câu lệnh đóng - closure).

### Ví dụ
```javascript
export const useUserStore = defineStore('users', {
  state: () => ({
    users: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ],
  }),
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find(user => user.id === userId)
    },
  },
})
```

**Sử dụng trong component:**
```html
<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from './store'

const store = useUserStore()
const { getUserById } = storeToRefs(store)
</script>

<template>
  <p>User details: {{ getUserById(2) }}</p>
</template>
```

⚠️ **Lưu ý quan trọng:** Khi getter trả về một function, kết quả của function đó **không được cache**. Nó thực chất chỉ là một hàm được gọi mỗi khi render.

---

## 6. Tối ưu hiệu năng khi getter trả về function

Bạn có thể cache tạm dữ liệu bên trong getter để tối ưu các vòng lặp xử lý nặng.

```javascript
getters: {
  getActiveUserById(state) {
    // Phần này được cache
    const activeUsers = state.users.filter(u => u.active)
    
    // Phần này không được cache
    return (id) => activeUsers.find(u => u.id === id)
  },
}
```

---

## 7. Truy cập getters của store khác

Getters có thể sử dụng dữ liệu từ các store khác một cách dễ dàng.

```javascript
import { useOtherStore } from './otherStore'

export const useMainStore = defineStore('main', {
  state: () => ({
    localData: 10,
  }),
  getters: {
    totalData(state) {
      const otherStore = useOtherStore()
      return state.localData + otherStore.data
    },
  },
})
```

---

## 8. Sử dụng getters với Options API

### Với `setup()`
Sử dụng cho các component đang trong quá trình chuyển đổi (migrate).

```html
<script>
import { useCounterStore } from '../stores/counter'

export default {
  setup() {
    const counterStore = useCounterStore()
    return { counterStore }
  },
  computed: {
    quadruple() {
      return this.counterStore.doubleCount * 2
    },
  },
}
</script>
```

### Không dùng `setup()` (dùng `mapState`)
```javascript
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  computed: {
    // Truy cập trực tiếp
    ...mapState(useCounterStore, ['doubleCount']),
    // Đổi tên
    ...mapState(useCounterStore, {
      myDouble: 'doubleCount',
      doubleFn: store => store.doubleCount,
    }),
  },
}
```

---

## 10. Tổng kết nhanh

| Nội dung | Ghi nhớ |
| :--- | :--- |
| **Bản chất** | Tương đương với `computed` trong Vue. |
| **Cache** | ✅ Có (tự động lưu kết quả). |
| **Tham số** | ❌ Không nhận trực tiếp (phải trả về function). |
| **Truy cập** | `store.getterName`. |
| **Getter khác** | Dùng `this` + khai báo kiểu dữ liệu (nếu dùng TS). |
| **Store khác** | Khởi tạo store đó ngay bên trong getter. |