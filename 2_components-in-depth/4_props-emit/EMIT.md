Dưới đây là tóm tắt đầy đủ – chi tiết – dễ hiểu bài học Component Events (Sự kiện trong Component) của Vue 3, kèm ví dụ minh họa cho từng phần dựa đúng nội dung trang bạn đang xem.

# 1. Component Events là gì?

Component Events là cơ chế giúp component con (child) gửi tín hiệu (event) lên component cha (parent) để thông báo rằng một hành động nào đó đã xảy ra (click, submit, thay đổi dữ liệu…).

👉 Mục đích chính:
- Giao tiếp từ con → cha
- Giữ component độc lập, dễ tái sử dụng
- Tránh thao tác trực tiếp dữ liệu của cha

# 2. Emit và lắng nghe sự kiện (Emitting & Listening to Events)

## 2.1 Emit sự kiện trong component con

Trong template của component con, dùng `$emit()` để phát sự kiện.

**Ví dụ (Component con):**

```html
<!-- MyComponent.vue -->
<template>
  <button @click="$emit('someEvent')">
    Click Me
  </button>
</template>
```

Hoặc emit trong methods:

```js
export default {
  methods: {
    submit() {
      this.$emit('someEvent')
    }
  }
}
```

## 2.2 Lắng nghe sự kiện ở component cha

Component cha dùng `v-on` hoặc `@` để lắng nghe.

**Ví dụ (Component cha):**

```html
<MyComponent @some-event="callback" />
```

```js
methods: {
  callback() {
    console.log('Event received!')
  }
}
```

> 📌 **Lưu ý quan trọng**
> - Event emit dạng **camelCase**
> - Khi lắng nghe trong template → **kebab-case**

## 2.3 Modifier .once

Sự kiện chỉ chạy 1 lần duy nhất.

```html
<MyComponent @some-event.once="callback" />
```

# 3. Event không bubble (Rất quan trọng)

❌ Component event **KHÔNG bubble** như DOM event
✔ Chỉ component cha trực tiếp mới nghe được

👉 Nếu cần giao tiếp:
- Component anh em
- Component lồng sâu
➡ Dùng state management (Pinia, Vuex) hoặc event bus

# 4. Truyền dữ liệu qua Event (Event Arguments)

## 4.1 Emit kèm dữ liệu

Bạn có thể gửi dữ liệu khi emit.

**Ví dụ (Component con):**

```html
<button @click="$emit('increaseBy', 1)">
  Increase by 1
</button>
```

## 4.2 Nhận dữ liệu ở component cha

**Cách 1: Inline arrow function**
```html
<MyButton @increase-by="(n) => count += n" />
```

**Cách 2: Method**
```html
<MyButton @increase-by="increaseCount" />
```

```js
methods: {
  increaseCount(n) {
    this.count += n
  }
}
```

> 📌 **Tip**
> `$emit('foo', 1, 2, 3)`
> ➡ listener sẽ nhận đầy đủ tham số (1, 2, 3)

# 5. Khai báo sự kiện emit (Declaring Emitted Events)

👉 Vue khuyến nghị luôn khai báo các event mà component có thể emit

## 5.1 Dùng defineEmits() trong script setup

```html
<script setup>
const emit = defineEmits(['inFocus', 'submit'])

function buttonClick() {
  emit('submit')
}
</script>
```

> 📌 **Lưu ý:**
> - `defineEmits()` chỉ dùng trong `<script setup>`
> - Không đặt trong function

## 5.2 Dùng emits trong Options API

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, { emit }) {
    emit('submit')
  }
}
```

Hoặc chỉ khai báo:

```js
export default {
  emits: ['submit']
}
```

# 6. Emit + TypeScript (Khai báo kiểu dữ liệu)

## 6.1 Object syntax + validation

```html
<script setup lang="ts">
const emit = defineEmits({
  submit(payload: { email: string, password: string }) {
    return !!(payload.email && payload.password)
  }
})
</script>
```

## 6.2 Khai báo bằng type thuần

```html
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```

# 7. Validation cho Event

Giống như validate props, bạn có thể kiểm tra dữ liệu emit.

**Ví dụ:**

```html
<script setup>
const emit = defineEmits({
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    }
    console.warn('Invalid submit payload')
    return false
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
</script>
```

> 📌 Nếu validation trả về false → Vue cảnh báo

# 8. Lợi ích khi khai báo emits

✔ Document rõ ràng component
✔ Tránh lỗi khi listener bị rơi vào DOM event
✔ Vue loại bỏ event khỏi fallthrough attributes

> ⚠️ **Lưu ý đặc biệt**
> Nếu bạn khai báo:
> `emits: ['click']`
> ➡ `@click` chỉ lắng nghe event emit, KHÔNG bắt DOM click nữa

# 9. Tóm tắt nhanh (Cheat Sheet)

| Nội dung | Ghi nhớ |
| :--- | :--- |
| **Emit event** | `$emit('eventName', data)` |
| **Lắng nghe** | `@event-name="handler"` |
| **Case** | Emit camelCase → Listen kebab-case |
| **Truyền dữ liệu** | `$emit('event', payload)` |
| **Khai báo event** | `defineEmits()` hoặc `emits` |
| **Event bubble** | ❌ Không bubble |
| **Validate** | Dùng object syntax |