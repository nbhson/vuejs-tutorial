Dưới đây là tóm tắt đầy đủ – chi tiết – dễ hiểu bài học Class and Style Bindings (Ràng buộc class và style) trong Vue 3, kèm ví dụ minh họa cho từng phần, dựa đúng theo nội dung trang bạn đang xem.

# 1. Mục đích của Class & Style Bindings

Trong Vue, ta thường cần:

- Thêm / gỡ class CSS
- Thay đổi style inline

👉 Nếu nối chuỗi thủ công `("active " + (isActive ? "on" : ""))` thì:

- Khó đọc
- Dễ lỗi

➡️ Vue cung cấp cú pháp đặc biệt cho `:class` và `:style`
Cho phép dùng object, array, computed rất gọn gàng.

# 2. Binding HTML Classes (:class)

## 2.1. Binding class bằng Object

Dùng khi bạn muốn bật/tắt class theo điều kiện.

```html
<template>
  <div :class="{ active: isActive }"></div>
</template>

<script setup>
import { ref } from 'vue'
const isActive = ref(true)
</script>
```

> ✔ Khi isActive = true → có class active
>
> ❌ Khi false → không có

## 2.2. Nhiều class trong object

```html
<div :class="{ active: isActive, 'text-danger': hasError }"></div>
```

```js
const isActive = ref(true)
const hasError = ref(false)
```

**Kết quả render:**

```html
<div class="active"></div>
```

Nếu `hasError = true`:

```html
<div class="active text-danger"></div>
```

## 2.3. Dùng chung với class tĩnh

```html
<div class="static" :class="{ active: isActive }"></div>
```

**Render:**

```html
<div class="static active"></div>
```

## 2.4. Object class đặt trong biến

```js
const classObject = reactive({
  active: true,
  'text-danger': false
})
```

```html
<div :class="classObject"></div>
```

**Render:**

```html
<div class="active"></div>
```

## 2.5. Class với computed property (rất hay dùng 👍)

```js
const isActive = ref(true)
const error = ref(null)

const classObject = computed(() => ({
  active: isActive.value && !error.value,
  'text-danger': error.value?.type === 'fatal'
}))
```

```html
<div :class="classObject"></div>
```

👉 Logic phức tạp → đưa hết vào computed, template rất sạch.

# 3. Binding class bằng Array

Dùng khi bạn có danh sách class.

## 3.1. Array cơ bản

```html
<div :class="[activeClass, errorClass]"></div>
```

```js
const activeClass = ref('active')
const errorClass = ref('text-danger')
```

**Render:**

```html
<div class="active text-danger"></div>
```

## 3.2. Class có điều kiện (ternary)

```html
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

> ✔ activeClass chỉ xuất hiện khi isActive = true

## 3.3. Kết hợp object trong array (rất mạnh)

```html
<div :class="[{ [activeClass]: isActive }, errorClass]"></div>
```

👉 Vừa gọn, vừa linh hoạt

# 4. Class khi dùng với Component

## 4.1. Component có 1 root element

```html
<!-- MyComponent.vue -->
<p class="foo bar">Hi!</p>

<MyComponent class="baz boo" />
```

**Render:**

```html
<p class="foo bar baz boo">Hi!</p>
```

## 4.2. Binding class cho component

```html
<MyComponent :class="{ active: isActive }" />
```

**Khi isActive = true:**

```html
<p class="foo bar active">Hi!</p>
```

## 4.3. Component có nhiều root element

Phải dùng `$attrs.class`

```html
<p :class="$attrs.class">Hi!</p>
<span>Child</span>

<MyComponent class="baz" />
```

**Render:**

```html
<p class="baz">Hi!</p>
<span>Child</span>
```
