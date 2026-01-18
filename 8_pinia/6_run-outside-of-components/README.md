# Using a Store Outside of a Component

Dưới đây là tóm tắt đầy đủ – dễ hiểu nội dung bài "Using a store outside of a component" (Sử dụng Pinia store bên ngoài component), kèm ví dụ cụ thể cho từng phần.

## 1. Vấn đề cốt lõi: Vì sao dùng Pinia ngoài component lại đặc biệt?

Trong component Vue (ở hàm `setup()` hoặc `<script setup>`), bạn chỉ cần gọi:
```javascript
const userStore = useUserStore()
```

👉 **Lý do:**
-   Pinia tự động tìm thấy instance `pinia` đã được cài đặt qua `app.use(pinia)`.
-   Vue tự biết "ngữ cảnh hiện tại" (context) của ứng dụng.

⚠️ **Tuy nhiên, ngoài component (router, file util, service, middleware...):**
-   Không có ngữ cảnh Vue tự động.
-   `useStore()` không tự biết phải dùng instance `pinia` nào.
-   Nếu gọi không đúng cách, bạn sẽ gặp lỗi vì store cố gắng truy cập pinia trước khi nó được khởi tạo.

---

## 2. Nguyên tắc quan trọng nhất

> **Pinia store chỉ hoạt động khi `pinia` đã được cài đặt vào ứng dụng (`app.use(pinia)`).**

Nếu bạn gọi `useStore()` ở cấp độ cao nhất (top-level) của một file được import trước khi `app.use(pinia)` chạy, ứng dụng sẽ bị lỗi.

---

## 3. Single Page Application (SPA)

### 3.1. Trường hợp GÂY LỖI ❌
```javascript
import { useUserStore } from '@/stores/user'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

// ❌ LỖI: Gọi store ở top-level trước khi pinia được cài đặt
const userStore = useUserStore()

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
```

### 3.2. Trường hợp ĐÚNG ✅
```javascript
import { useUserStore } from '@/stores/user'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

// ✅ OK: pinia đã được cài đặt và active
const userStore = useUserStore()
```

### 3.3. Cách an toàn nhất (Best Practice) ⭐

👉 **KHÔNG** gọi store ở cấp độ top-level của file.
👉 Luôn đặt `useStore()` bên trong một function để đảm bảo nó chỉ chạy khi được gọi (thường là sau khi app đã khởi tạo).

```javascript
// utils.js
import { useUserStore } from '@/stores/user'

export function getUserData() {
  // ✅ Gọi store bên trong hàm
  const userStore = useUserStore()
  return userStore.data
}
```

---

## 4. Ví dụ thực tế: Dùng Pinia trong Vue Router

### Cách sai (Dễ gây lỗi thứ tự import) ❌
```javascript
import { useUserStore } from '@/stores/user'
import { createRouter } from 'vue-router'

const router = createRouter({ /* ... */ })

// ❌ SAI: gọi store ở ngoài, có thể chạy trước khi pinia sẵn sàng
const store = useUserStore()

router.beforeEach((to, from, next) => {
  if (store.isLoggedIn) next()
  else next('/login')
})
```

### Cách đúng (Chuẩn Pinia) ✅
```javascript
import { useUserStore } from '@/stores/user'
import { createRouter } from 'vue-router'

const router = createRouter({ /* ... */ })

router.beforeEach((to) => {
  // ✅ ĐÚNG: Gọi store ngay bên trong navigation guard
  const store = useUserStore()

  if (to.meta.requiresAuth && !store.isLoggedIn) {
    return '/login'
  }
})
```
👉 **Tại sao đúng?** Vì `beforeEach` chỉ thực thi khi ứng dụng đã bắt đầu chạy, nghĩa là lúc đó `pinia` chắc chắn đã được cài đặt.

---

## 5. Server-Side Rendering (SSR)

⚠️ **Với môi trường SSR, nguyên tắc hoàn toàn khác:**
-   Mỗi request cần một instance `pinia` riêng biệt để tránh rò rỉ dữ liệu giữa các người dùng.
-   Không bao giờ được sử dụng một instance `pinia` toàn cục.

👉 **Bắt buộc:** Bạn phải truyền instance `pinia` vào hàm `useStore`.
```javascript
// SSR context
const userStore = useUserStore(pinia)
```

---

## 6. Tổng kết ngắn gọn 🔥

| Nên làm ✅ | Tránh ❌ |
| :--- | :--- |
| Gọi `useStore()` sau khi `app.use(pinia)`. | Gọi `useStore()` ở top-level của file. |
| Gọi store bên trong các function, hook, hoặc guard. | Gọi store trước khi cài đặt pinia. |
| Với SSR: Luôn truyền instance `pinia` cụ thể. | Dùng pinia global/singleton trong môi trường SSR. |