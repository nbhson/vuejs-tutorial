# Pinia State

Dưới đây là bản tóm tắt đầy đủ – chi tiết – dễ hiểu bài học State trong Pinia, kèm ví dụ minh họa dựa theo nội dung tài liệu chính thức.

## 1. State là gì trong Pinia?

State là nơi lưu trữ dữ liệu trung tâm của store (giống `data` trong component). Trong Pinia, state luôn được định nghĩa bằng một **hàm trả về object**. Cách này giúp Pinia hoạt động tốt cho cả SSR (Server-Side Rendering) và Client.

### Ví dụ
```javascript
import { defineStore } from 'pinia'

export const useStore = defineStore('storeId', {
  state: () => {
    return {
      count: 0,
      name: 'Eduardo',
      isAdmin: true,
      items: [],
      hasChanged: false,
    }
  },
})
```

📌 **Lưu ý quan trọng:**
-   Mọi state phải được khai báo trước, kể cả khi giá trị ban đầu là `undefined`.
-   Không thể thêm thuộc tính mới vào state sau khi store đã được khởi tạo.

---

## 2. State & TypeScript

Pinia tự động suy luận kiểu dữ liệu nếu bạn bật `strict` hoặc tối thiểu là `noImplicitThis`.

### Trường hợp cần ép kiểu (Type Casting)

**Ví dụ 1: Mảng rỗng hoặc dữ liệu chưa load**
```typescript
interface UserInfo {
  name: string
  age: number
}

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userList: [] as UserInfo[],
      user: null as UserInfo | null,
    }
  },
})
```

**Ví dụ 2: Khai báo interface cho toàn bộ state**
```typescript
interface State {
  userList: UserInfo[]
  user: UserInfo | null
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    userList: [],
    user: null,
  }),
})
```

---

## 3. Truy cập & thay đổi State

Bạn có thể đọc và ghi trực tiếp vào state mà không cần thông qua mutations (như Vuex).

**Ví dụ:**
```javascript
const store = useStore()

// Thay đổi trực tiếp
store.count++

// Binding với v-model
// <input v-model="store.count" type="number" />
```

🚫 **Không hợp lệ:**
```javascript
store.newProp = 123 // ❌ Nếu newProp không có trong state() ban đầu
```

---

## 4. Reset State

### Option Store
Pinia cung cấp sẵn phương thức `$reset()`.
```javascript
const store = useStore()
store.$reset() // ➡️ State sẽ quay về giá trị ban đầu
```

### Setup Store
Bạn cần tự viết hàm reset nếu dùng Setup Store.
```javascript
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  function $reset() {
    count.value = 0
  }

  return { count, $reset }
})
```

---

## 5. Sử dụng State trong Options API

Nếu bạn không sử dụng Composition API, bạn có thể dùng các helpers của Pinia.

```javascript
import { mapState } from 'pinia'
import { useCounterStore } from './counterStore'

export default {
  computed: {
    // Chỉ đọc (readonly)
    ...mapState(useCounterStore, ['count']),
    
    // Đổi tên & viết logic bổ sung
    ...mapState(useCounterStore, {
      myCount: 'count',
      double: store => store.count * 2,
    }),
  }
}
```

---

## 6. `mapWritableState` (Có thể sửa)

Dùng khi bạn cần khả năng ghi lại state (ví dụ: dùng với `v-model` trong form).

```javascript
import { mapWritableState } from 'pinia'

export default {
  computed: {
    ...mapWritableState(useCounterStore, ['count']),
  }
}
```
📌 Với mảng hoặc object, nếu bạn chỉ thực hiện `push()` hoặc `splice()`, `mapState` vẫn đủ dùng.

---

## 7. Các cách thay đổi State (Mutations)

### Cách 1: Thay đổi trực tiếp
```javascript
store.count++
```

### Cách 2: dùng `$patch` với object
```javascript
store.$patch({
  count: store.count + 1,
  name: 'DIO',
})
```

### Cách 3: dùng `$patch` với function (tốt cho mảng/object phức tạp)
```javascript
store.$patch(state => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.hasChanged = true
})
```
📌 **Ưu điểm:** Gom nhiều thay đổi thành một entry duy nhất trong DevTools.

---

## 8. Thay thế hoàn toàn State

❌ Không thể gán trực tiếp `$state` bằng một object mới hoàn toàn:
```javascript
store.$state = { count: 24 } // ❌ Lỗi
```

✅ Thực chất Pinia sẽ thực hiện `$patch()` ngầm bên dưới:
```javascript
store.$patch({ count: 24 })
```

---

## 9. Theo dõi State với `$subscribe`

Tương tự như `subscribe` của Vuex nhưng tối ưu hơn `watch`.

```javascript
cartStore.$subscribe((mutation, state) => {
  // Lưu vào localStorage mỗi khi state thay đổi
  localStorage.setItem('cart', JSON.stringify(state))
})
```

**Thông tin trong `mutation`:**
-   `type`: direct / patch object / patch function.
-   `storeId`.
-   `payload`: dữ liệu truyền vào (nếu dùng patch object).

---

## 10. Flush timing & Detach

### Flush timing
Muốn callback chạy ngay lập tức sau mỗi thay đổi:
```javascript
cartStore.$subscribe(callback, { flush: 'sync' })
```

### Detach subscription
Mặc định subscription bị hủy khi component unmount. Để giữ lại:
```javascript
store.$subscribe(callback, { detached: true })
```

---

## 11. Watch toàn bộ state Pinia

```javascript
watch(
  pinia.state,
  (state) => {
    localStorage.setItem('piniaState', JSON.stringify(state))
  },
  { deep: true }
)
```

---

## 🎯 Tổng kết nhanh

| Chủ đề | Ý chính |
| :--- | :--- |
| **State** | Trung tâm dữ liệu, luôn là một function trả về object. |
| **TypeScript** | Tự động suy luận kiểu, hỗ trợ ép kiểu cho mảng/null. |
| **Truy cập** | Đọc và ghi trực tiếp (không cần mutations phức tạp). |
| **Reset** | Dùng `$reset()` (Option Store) hoặc tự viết (Setup Store). |
| **Options API** | Dùng `mapState` và `mapWritableState`. |
| **Mutation** | Direct change hoặc dùng `$patch` để gom nhóm thay đổi. |
| **Subscribe** | `$subscribe()` dùng để theo dõi và thực hiện side effects (ví dụ: bám dữ liệu). |
| **SSR** | Hỗ trợ qua `pinia.state.value`. |