# Composables (Composition API)

Dưới đây là bản tóm tắt đầy đủ – chi tiết – dễ hiểu bài học Composables trong Vue 3, kèm ví dụ minh họa dựa theo nội dung tài liệu chính thức.

## 1. Composable là gì?

Composable là một hàm sử dụng Composition API để đóng gói và tái sử dụng **logic có state** (stateful logic).

📌 **Khác với hàm tiện ích thông thường:**
-   **Hàm thường:** Logic không có state (stateless) - ví dụ: format date.
-   **Composable:** Logic có state, lifecycle, side effects - ví dụ: theo dõi chuột, fetch API, theo dõi trạng thái mạng.

## 2. Vì sao cần Composables?

Trong thực tế, một logic thường được dùng ở nhiều component. Nếu viết lặp lại (copy-paste), mã nguồn sẽ rất khó bảo trì. **Composables** giúp tách phần logic này ra để tái sử dụng một cách linh hoạt.

---

## 3. Ví dụ cơ bản: Theo dõi vị trí chuột (Mouse Tracker)

### ❌ Viết trực tiếp trong component
```html
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)

function update(e) {
  x.value = e.pageX
  y.value = e.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))
</script>

<template>
  Mouse position is at: {{ x }}, {{ y }}
</template>
```
⛔ **Nhược điểm:** Logic bị “dính chặt” vào component → không tái sử dụng được ở nơi khác.

---

## 4. Tách logic thành Composable

### 4.1. Tạo composable `useMouse`
📁 **mouse.js**
```javascript
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(e) {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}
```
📌 **Quy ước:**
-   Tên hàm bắt đầu bằng `use` (ví dụ: `useMouse`).
-   Trả về một object chứa các `ref`.

### 4.2. Sử dụng composable trong component
```html
<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>
  Mouse position is at: {{ x }}, {{ y }}
</template>
```
✅ Logic dùng lại dễ dàng.
✅ Mỗi component sử dụng sẽ có một instance state riêng biệt.

---

## 5. Composables có thể lồng nhau

### 5.1. Tạo composable dùng chung event listener
📁 **event.js**
```javascript
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, callback) {
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
```

### 5.2. Dùng trong `useMouse`
```javascript
import { ref } from 'vue'
import { useEventListener } from './event'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, 'mousemove', (e) => {
    x.value = e.pageX
    y.value = e.pageY
  })

  return { x, y }
}
```
📌 **Lợi ích:** Chia nhỏ logic thành các phần chuyên biệt, dễ bảo trì và test.

---

## 6. Ví dụ: Async State (useFetch)

### 6.1. Vấn đề
Mọi tác vụ fetch API đều cần xử lý các trạng thái: `loading`, `data`, và `error`.

### 6.2. Composable `useFetch` cơ bản
```javascript
import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  fetch(url)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err))

  return { data, error }
}
```
**Cách sử dụng:**
```javascript
const { data, error } = useFetch('/api/posts')
```

---

## 7. Truyền state reactive vào composable

Khi muốn URL thay đổi thì `useFetch` tự động fetch lại dữ liệu:

### 7.1. Truyền ref hoặc getter
```javascript
const url = ref('/posts/1')
useFetch(url)

// Hoặc dùng getter
useFetch(() => `/posts/${props.id}`)
```

### 7.2. Dùng `watchEffect()` + `toValue()`
```javascript
import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  watchEffect(() => {
    data.value = null
    error.value = null

    fetch(toValue(url))
      .then((r) => r.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  })

  return { data, error }
}
```
📌 **`toValue()`:** Giúp chuẩn hóa các đầu vào (ref, getter, hoặc giá trị thường) thành giá trị thuần túy.

---

## 8. Quy ước & Best Practices

### 8.1. Naming
-   Sử dụng **camelCase**.
-   Bắt đầu bằng **`use`** (ví dụ: `useMouse`, `useFetch`).

### 8.2. Input arguments
-   Nên chấp nhận cả `ref`, `getter` và giá trị thường bằng cách sử dụng `toValue()`.

### 8.3. Return values
-   ✅ **Luôn return một object chứa các refs.** Điều này giúp người dùng dễ dàng destructuring mà vẫn giữ được tính phản ứng (reactivity).
-   ❌ Tránh return object `reactive()`.

### 8.4. Side Effects
-   Các thao tác với DOM nên đặt trong `onMounted`.
-   Luôn dọn dẹp (cleanup) trong `onUnmounted`.

### 8.5. Usage rules ⚠️
-   Chỉ được gọi trong `<script setup>` hoặc `setup()`.
-   Phải được gọi **đồng bộ** (không đặt trong hàm `async` hoặc các lệnh điều kiện).

---

## 9. Tổ chức code bằng Composables

```javascript
const { foo } = useFeatureA()
const { bar } = useFeatureB(foo)
const { baz } = useFeatureC(bar)
```
📌 Giúp tách biệt các mảng business logic (features) khác nhau ngay trong cùng một component.

---

## 10. Dùng Composable trong Options API

```javascript
export default {
  setup() {
    const { x, y } = useMouse()
    return { x, y }
  },
  mounted() {
    console.log(this.x)
  }
}
```

---

## 11. So sánh với kỹ thuật khác

| Kỹ thuật | Ưu điểm | Nhược điểm |
| :--- | :--- | :--- |
| **Composables** | Rõ ràng nguồn gốc, tree-shaking tốt, linh hoạt. | Cần hiểu về Composition API. |
| **Mixins (Vue 2)** | Tái sử dụng code. | ❌ Khó trace nguồn, dễ xung đột tên, phụ thuộc ngầm. |
| **Renderless Comp** | Tách UI và logic. | Tốn kém performance (nhiều instance). |

---

## ✅ KẾT LUẬN

-   **Composables** = Logic dẫn xuất có trạng thái.
-   Tự theo dõi và làm sạch tài nguyên.
-   Thay thế hoàn hảo cho Mixins.
-   Giúp code sạch, dễ đọc và dễ bảo trì.