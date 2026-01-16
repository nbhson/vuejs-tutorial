Dưới đây là bản tóm tắt đầy đủ – chi tiết – dễ hiểu bài Event Handling (Xử lý sự kiện) trong Vue 3, kèm ví dụ minh họa cho từng phần, đúng theo nội dung trang bạn đang xem.

# 1. Event Handling là gì?

Event Handling là cách Vue lắng nghe và xử lý các sự kiện DOM (click, submit, keyup, scroll, …) do người dùng hoặc trình duyệt tạo ra.

👉 Vue dùng directive `v-on` (viết tắt là `@`) để bắt sự kiện.

**Cú pháp chung:**

```html
v-on:event="handler"
@click="handler"
```

# 2. Lắng nghe sự kiện (Listening to Events)

Ví dụ cơ bản:

```html
<button @click="doSomething">Click me</button>
```

> 📌 Khi người dùng click vào button → hàm `doSomething` được gọi.

# 3. Inline Handlers (Xử lý trực tiếp trong template)

## Khái niệm

- Viết JavaScript trực tiếp ngay trong template
- Dùng cho logic đơn giản

## Ví dụ

```html
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">Add 1</button>
  <p>Count is: {{ count }}</p>
</template>
```

> 📌 Mỗi lần click → `count` tăng lên → UI tự động cập nhật.

# 4. Method Handlers (Gọi hàm)

## Khái niệm

- Logic phức tạp → viết trong script
- Template chỉ gọi tên hàm

## Ví dụ (Composition API)

```html
<script setup>
import { ref } from 'vue'

const name = ref('Vue.js')

function greet(event) {
  alert(`Hello ${name.value}`)
  console.log(event.target.tagName)
}
</script>

<template>
  <button @click="greet">Greet</button>
</template>
```

> 📌 Vue tự động truyền DOM Event vào hàm.

# 5. Phân biệt Inline vs Method

Vue tự nhận diện:

| Kiểu viết | Loại |
| :--- | :--- |
| `greet` | **Method** |
| `count++` | **Inline** |
| `say('hi')` | **Inline** |
| `foo.bar` | **Method** |

# 6. Gọi method + truyền tham số

## Ví dụ

```html
<script setup>
function say(message) {
  alert(message)
}
</script>

<template>
  <button @click="say('hello')">Say hello</button>
  <button @click="say('bye')">Say bye</button>
</template>
```

> 📌 Khi cần truyền dữ liệu → phải gọi hàm trong inline handler.

# 7. Truy cập DOM Event trong Inline Handler

Cách 1: dùng `$event`

```html
<button @click="warn('Không thể submit', $event)">Submit</button>
```

Cách 2: arrow function

```html
<button @click="(e) => warn('Không thể submit', e)">Submit</button>
```

```js
function warn(message, event) {
  event.preventDefault()
  alert(message)
}
```

# 8. Event Modifiers (Bộ sửa đổi sự kiện)

Giúp giảm code DOM trong JS.

Các modifier phổ biến:

| Modifier | Ý nghĩa |
| :--- | :--- |
| `.stop` | `stopPropagation` |
| `.prevent` | `preventDefault` |
| `.self` | chỉ trigger khi click đúng element |
| `.once` | chỉ chạy 1 lần |
| `.capture` | capture mode |
| `.passive` | tối ưu scroll |

## Ví dụ

```html
<form @submit.prevent="onSubmit"></form>
<a @click.stop.prevent="doThat"></a>
<div @click.self="doThis"></div>
```

> 📌 Thứ tự modifier rất quan trọng
>
> `@click.prevent.self` ≠ `@click.self.prevent`

# 9. Key Modifiers (Phím bàn phím)

## Ví dụ

```html
<input @keyup.enter="submit" />
<input @keyup.page-down="onPageDown" />
```

> 📌 Vue kiểm tra `event.key`.

## Key aliases

- `.enter`
- `.esc`
- `.tab`
- `.space`
- `.up`, `.down`, `.left`, `.right`
- `.delete` (Delete + Backspace)

# 10. System Modifier Keys (Ctrl, Alt, Shift, Meta)

```html
<input @keyup.alt.enter="clear" />
<div @click.ctrl="doSomething">Click</div>
```

> 📌 meta:
>
> - macOS: ⌘
> - Windows: ⊞

# 11. .exact Modifier

Kiểm soát chính xác tổ hợp phím

```html
<!-- Ctrl (kể cả thêm phím) -->
<button @click.ctrl="onClick">Ctrl</button>

<!-- Chỉ Ctrl -->
<button @click.ctrl.exact="onCtrlClick">Chỉ Ctrl</button>

<!-- Không có phím phụ -->
<button @click.exact="onClick">Không có phím phụ</button>
```

# 12. Mouse Button Modifiers

| Modifier | Chuột |
| :--- | :--- |
| `.left` | nút chính |
| `.right` | chuột phải |
| `.middle` | nút giữa |

```html
<button @click.right="openMenu">Menu</button>
```

> 📌 Không phụ thuộc chuột thuận tay trái/phải.