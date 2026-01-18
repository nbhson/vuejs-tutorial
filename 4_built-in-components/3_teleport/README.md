# Teleport trong Vue 3: Tóm tắt Đầy đủ & Dễ hiểu

Dưới đây là bản tóm tắt chi tiết – đầy đủ – dễ hiểu về bài học `<Teleport>` trong Vue 3, kèm ví dụ minh họa cho từng phần. 👇

---

## 1. `<Teleport>` là gì?

`<Teleport>` là một built-in component của Vue 3, cho phép bạn **render (hiển thị)** một phần template sang một vị trí khác trong DOM, nằm ngoài cây DOM của component hiện tại, nhưng vẫn giữ nguyên logic và trạng thái của component đó.

👉 **Nói ngắn gọn:**
- **Logic:** Nằm ở một nơi (trong component).
- **Hiển thị:** Nằm ở nơi khác trong DOM (ví dụ: cuối thẻ `<body>`).

---

## 2. Vì sao cần `<Teleport>`?

### Vấn đề thường gặp:
Khi một component bị lồng quá sâu trong cấu trúc DOM, việc hiển thị các thành phần dạng lớp phủ (overlay) như Modal, Popup, Dropdown sẽ gặp khó khăn do ảnh hưởng từ CSS của các component cha:
- `overflow: hidden`: Làm mất một phần modal.
- `z-index`: Bị giới hạn bởi ngữ cảnh xếp chồng (stacking context) của cha.
- `transform`: Làm thay đổi cách tính vị trí `position: fixed`.

**Ví dụ cấu trúc lỗi:**
```html
<div class="outer">
  <!-- MyModal lồng bên trong .outer -->
  <MyModal />
</div>
```
👉 `MyModal` sẽ bị giới hạn không gian hiển thị bởi lớp `.outer`.

---

## 3. Ví dụ khi KHÔNG dùng `<Teleport>`

**MyModal.vue**
```html
<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>

<template>
  <button @click="open = true">Open Modal</button>

  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
```

❌ **Các vấn đề tiềm ẩn:**
- `position: fixed` có thể bị sai lệch nếu cha có thuộc tính `transform`.
- `z-index` bị giới hạn trong DOM cha, modal có thể bị che khuất bởi các phần tử khác cùng cấp với cha.

---

## 4. Cách dùng `<Teleport>` (Basic Usage)

**Cú pháp cơ bản:**
```html
<Teleport to="body">
  <!-- Nội dung muốn dịch chuyển đi nơi khác -->
</Teleport>
```

**Ví dụ sửa lại MyModal.vue:**
```html
<template>
  <button @click="open = true">Open Modal</button>

  <Teleport to="body">
    <div v-if="open" class="modal">
      <p>Hello from the modal!</p>
      <button @click="open = false">Close</button>
    </div>
  </Teleport>
</template>
```

**Kết quả:**
- Toàn bộ khối `.modal` sẽ được đẩy trực tiếp ra làm con của thẻ `<body>`.
- Không bị ảnh hưởng bởi CSS của component cha.
- Mọi logic xử lý sự kiện (click đóng modal) vẫn hoạt động hoàn hảo.

---

## 5. Thuộc tính `to`

Thuộc tính `to` xác định nơi mà nội dung sẽ được render vào. Nó chấp nhận:

- **CSS selector:**
  ```html
  <Teleport to="#modals-container">...</Teleport>
  ```
- **DOM node thực tế:**
  ```html
  <Teleport :to="document.body">...</Teleport>
  ```

> [!WARNING]
> **Quan trọng:** Target (mục tiêu) PHẢI tồn tại trong DOM từ trước khi `<Teleport>` được mount. Nếu bạn teleport vào một element do chính Vue quản lý, hãy đảm bảo element đó đã xuất hiện.

---

## 6. `<Teleport>` KHÔNG làm thay đổi logic component

Dù mã HTML bị "dịch chuyển" đi nơi khác trong cây DOM, mối quan hệ giữa các component vẫn không đổi:

- Component con bên trong `<Teleport>` vẫn nhận được **props** từ cha.
- Các sự kiện **emits** từ con vẫn được cha lắng nghe bình thường.
- Cơ chế **provide / inject** vẫn hoạt động xuyên suốt.
- Trên **Vue Devtools**, component vẫn nằm đúng vị trí trong cây component logic.

---

## 7. Tắt `<Teleport>` bằng thuộc tính `disabled`

Dùng khi bạn muốn thay đổi vị trí render dựa trên điều kiện (ví dụ: Responsive).

- **Desktop:** Hiện modal dạng overlay dịch chuyển ra `body`.
- **Mobile:** Hiện modal inline ngay tại vị trí hiện tại.

```html
<script setup>
const isMobile = ref(window.innerWidth < 768)
</script>

<template>
  <Teleport :disabled="isMobile" to="body">
    <div class="modal">Nội dung...</div>
  </Teleport>
</template>
```
👉 Khi `disabled="true"`, nội dung sẽ được render ngay tại chỗ mà không bị đẩy đi nơi khác.

---

## 8. Nhiều `<Teleport>` cùng một target

Bạn có thể đẩy nội dung từ nhiều nơi vào cùng một target.

```html
<Teleport to="#modals">
  <div>Nội dung A</div>
</Teleport>

<Teleport to="#modals">
  <div>Nội dung B</div>
</Teleport>
```

**Kết quả DOM:**
```html
<div id="modals">
  <div>Nội dung A</div>
  <div>Nội dung B</div>
</div>
```
👉 Các phần tử sẽ được thêm vào (append) theo thứ tự mà chúng được mount.

---

## 9. `defer` – Teleport trễ (Vue 3.5+)

Hữu ích khi target được render sau hoặc nằm bên dưới chính `<Teleport>` trong cùng một template.

```html
<Teleport defer to="#late-div">
  <p>Xin chào!</p>
</Teleport>

<!-- Target nằm ở phía dưới -->
<div id="late-div"></div>
```

> [!NOTE]
> Thuộc tính `defer` chỉ hoạt động nếu target xuất hiện trong cùng một chu kỳ render (tick). Nó không dùng để đợi các tác vụ bất đồng bộ (async).

---

## 10. Trường hợp sử dụng phổ biến 🚀

✅ **Các thành phần nên dùng Teleport:**
- **Modal / Dialog:** Lớp phủ ứng dụng.
- **Tooltip:** Hiển thị thông tin khi di chuột.
- **Dropdown:** Danh sách lựa chọn.
- **Toast / Notification:** Thông báo hệ thống.
- **Context menu:** Trình đơn chuột phải.

---

## 11. Tóm tắt nhanh (Cheat Sheet) 🎯

| Nội dung | Quy tắc ghi nhớ |
| :--- | :--- |
| **Mục đích** | Render DOM ra ngoài cây hiện tại để tránh lỗi layout/CSS |
| **Logic** | Không bị ảnh hưởng, vẫn giữ nguyên quan hệ Cha-Con |
| **Thuộc tính `to`** | Chấp nhận CSS selector hoặc DOM node |
| **`disabled`** | Tắt tính năng teleport, render nội dung tại chỗ |
| **Nhiều teleport** | Sẽ được thêm vào target theo thứ tự xuất hiện |
| **Vue 3.5+** | Hỗ trợ thuộc tính `defer` cho các target nằm phía dưới |