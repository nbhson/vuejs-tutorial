# Scoped CSS trong Vue 3: Tóm tắt Đầy đủ & Dễ hiểu

Dưới đây là tóm tắt chi tiết về cách sử dụng CSS Scoped trong Vue 3, giúp bạn quản lý style hiệu quả mà không lo bị trùng lặp giữa các component. 👇

## 1. Scoped CSS là gì?

Khi thẻ `<style>` có thuộc tính `scoped`, CSS của nó sẽ chỉ áp dụng cho các element của **component hiện tại**.

**Cơ chế hoạt động:**
Vue sử dụng PostCSS để biến đổi code của bạn:
1. Thêm một attribute duy nhất (ví dụ: `data-v-f3f3eg5`) vào các element trong component.
2. Biến đổi selector CSS để chỉ nhắm vào các element có attribute đó.

**Ví dụ:**
```html
<style scoped>
.example {
  color: red;
}
</style>

<template>
  <div class="example">hi</div>
</template>
```
Sẽ được biên dịch thành:
```html
<div class="example" data-v-f3f3eg5>hi</div>

<style>
.example[data-v-f3f3eg5] {
  color: red;
}
</style>
```

## 2. Ghi đè Root Element của Component con

Một component con có **root element** sẽ bị ảnh hưởng bởi cả:
- Scoped CSS của component cha.
- Scoped CSS của chính nó.

> [!TIP]
> Điều này giúp component cha có thể căn chỉnh layout cho component con từ bên ngoài một cách dễ dàng.

## 3. Deep Selectors (Selector chuyên sâu)

Nếu bạn muốn tác động vào các element bên trong component con (không phải root element), bạn cần dùng pseudo-class `:deep()`.

**Ví dụ:**
```html
<style scoped>
.parent :deep(.child-class) {
  color: blue;
}
</style>
```
Sẽ biên dịch thành: `.parent[data-v-xxxx] .child-class`.

## 4. Slotted Selectors

Mặc định, scoped CSS không áp dụng cho nội dung được truyền vào qua `<slot>`. Để tác động đến chúng, hãy dùng `:slotted()`.

**Ví dụ:**
```html
<style scoped>
:slotted(div) {
  color: green;
}
</style>
```

## 5. Global Selectors

Nếu bạn muốn áp dụng một style toàn cục chỉ bên trong component hiện tại (không dùng file CSS riêng), hãy dùng `:global()`.

**Ví dụ:**
```html
<style scoped>
:global(.red) {
  color: red;
}
</style>
```

## 6. CSS Modules (Lựa chọn thay thế)

Thay vì `scoped`, bạn có thể dùng CSS Modules bằng cách thêm thuộc tính `module`.

```html
<template>
  <p :class="$style.red">Đây là màu đỏ</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

## 7. Local CSS Variables (`v-bind` trong CSS)

Vue 3 hỗ trợ liên kết các biến JavaScript trực tiếp vào CSS thông qua hàm `v-bind()`.

**Ví dụ:**
```html
<script setup>
const theme = {
  color: 'red'
}
</script>

<template>
  <p>Hello</p>
</template>

<style scoped>
p {
  color: v-bind('theme.color');
}
</style>
```

## 8. Tóm tắt nhanh (Cheat Sheet)

| Kỹ thuật | Cú pháp | Mục đích |
| :--- | :--- | :--- |
| **Scoped cơ bản** | `<style scoped>` | Chỉ áp dụng CSS cho component hiện tại |
| **Deep Selector** | `:deep(.selector)` | Tác động vào sâu bên trong component con |
| **Slotted Selector** | `:slotted(.selector)` | Tác động vào nội dung trong slot |
| **Global Selector** | `:global(.selector)` | Định nghĩa style toàn cục trong component |
| **CSS v-bind** | `color: v-bind(color)` | Dùng biến JS trong CSS |

---
> [!IMPORTANT]
> Scoped CSS không thay thế hoàn toàn việc tổ chức CSS. Với các style dùng chung toàn app, bạn vẫn nên dùng các file CSS toàn cục hoặc hệ thống Design System.

