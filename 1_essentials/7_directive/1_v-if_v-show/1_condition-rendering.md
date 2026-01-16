Dưới đây là tóm tắt đầy đủ – chi tiết – dễ hiểu bài Conditional Rendering (Render có điều kiện) trong Vue 3, kèm ví dụ minh họa cho từng phần, dựa đúng nội dung trang bạn đang mở.

# 1. Conditional Rendering là gì?

Conditional Rendering cho phép Vue hiển thị hoặc ẩn một phần giao diện dựa trên điều kiện (true / false).

➡️ Rất thường dùng cho:

- Hiển thị / ẩn nút đăng nhập
- Loading / Empty state
- Phân quyền người dùng
- Toggle UI (bật / tắt)

Vue cung cấp các directive chính:

- `v-if`
- `v-else`
- `v-else-if`
- `v-show`

# 2. v-if – Hiển thị có điều kiện

## Khái niệm

`v-if` chỉ render phần tử khi điều kiện đúng.
Nếu điều kiện sai → phần tử không tồn tại trong DOM.

## Cú pháp

```html
<h1 v-if="awesome">Vue is awesome!</h1>
```

## Ví dụ

```html
<script setup>
import { ref } from 'vue'
const isLogin = ref(true)
</script>

<template>
  <h1 v-if="isLogin">Chào mừng bạn quay lại 🎉</h1>
</template>
```

> ➡️ Khi isLogin = false → `<h1>` bị xóa khỏi DOM

# 3. v-else – Trường hợp ngược lại của v-if

## Khái niệm

`v-else` đại diện cho “nếu không thì…”

**BẮT BUỘC** đứng ngay sau `v-if`

## Ví dụ

```html
<script setup>
import { ref } from 'vue'
const awesome = ref(true)
</script>

<template>
  <button @click="awesome = !awesome">Toggle</button>

  <h1 v-if="awesome">Vue is awesome 😍</h1>
  <h1 v-else>Oh no 😢</h1>
</template>
```

> ⚠️ Sai cách (Vue sẽ không nhận `v-else`):

```html
<h1 v-if="awesome">OK</h1>
<p>---</p>
<h1 v-else>NOT OK</h1>
```

# 4. v-else-if – Nhiều điều kiện liên tiếp

## Khái niệm

- Dùng khi có nhiều nhánh điều kiện
- Có thể chain nhiều `v-else-if`
- Phải đứng liền kề nhau

## Ví dụ

```html
<script setup>
import { ref } from 'vue'
const type = ref('B')
</script>

<template>
  <div v-if="type === 'A'">Loại A</div>
  <div v-else-if="type === 'B'">Loại B</div>
  <div v-else-if="type === 'C'">Loại C</div>
  <div v-else>Không thuộc loại nào</div>
</template>
```

# 5. v-if trên template – Render nhiều phần tử cùng lúc

## Vấn đề

`v-if` chỉ gắn vào 1 element, vậy nếu muốn bật/tắt nhiều element thì sao?

## Giải pháp

Dùng `<template v-if>`

## Ví dụ

```html
<script setup>
import { ref } from 'vue'
const ok = ref(true)
</script>

<template>
  <template v-if="ok">
    <h1>Tiêu đề</h1>
    <p>Đoạn văn 1</p>
    <p>Đoạn văn 2</p>
  </template>
</template>
```

> 📌 `<template>` không xuất hiện trong DOM, chỉ là wrapper logic.
>
> ➡️ `v-else` và `v-else-if` cũng dùng được với `<template>`.

# 6. v-show – Ẩn/hiện bằng CSS

## Khái niệm

`v-show` luôn render element

Chỉ thay đổi CSS: `display: none`

## Cú pháp

```html
<h1 v-show="ok">Hello!</h1>
```

## Ví dụ

```html
<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>

<template>
  <button @click="show = !show">Toggle</button>
  <p v-show="show">Nội dung này chỉ bị ẩn/hiện</p>
</template>
```

> ⚠️ Lưu ý:
>
> - `v-show` ❌ KHÔNG hỗ trợ `<template>`
> - `v-show` ❌ KHÔNG dùng được với `v-else`

# 7. So sánh v-if vs v-show (RẤT QUAN TRỌNG)

| Tiêu chí | v-if | v-show |
| :--- | :--- | :--- |
| **Render DOM** | Có điều kiện | Luôn render |
| **Ẩn/hiện** | Thêm/xóa DOM | CSS display |
| **Chi phí** | Cao khi toggle | Cao lúc render đầu |
| **Phù hợp** | Ít thay đổi | Toggle thường xuyên |

## Khi nào dùng?

- ✅ **v-if**: Modal hiếm mở, tab ít đổi
- ✅ **v-show**: Dropdown, accordion, toggle UI

# 8. v-if kết hợp với v-for

## Quy tắc

Khi dùng trên cùng 1 element:

```html
<li v-for="item in items" v-if="item.active">
```

➡️ `v-if` chạy trước `v-for`

Vue khuyến cáo ❌ **KHÔNG** nên dùng như vậy

## Cách đúng

```html
<li v-for="item in activeItems" :key="item.id">
  {{ item.name }}
</li>
```

```js
const activeItems = computed(() =>
  items.value.filter(item => item.active)
)
```

> 📌 Tách logic ra → code rõ ràng, dễ debug, hiệu năng tốt hơn.

# 9. Tổng kết nhanh 🧠

- `v-if` → render có điều kiện (DOM thật)
- `v-else`, `v-else-if` → nhánh logic
- `<template v-if>` → bật/tắt nhiều element
- `v-show` → ẩn/hiện bằng CSS
- Không nên dùng `v-if` + `v-for` cùng element.