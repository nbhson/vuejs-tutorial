# Provide / Inject trong Vue 3: Tóm tắt Đầy đủ & Dễ hiểu

Dưới đây là bản tóm tắt đầy đủ – chi tiết – dễ hiểu cho bài **Provide / Inject** trong Vue 3, kèm ví dụ minh họa cho từng phần (dựa đúng theo tài liệu chính thức). 👇

## 1. Vấn đề: Prop Drilling là gì?

❌ **Prop Drilling** xảy ra khi:
- Dữ liệu cần truyền từ một component cha ở cấp rất cao xuống một component con ở cấp rất sâu.
- Phải truyền props qua nhiều cấp component trung gian, mặc dù các component này hoàn toàn không sử dụng đến dữ liệu đó.

**Hệ quả:**
- Code trở nên rườm rà, lặp lại.
- Khó bảo trì và tái cấu trúc.
- Dễ phát sinh lỗi khi thay đổi tên prop hoặc logic truyền tin.

**Ví dụ về Prop Drilling:**
```text
<App>
 └── Layout (nhận props nhưng không dùng)
     └── Footer (nhận props nhưng không dùng)
         └── DeepChild (cần dùng props thực sự)
```

## 2. Giải pháp: Provide / Inject là gì?

✅ **Provide / Inject** là cơ chế **Dependency Injection** trong Vue.

**Nó cho phép:**
- Component cha **provide** (cung cấp) dữ liệu cho toàn bộ cây component con của nó.
- Bất kỳ component con nào (dù sâu bao nhiêu) cũng có thể **inject** (nhận) dữ liệu đó.
- Loại bỏ hoàn toàn việc truyền props qua các component trung gian.

> [!IMPORTANT]
> **Nguyên tắc:** Component con chỉ việc “lấy” dữ liệu mình cần, nó không quan tâm dữ liệu đó đến từ tầng nào phía trên.

## 3. Provide – Cung cấp dữ liệu

### 3.1. Provide với Composition API (`<script setup>`)

```html
<script setup>
import { provide } from 'vue'

provide('message', 'Hello Vue!')
</script>
```
- `'message'`: Key định danh.
- `'Hello Vue!'`: Giá trị cung cấp.

📌 Một component có thể gọi `provide()` nhiều lần để cung cấp nhiều bộ dữ liệu khác nhau.

### 3.2. Provide trong `setup()` (không dùng script setup)

```js
import { provide } from 'vue'

export default {
  setup() {
    provide('message', 'Hello Vue!')
  }
}
```

> [!WARNING]
> `provide()` phải được gọi đồng bộ bên trong hàm `setup()`.

### 3.3. Provide dữ liệu reactive

```js
import { ref, provide } from 'vue'

const count = ref(0)
provide('count', count)
```
📌 Component nhận (inject) sẽ nhận được chính ref đó, đảm bảo tính reactive được giữ nguyên trên toàn hệ thống.

### 3.4. Provide với Options API

**a. Provide tĩnh:**
```js
export default {
  provide: {
    message: 'Hello Vue!'
  }
}
```

**b. Provide theo từng instance (dùng function):**
```js
export default {
  data() {
    return {
      message: 'Hello Vue!'
    }
  },
  provide() {
    return {
      message: this.message
    }
  }
}
```

> [!CAUTION]
> Dữ liệu được provide qua Options API mặc định **không reactive** trừ khi bạn sử dụng `computed()` hoặc truyền một object chứa ref.

## 4. App-level Provide (Toàn ứng dụng)

```js
import { createApp } from 'vue'

const app = createApp({})
app.provide('message', 'Hello App!')
```
📌 Tất cả các component bên trong ứng dụng đều có thể inject được dữ liệu này. Rất hữu ích khi viết plugin hoặc cung cấp các cấu hình toàn cục.

## 5. Inject – Nhận dữ liệu

### 5.1. Inject với Composition API

```html
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>
```
📌 Vue sẽ tìm kiếm provider gần nhất trong cây component ngược lên trên.

### 5.2. Inject trong `setup()`

```js
import { inject } from 'vue'

export default {
  setup() {
    const message = inject('message')
    return { message }
  }
}
```

### 5.3. Inject với Options API

```js
export default {
  inject: ['message'],
  created() {
    console.log(this.message)
  }
}
```

Inject cũng có thể được sử dụng ngay trong phần khởi tạo `data()`:

```js
export default {
  inject: ['message'],
  data() {
    return {
      fullMessage: this.message + '!!!'
    }
  }
}
```

## 6. Injection Aliasing (Đổi tên khi inject)

Sử dụng khi bạn muốn biến nhúng trong component có tên khác với key mà provider cung cấp.

**Options API:**
```js
export default {
  inject: {
    localMessage: {
      from: 'message'
    }
  }
}
```
👉 Cách dùng: `this.localMessage`

## 7. Giá trị mặc định khi inject

Đề phòng trường hợp không có component cha nào provide key đó.

### 7.1. Giá trị mặc định đơn giản
```js
const value = inject('message', 'default value')
```

### 7.2. Dùng factory function
Dùng khi giá trị mặc định là một object hoặc mảng để tránh tạo lại đối tượng không cần thiết.
```js
const user = inject('user', () => ({ name: 'John' }), true)
```
- Tham số thứ 3 là `true` báo hiệu rằng tham số thứ 2 là một factory function.

### 7.3. Default trong Options API
```js
export default {
  inject: {
    message: {
      from: 'message',
      default: 'default value'
    },
    user: {
      default: () => ({ name: 'John' })
    }
  }
}
```

## 8. Làm việc với Reactivity (RẤT QUAN TRỌNG)

### 8.1. Khuyến nghị (Best Practice)
- **Hạn chế** việc thay đổi trực tiếp (mutate) state từ phía component nhận (injector).
- Nên cung cấp kèm theo một **function** để cập nhật state từ chính component cung cấp (provider).

### 8.2. Ví dụ chuẩn

**Provider:**
```html
<script setup>
import { ref, provide } from 'vue'

const location = ref('North Pole')

function updateLocation() {
  location.value = 'South Pole'
}

provide('location', {
  location,
  updateLocation
})
</script>
```

**Injector:**
```html
<script setup>
import { inject } from 'vue'

const { location, updateLocation } = inject('location')
</script>

<template>
  <button @click="updateLocation">
    {{ location }}
  </button>
</template>
```

### 8.3. Bảo vệ dữ liệu bằng `readonly()`
Nếu bạn muốn đảm bảo dữ liệu không bị thay đổi từ bên dưới:
```js
import { ref, provide, readonly } from 'vue'

const count = ref(0)
provide('count', readonly(count))
```

## 9. Sử dụng Symbol làm key (Dự án lớn)

Để tránh xung đột tên key (naming collisions) khi ứng dụng có quá nhiều `provide` hoặc khi bạn đang viết thư viện cho người khác dùng.

**`keys.js` (Khai báo):**
```js
export const myInjectionKey = Symbol()
```

**Provider:**
```js
import { provide } from 'vue'
import { myInjectionKey } from './keys'

provide(myInjectionKey, { count: 0 })
```

**Injector:**
```js
import { inject } from 'vue'
import { myInjectionKey } from './keys'

const data = inject(myInjectionKey)
```

## 10. Tóm tắt nhanh (Cheat Sheet)

| Nội dung | Quy tắc ghi nhớ |
| :--- | :--- |
| **Khi nào dùng** | Khi cần tránh tình trạng Prop Drilling |
| **Provide** | Cung cấp dữ liệu từ tổ tiên cho toàn bộ cây con |
| **Inject** | Nhận dữ liệu từ provider gần nhất phía trên |
| **Reactivity** | Luôn dùng `ref`, `computed`, hoặc `readonly` |
| **Update state** | Ưu tiên truyền kèm function xử lý update |
| **App-wide** | Dùng `app.provide()` trong file main |
| **Dự án lớn** | Sử dụng `Symbol` làm key để tránh trùng lặp |