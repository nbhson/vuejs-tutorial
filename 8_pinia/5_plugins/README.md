# Pinia Plugins

Dưới đây là tóm tắt đầy đủ – dễ hiểu – có ví dụ cụ thể về bài học Pinia Plugins, dựa theo nội dung tài liệu chính thức.

## 1. Pinia Plugin là gì?

👉 **Pinia Plugin** là một hàm cho phép bạn mở rộng và tùy chỉnh store sau khi nó được khởi tạo. 

Bạn có thể dùng plugin để:
-   Thêm thuộc tính mới cho store.
-   Thêm state mới hoặc bọc (wrap) các action hiện có.
-   Bắt sự kiện action thông qua `$onAction`.
-   Lắng nghe thay đổi state thông qua `$subscribe`.
-   Tích hợp các side effects (như `localStorage`, logger, analytics...).

---

## 2. Cách đăng ký plugin

Plugin được đăng ký thông qua phương thức `pinia.use()`.

```javascript
import { createPinia } from 'pinia'

const pinia = createPinia()

// Đăng ký plugin
pinia.use(myPiniaPlugin)
```

⚠️ **Quan trọng:**
-   Plugin chỉ áp dụng cho những store được tạo **SAU** khi plugin được đăng ký.
-   Instance của `pinia` phải được gắn vào ứng dụng Vue trước (`app.use(pinia)`).

---

## 3. Cấu trúc của một Pinia Plugin

Một plugin đơn giản là một function nhận vào một đối tượng `context`:

```javascript
export function myPiniaPlugin(context) {
  context.pinia    // Instance pinia
  context.app      // Vue app instance
  context.store    // Store hiện tại đang được xử lý
  context.options  // Các options được truyền vào defineStore
}
```

---

## 4. Thêm thuộc tính vào Store (Augmenting Store)

### Cách 1: Trả về một object (Khuyên dùng)
```javascript
pinia.use(() => ({
  hello: 'world'
}))

// Sử dụng
const store = useStore()
console.log(store.hello) // 'world'
```
✔️ **Ưu điểm:** Các thuộc tính này sẽ tự động hiển thị chính xác trong Vue DevTools.

### Cách 2: Gán trực tiếp vào instance của store
```javascript
pinia.use(({ store }) => {
  store.hello = 'world'
})
```
👉 Nếu muốn thuộc tính hiển thị trong DevTools ở môi trường phát triển:
```javascript
if (import.meta.env.DEV) {
  store._customProperties.add('hello')
}
```

---

## 5. Reactivity tự động

Vì Pinia store được bọc bởi `reactive()`, nên các `ref` hoặc `computed` được thêm vào qua plugin sẽ tự động được unwrap (không cần dùng `.value`).

```javascript
import { ref } from 'vue'

pinia.use(({ store }) => {
  store.count = ref(1)
})

console.log(store.count) // 1 (tự động unwrap)
```

---

## 6. Thêm State mới cho Store

⚠️ Nếu bạn muốn thêm một thuộc tính state mới, bạn **PHẢI** khai báo nó ở cả instance của store và `store.$state` để đảm bảo tính đồng bộ (đặc biệt là với SSR).

### Ví dụ: Thêm thuộc tính `hasError`
```javascript
import { ref, toRef } from 'vue'

pinia.use(({ store }) => {
  if (!store.$state.hasOwnProperty('hasError')) {
    store.$state.hasError = ref(false)
  }

  // Luôn dùng toRef để liên kết giữa store instance và $state
  store.hasError = toRef(store.$state, 'hasError')
})
```
✔️ Điều này đảm bảo:
-   SSR (Server-Side Rendering) hoạt động chính xác.
-   DevTools hiển thị state mới một cách trực quan.
-   State có thể được serialize/deserialize.

---

## 7. Reset state được thêm từ plugin

Mặc định, phương thức `$reset()` của store sẽ **KHÔNG** reset các thuộc tính state được thêm qua plugin. Bạn cần override (ghi đè) lại `$reset`.

```javascript
pinia.use(({ store }) => {
  const originalReset = store.$reset.bind(store)

  return {
    $reset() {
      originalReset() // Reset các state gốc
      store.hasError = false // Reset state của plugin
    }
  }
})
```

---

## 8. Thêm các thuộc tính bên ngoài (Router, Services...)

⚠️ Đối với các đối tượng không cần tính phản ứng (non-reactive) như instance của Router hoặc API Service, hãy sử dụng `markRaw()`.

```javascript
import { markRaw } from 'vue'
import { router } from '@/router'

pinia.use(({ store }) => {
  store.router = markRaw(router)
})
```

---

## 9. Sử dụng `$subscribe` và `$onAction` trong plugin

Bạn có thể thiết lập các trình lắng nghe toàn cục cho mọi store.

```javascript
pinia.use(({ store }) => {
  // Lắng nghe thay đổi state
  store.$subscribe((mutation, state) => {
    console.log(`Store ${mutation.storeId} đã thay đổi`)
  })

  // Lắng nghe các actions
  store.$onAction(({ name, args, after, onError }) => {
    console.log(`Action "${name}" được gọi với tham số:`, args)
  })
})
```

---

## 10. Thêm option mới cho `defineStore`

Bạn có thể định nghĩa các thuộc tính tùy chỉnh ngay khi khai báo store và đọc chúng trong plugin.

### Ví dụ: Thêm option `debounce`
```javascript
defineStore('search', {
  actions: {
    searchContacts() {}
  },
  debounce: {
    searchContacts: 300 // Option tùy chỉnh
  }
})
```

### Plugin xử lý option `debounce`
```javascript
import debounce from 'lodash/debounce'

pinia.use(({ options, store }) => {
  if (!options.debounce) return

  return Object.keys(options.debounce).reduce((result, actionName) => {
    result[actionName] = debounce(store[actionName], options.debounce[actionName])
    return result
  }, {})
})
```

---

## 11. TypeScript với Pinia Plugin

Để có trải nghiệm lập trình tốt nhất, hãy khai báo kiểu cho các thuộc tính mới.

### Khai báo thuộc tính và state mới
```typescript
import 'pinia'
import type { Router } from 'vue-router'

declare module 'pinia' {
  // Cho các thuộc tính (actions, getters,...)
  export interface PiniaCustomProperties {
    router: Router
  }

  // Cho các state mới
  export interface PiniaCustomStateProperties<S> {
    hasError: boolean
  }
}
```

---

## 12. Tổng kết nhanh

| Mục | Ý nghĩa |
| :--- | :--- |
| **Bản chất** | Mở rộng tính năng cho mọi store một cách tập trung. |
| **Cơ chế** | Chạy mỗi khi một store được khởi tạo. |
| **Cách dùng tốt nhất** | Trả về object từ function của plugin. |
| **Ghi chú state** | Luôn đồng bộ với `$state` để hỗ trợ SSR/DevTools. |
| **markRaw()** | Bắt buộc cho các instance bên ngoài (Router, API). |
| **Theo dõi** | Sử dụng `$subscribe` và `$onAction` để làm logger/analytics. |