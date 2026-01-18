# Custom Directives trong Vue 3: Tóm tắt Đầy đủ & Dễ hiểu

Dưới đây là bản tóm tắt đầy đủ – chi tiết – dễ hiểu nội dung bài **Custom Directives** (Chỉ thị tùy chỉnh) trong Vue 3, kèm ví dụ cho từng phần. 📘

---

## 1. Custom Directives là gì?

Ngoài các directive có sẵn như `v-model`, `v-show`, `v-if`, Vue cho phép bạn tạo directive riêng gọi là **Custom Directives**.

👉 **Mục đích chính:**
Custom directives dùng để tái sử dụng logic **thao tác DOM trực tiếp**, điều mà:
- **Component:** ❌ không phù hợp.
- **Composable:** ❌ không xử lý tốt.

📌 **So sánh nhanh:**
| Loại | Mục đích |
| :--- | :--- |
| **Component** | Tái sử dụng giao diện (UI) |
| **Composable** | Tái sử dụng logic (state, reactivity) |
| **Custom Directive** | Tái sử dụng các thao tác trên DOM (DOM manipulation) |

---

## 2. Khi nào nên dùng Custom Directives?

✅ **NÊN dùng khi:**
- Cần thao tác trực tiếp với phần tử DOM (ví dụ: tập trung tiêu điểm, vẽ canvas, quan sát kích thước).
- Logic thao tác DOM không thể giải quyết hiệu quả bằng binding (`v-bind`) hoặc component.

❌ **KHÔNG NÊN dùng nếu:**
- Có thể giải quyết bằng các tính năng cơ bản như `v-bind`, `:class`, `:style`.
- Có thể viết logic bằng component hoặc composable.

**Ví dụ điển hình: Tự động focus input**

```html
<script setup>
// Định nghĩa directive v-focus
const vFocus = {
  mounted(el) {
    el.focus()
  }
}
</script>

<template>
  <input v-focus />
</template>
```

> [!TIP]
> Directive này tốt hơn thuộc tính `autofocus` thuần vì nó hoạt động chính xác ngay cả khi phần tử được render động (v-if) hoặc di chuyển trong DOM.

---

## 3. Cách khai báo Custom Directive

### 3.1. Khai báo trong `<script setup>`
📌 Bất kỳ biến nào theo chuẩn **camelCase** bắt đầu bằng chữ `v` đều được Vue hiểu là một directive.

```html
<script setup>
const vHighlight = {
  mounted(el) {
    el.classList.add('is-highlight')
  }
}
</script>

<template>
  <p v-highlight>Nội dung quan trọng</p>
</template>
```
*📌 `vHighlight` trong script → được sử dụng dưới dạng `v-highlight` trong template.*

### 3.2. Đăng ký directive cục bộ (Local)
Dùng trong Options API:

```js
export default {
  directives: {
    highlight: {
      mounted(el) {
        el.classList.add('is-highlight')
      }
    }
  }
}
```

### 3.3. Đăng ký directive toàn cục (Global)
Gắn trực tiếp vào instance của ứng dụng:

```js
import { createApp } from 'vue'

const app = createApp({})

app.directive('highlight', {
  mounted(el) {
    el.classList.add('is-highlight')
  }
})
```
📌 Sau khi đăng ký global, `v-highlight` có thể dùng được ở mọi component trong toàn bộ ứng dụng.

---

## 4. Directive Hooks (Vòng đời của directive)

Một directive là một object chứa các hook tương tự như lifecycle của component.

```js
const myDirective = {
  created(el, binding, vnode, prevVnode) {}, // Trước khi các attribute được áp dụng
  beforeMount(el, binding, vnode, prevVnode) {}, // Trước khi gắn vào DOM
  mounted(el, binding, vnode, prevVnode) {}, // Đã gắn vào DOM (Thường dùng nhất)
  beforeUpdate(el, binding, vnode, prevVnode) {}, // Trước khi element cập nhật
  updated(el, binding, vnode, prevVnode) {}, // Sau khi element đã cập nhật xong (Thường dùng nhất)
  beforeUnmount(el, binding, vnode, prevVnode) {}, // Trước khi tháo khỏi DOM
  unmounted(el, binding, vnode, prevVnode) {} // Đã tháo khỏi DOM hoàn toàn
}
```

---

## 5. Tham số trong Directive Hook

Mỗi hook nhận các tham số sau:
- **`el`**: Phần tử DOM thực tế.
- **`binding`**: Một object chứa thông tin về directive được truyền vào.
- **`vnode`**: Đại diện cho phần tử ảo (Virtual Node).

| Thuộc tính của `binding` | Ý nghĩa |
| :--- | :--- |
| **`value`** | Giá trị truyền vào directive (ví dụ: trong `v-my-dir="1 + 1"`, giá trị là `2`) |
| **`oldValue`** | Giá trị cũ (chỉ có trong `beforeUpdate` và `updated`) |
| **`arg`** | Tham số (ví dụ: trong `v-my-dir:foo`, tham số là `"foo"`) |
| **`modifiers`** | Các công cụ sửa đổi (ví dụ: trong `v-my-dir.bar`, modifiers là `{ bar: true }`) |
| **`instance`** | Instance của component sử dụng directive này |

**Ví dụ:**
```html
<div v-example:foo.bar="baz"></div>
```
Kết quả của `binding`:
```js
{
  arg: 'foo',
  modifiers: { bar: true },
  value: baz, // giá trị của biến baz
  oldValue: ... 
}
```

---

## 6. Directive có Argument & Modifier

### Argument (Tham số)
```html
<div v-color:red></div>
```
```js
mounted(el, binding) {
  console.log(binding.arg) // 'red'
}
```

### Modifier (Công cụ sửa đổi)
```html
<div v-demo.large.bold></div>
```
```js
mounted(el, binding) {
  console.log(binding.modifiers) // { large: true, bold: true }
}
```

---

## 7. Directive với Function Shorthand

Nếu bạn chỉ cần xử lý cho 2 hook `mounted` và `updated` với cùng một logic, bạn có thể viết ngắn gọn:

```js
app.directive('color', (el, binding) => {
  // Logic này sẽ chạy cho cả mounted và updated
  el.style.color = binding.value
})
```
Cách dùng:
```html
<div v-color="'red'"></div>
```

---

## 8. Truyền nhiều giá trị bằng Object Literal

Bạn có thể truyền một object phức tạp nếu cần nhiều tham số.

```html
<div v-demo="{ color: 'white', text: 'hello' }"></div>
```
```js
app.directive('demo', (el, binding) => {
  el.style.color = binding.value.color
  el.textContent = binding.value.text
})
```

---

## 9. Sử dụng directive trên Component

> [!CAUTION]
> **KHÔNG KHUYẾN KHÍCH** sử dụng custom directive trên component.

**Lý do:**
- Directive chỉ áp dụng duy nhất lên **root element** của component con.
- Nếu component con có nhiều root node (fragments), directive sẽ bị bỏ qua và Vue sẽ phát cảnh báo.
- Không giống như attribute bình thường, directive không thể được chuyển tiếp bằng `$attrs`.

👉 **Khuyến nghị:** Chỉ nên dùng custom directive cho các HTML element thuần túy.

---

## 10. Ghi chú quan trọng

> [!WARNING]
> Tuyệt đối **không được chỉnh sửa** trực tiếp các tham số `binding`, `vnode`, hoặc `instance`. Chúng nên được coi là chỉ đọc (read-only).

✅ Nếu bạn cần lưu trữ dữ liệu giữa các hook khác nhau, hãy sử dụng thuộc tính `dataset` của DOM hoặc chính thuộc tính của phần tử `el`:
```js
el.dataset.myValue = '123'
```

---

## 11. Tổng kết nhanh 🎯

| Nội dung | Quy tắc ghi nhớ |
| :--- | :--- |
| **Mục đích** | Tái sử dụng logic thao tác trực tiếp lên DOM |
| **Khi dùng** | Khi binding cơ bản không giải quyết được vấn đề |
| **Hook thường dùng** | `mounted`, `updated` |
| **Viết gọn** | Sử dụng Function shorthand nếu code `mounted` và `updated` giống nhau |
| **Component** | ❌ Hạn chế sử dụng, ưu tiên dùng cho thẻ HTML thuần |