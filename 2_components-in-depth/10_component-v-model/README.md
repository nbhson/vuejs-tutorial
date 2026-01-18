
You said:

tóm tắt nội dung bài học (đầy đủ, chi tiết, dễ hiểu) và cung cấp ví dụ cho từng phần
ChatGPT said:
Dưới đây là tóm tắt đầy đủ – chi tiết – dễ hiểu bài học Component v-model trong Vue 3, kèm ví dụ minh họa cho từng phần để bạn dễ nắm và áp dụng 👍

# 1. `v-model` trên Component là gì?

`v-model` dùng để liên kết dữ liệu hai chiều (two-way binding) giữa component cha (parent) và component con (child).
- Khi parent thay đổi dữ liệu → child cập nhật
- Khi child cập nhật dữ liệu → parent cũng thay đổi theo

👉 Rất hay dùng cho:
- Input custom (`<CustomInput />`)
- Form component
- Modal, checkbox, select, datepicker custom…

# 2. Cách dùng `v-model` trong Vue 3.4+ (khuyến nghị)

## 2.1. `defineModel()` – cách hiện đại & ngắn gọn nhất

**📌 Component con (`Child.vue`):**

```html
<script setup>
const model = defineModel()

function increment() {
  model.value++
}
</script>

<template>
  <div>Giá trị từ parent: {{ model }}</div>
  <button @click="increment">Tăng</button>
</template>
```

**📌 Component cha (`Parent.vue`):**

```html
<script setup>
import { ref } from 'vue'
import Child from './Child.vue'

const count = ref(0)
</script>

<template>
  <Child v-model="count" />
</template>
```

🔍 Giải thích:
- `defineModel()` trả về ref
- `model.value` luôn đồng bộ với biến ở parent
- Thay đổi ở child → parent tự cập nhật

# 3. Bọc input native bằng `v-model`

Rất phổ biến khi tạo component input riêng.

**📌 `Child.vue`:**

```html
<script setup>
const model = defineModel()
</script>

<template>
  <input v-model="model" />
</template>
```

**📌 `Parent.vue`:**

```html
<script setup>
import { ref } from 'vue'
import Child from './Child.vue'

const text = ref('')
</script>

<template>
  <Child v-model="text" />
  <p>{{ text }}</p>
</template>
```

👉 Input trong child thay đổi → text trong parent cũng đổi

# 4. `v-model` hoạt động “bên trong” như thế nào?

`defineModel()` thực chất được Vue biên dịch thành:
- prop: `modelValue`
- event: `update:modelValue`

**📌 Cách viết thủ công (trước Vue 3.4):**

```html
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
```

**📌 Khi parent viết:**
```html
<Child v-model="text" />
```

👉 Vue tự chuyển thành:
```html
<Child
  :modelValue="text"
  @update:modelValue="text = $event"
/>
```

# 5. Khai báo option cho `v-model`

Vì `defineModel()` tạo ra prop → bạn có thể cấu hình:

```js
const model = defineModel({ required: true })
```

Hoặc:

```js
const model = defineModel({ default: 0 })
```

> [!WARNING]
> - Nếu dùng `default` mà parent không truyền giá trị, có thể gây mất đồng bộ
> - Nên luôn đảm bảo parent có giá trị khởi tạo

# 6. `v-model` có tham số (Arguments)

Dùng khi muốn đặt tên khác cho model

**📌 Parent:**
```html
<MyComponent v-model:title="bookTitle" />
```

**📌 Child:**
```html
<script setup>
const title = defineModel('title')
</script>

<template>
  <input v-model="title" />
</template>
```

👉 Thay vì `modelValue` → Vue dùng:
- prop: `title`
- event: `update:title`

# 7. Multiple `v-model` (nhiều `v-model` trên 1 component)

**📌 Parent:**
```html
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>
```

**📌 Child:**
```html
<script setup>
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')
</script>

<template>
  <input v-model="firstName" />
  <input v-model="lastName" />
</template>
```
👉 Mỗi `v-model` tương ứng với 1 prop riêng

# 8. `v-model` Modifiers (tuỳ biến `.trim`, `.number`, …)

**📌 Parent:**
```html
<MyComponent v-model.capitalize="text" />
```

**📌 Child – đọc modifiers:**
```html
<script setup>
const [model, modifiers] = defineModel()

console.log(modifiers) // { capitalize: true }
</script>
```

**📌 Xử lý modifier bằng `set()`:**
```html
<script setup>
const [model, modifiers] = defineModel({
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})
</script>

<template>
  <input v-model="model" />
</template>
```
👉 Khi nhập "hello" → parent nhận "Hello"

# 9. Modifiers + Arguments

**📌 Parent:**
```html
<UserName
  v-model:first-name.capitalize="first"
  v-model:last-name.uppercase="last"
/>
```

**📌 Child:**
```html
<script setup>
const [firstName, firstNameModifiers] = defineModel('firstName')
const [lastName, lastNameModifiers] = defineModel('lastName')

console.log(firstNameModifiers) // { capitalize: true }
console.log(lastNameModifiers)  // { uppercase: true }
</script>
```

# 10. Tổng kết nhanh (cheat sheet)

| Trường hợp | Cách làm |
| :--- | :--- |
| **`v-model` cơ bản** | `const model = defineModel()` |
| **`v-model` có tên** | `defineModel('title')` |
| **Nhiều `v-model`** | `defineModel('firstName')`, `defineModel('lastName')` |
| **Modifier** | `const [model, modifiers] = defineModel()` |
| **Tùy biến giá trị** | `defineModel({ get, set })` |
| **Bọc input** | `<input v-model="model" />` |