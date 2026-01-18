# Transition trong Vue 3: Tóm tắt Đầy đủ & Dễ hiểu

Dưới đây là bản tóm tắt đầy đủ – chi tiết – dễ hiểu về bài học `<Transition>` trong Vue 3, kèm ví dụ minh họa cho từng phần. 👇

---

## 1. `<Transition>` là gì?

`<Transition>` là một component dựng sẵn của Vue dùng để tạo hiệu ứng animation/transition khi một phần tử hoặc component xuất hiện hoặc biến mất khỏi DOM.

📌 **Áp dụng khi:**
- Sử dụng `v-if`.
- Sử dụng `v-show`.
- Thay đổi component động thông qua `<component :is="..." />`.
- Thay đổi giá trị của thuộc tính `key`.

> [!IMPORTANT]
> - `<Transition>` chỉ bao bọc **một phần tử hoặc một component duy nhất**.
> - Component bên trong cũng chỉ được phép có **một root element duy nhất**.

**Ví dụ cơ bản:**

```html
<template>
  <button @click="show = !show">Toggle</button>

  <Transition>
    <p v-if="show">Hello Vue!</p>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>

<style>
.v-enter-active, .v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from, .v-leave-to {
  opacity: 0;
}
</style>
```

---

## 2. Cách Vue xử lý Transition

Khi một phần tử đi vào hoặc ra khỏi DOM, Vue sẽ:
1. Tự động kiểm tra xem phần tử đích có các CSS transition hoặc animation được áp dụng hay không.
2. Gắn các class transition tương ứng vào phần tử tại những thời điểm nhất định.
3. Gọi các JavaScript hooks (nếu có) để thực hiện logic tùy chỉnh.
4. Nếu không phát hiện CSS hay JavaScript hooks, các thao tác DOM sẽ được thực thi ngay lập tức.

---

## 3. Các lớp CSS trong Transition (Transition Classes)

Vue sử dụng 6 class chính để quản lý quá trình chuyển đổi:

| Class | Ý nghĩa |
| :--- | :--- |
| **`v-enter-from`** | Trạng thái bắt đầu khi phần tử xuất hiện |
| **`v-enter-active`** | Áp dụng trong suốt quá trình phần tử xuất hiện |
| **`v-enter-to`** | Trạng thái kết thúc khi phần tử đã xuất hiện |
| **`v-leave-from`** | Trạng thái bắt đầu khi phần tử biến mất |
| **`v-leave-active`** | Áp dụng trong suốt quá trình phần tử biến mất |
| **`v-leave-to`** | Trạng thái kết thúc khi phần tử đã biến mất |

📌 **Thường dùng nhất:**
- `*-enter-active`, `*-leave-active`: Để khai báo thuộc tính `transition` hoặc `animation`.
- `*-enter-from`, `*-leave-to`: Để khai báo các giá trị bắt đầu và kết thúc của hiệu ứng.

---

## 4. Transition có tên (Named Transition)

Giúp bạn dễ dàng quản lý và phân biệt nhiều hiệu ứng khác nhau trong cùng một ứng dụng.

**Ví dụ:**
```html
<Transition name="fade">
  <p v-if="show">Hello</p>
</Transition>
```

```css
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
```
👉 Khi có `name="fade"`, Vue sẽ tự động thay đổi tiền tố mặc định từ `v-` thành `fade-`.

---

## 5. Transition bằng CSS Transition

Phù hợp cho các thay đổi đơn giản về: `opacity`, `transform`, `scale`, `translate`.

**Ví dụ: Hiệu ứng Slide kết hợp Fade**
```css
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
```

---

## 6. Transition bằng CSS Animation

Sử dụng `@keyframes` để tạo các hiệu ứng phức tạp hơn.

**Ví dụ: Hiệu ứng Bounce**
```css
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% { transform: scale(0); }
  50% { transform: scale(1.25); }
  100% { transform: scale(1); }
}
```
📌 Vue sẽ tự động lắng nghe sự kiện `animationend` để kết thúc quá trình transition.

---

## 7. Custom Transition Classes

Hữu ích khi bạn muốn tích hợp các thư viện bên ngoài như **Animate.css** hoặc **GSAP**.

```html
<Transition
  enter-active-class="animate__animated animate__tada"
  leave-active-class="animate__animated animate__bounceOutRight"
>
  <p v-if="show">Hello</p>
</Transition>
```

---

## 8. Kết hợp Transition & Animation

Nếu một phần tử vừa áp dụng `transition` vừa áp dụng `animation` cùng lúc, bạn cần chỉ định cho Vue biết loại nào sẽ quyết định thời gian kết thúc.

```html
<Transition type="animation">...</Transition>
<!-- hoặc -->
<Transition type="transition">...</Transition>
```

---

## 9. Transition lồng nhau (Nested Transition)

Mặc dù `<Transition>` chỉ áp dụng trực tiếp lên root element, nhưng bạn vẫn có thể sử dụng các class transition để điều khiển các phần tử con bên trong.

**Ví dụ:**
```css
.nested-enter-active .inner {
  transition: all 0.3s ease;
}

.nested-enter-from .inner {
  transform: translateX(30px);
  opacity: 0;
}
```

**Chỉ định thời gian (Duration):**
```html
<Transition :duration="550">...</Transition>
<!-- Hoặc chi tiết cho từng giai đoạn -->
<Transition :duration="{ enter: 500, leave: 800 }">...</Transition>
```

---

## 10. Lưu ý về Hiệu năng (Performance)

✅ **NÊN dùng các thuộc tính nhẹ:** `opacity`, `transform`.
❌ **HẠN CHẾ dùng:** `height`, `margin`, `padding`.

👉 Bởi vì `height`, `margin`, `padding` sẽ gây ra các trình trạng **reflow** và **repaint** nặng, làm giảm hiệu năng ứng dụng, đặc biệt trên thiết bị di động.

---

## 11. JavaScript Transition Hooks

Sử dụng khi bạn cần kiểm soát hoàn toàn quá trình animation bằng JavaScript (ví dụ dùng GSAP).

```html
<Transition
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @enter-cancelled="onEnterCancelled"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
  @leave-cancelled="onLeaveCancelled"
  :css="false"
>
  ...
</Transition>
```

```javascript
function onEnter(el, done) {
  // Logic animation bằng JS...
  // Gọi done() khi hoàn tất
  done()
}
```
> [!IMPORTANT]
> Khi sử dụng `:css="false"`, bạn **bắt buộc** phải gọi hàm `done()` trong các hook `enter` và `leave` để Vue biết khi nào tiến trình hoàn tất.

---

## 12. Tạo Transition tái sử dụng (Reusable Transition)

Tạo một component bọc `<Transition>` để sử dụng lại ở nhiều nơi.

**`MyTransition.vue`**
```html
<template>
  <Transition name="fade">
    <slot />
  </Transition>
</template>
```

**Sử dụng:**
```html
<MyTransition>
  <div v-if="show">Hello World</div>
</MyTransition>
```

---

## 13. Các tính năng mở rộng khác

- **`appear`**: Kích hoạt hiệu ứng ngay lần đầu tiên component được render.
- **Transition Modes**: Điều phối thứ tự giữa phần tử cũ và phần tử mới.
    - `out-in`: Phần tử cũ biến mất xong mới hiện phần tử mới.
    - `in-out`: Phần tử mới hiện lên rồi phần tử cũ mới biến mất.
- **Transition giữa các Elements**: Sử dụng cho các phần tử thay thế nhau (thường dùng `v-if` / `v-else`).
- **Transition với `key`**: Ép Vue render lại và kích hoạt transition ngay cả khi cùng một loại phần tử.

```html
<Transition mode="out-in">
  <span :key="count">{{ count }}</span>
</Transition>
```

---

## 14. Tổng kết nhanh 🎯

| Nội dung | Quy tắc ghi nhớ |
| :--- | :--- |
| **`<Transition>`** | Tạo animation khi phần tử vào hoặc ra khỏi DOM |
| **CSS Transition** | Phổ biến, nhẹ nhàng và dễ triển khai |
| **CSS Animation** | Dùng cho các hiệu ứng phức tạp với `@keyframes` |
| **JS Hooks** | Dùng khi cần toàn quyền điều khiển bằng mã lệnh |
| **`mode`** | Rất quan trọng để tối ưu trải nghiệm thay đổi nội dung |
| **`key`** | Bắt buộc nếu muốn tạo hiệu ứng khi cùng một element thay đổi giá trị |
