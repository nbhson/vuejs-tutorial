Dưới đây là bản tóm tắt đầy đủ – chi tiết – dễ hiểu bài học Props trong Vue 3, kèm ví dụ minh họa cho từng phần 👇

# 1. Props là gì?

Props là cách truyền dữ liệu từ component cha xuống component con trong Vue.

👉 Props giúp component:
- Tái sử dụng được
- Không phụ thuộc cứng vào dữ liệu bên trong
- Dễ bảo trì và mở rộng

> 🔑 **Nguyên tắc quan trọng:**
> Props là **one-way data flow** (dữ liệu chỉ đi từ cha → con).

# 2. Khai báo Props (Props Declaration)

## 2.1. Khai báo props với `<script setup>`

```html
<script setup>
const props = defineProps(['title'])
console.log(props.title)
</script>
```

✔ Dùng `defineProps()`
✔ Phổ biến nhất trong Vue 3

## 2.2. Khai báo props với Options API

```js
export default {
  props: ['title'],
  created() {
    console.log(this.title)
  }
}
```

## 2.3. Khai báo props bằng object (có kiểu dữ liệu)

```js
defineProps({
  title: String,
  likes: Number
})
```

📌 Lợi ích:
- Tự document code
- Vue cảnh báo nếu truyền sai kiểu

## 2.4. Khai báo props bằng TypeScript

```html
<script setup lang="ts">
defineProps<{
  title?: string
  likes?: number
}>()
</script>
```

✔ Rất phù hợp khi dùng Vue + TypeScript

# 3. Reactive Props & Destructure

## 3.1. Truy cập trực tiếp props

```js
const props = defineProps(['foo'])

watchEffect(() => {
  console.log(props.foo)
})
```

✔ `props.foo` luôn reactive

## 3.2. Destructure props (Vue 3.5+)

```js
const { foo } = defineProps(['foo'])

watchEffect(() => {
  console.log(foo)
})
```

📌 Vue 3.5+ tự động chuyển `foo` → `props.foo`

## 3.3. Gán giá trị mặc định khi destructure

```ts
const { foo = 'hello' } = defineProps<{ foo?: string }>()
```

# 4. Truyền props đã destructure vào hàm

❌ **Sai – mất reactivity**

```js
const { foo } = defineProps(['foo'])
watch(foo, () => {}) // ❌
```

✔ **Đúng – giữ reactivity**

```js
watch(() => foo, () => {})
```

✔ Khi dùng composable:

```js
useComposable(() => foo)
```

# 5. Quy tắc đặt tên Props (Prop Name Casing)

## 5.1. Khai báo trong component

```js
defineProps({
  greetingMessage: String
})
```

## 5.2. Dùng trong template

```html
<MyComponent greeting-message="hello" />
```

📌 Quy ước:
- Khai báo: **camelCase**
- Khi truyền: **kebab-case**

# 6. Static Props vs Dynamic Props

## 6.1. Static

```html
<BlogPost title="Hello Vue" />
```

## 6.2. Dynamic

```html
<BlogPost :title="post.title" />
<BlogPost :title="post.title + ' by ' + author" />
```

# 7. Truyền các kiểu dữ liệu khác nhau

## 7.1. Number

```html
<BlogPost :likes="42" />
```

## 7.2. Boolean

```html
<BlogPost is-published />
<BlogPost :is-published="false" />
```

## 7.3. Array

```html
<BlogPost :comment-ids="[1, 2, 3]" />
```

## 7.4. Object

```html
<BlogPost :author="{ name: 'John', age: 30 }" />
```

# 8. Truyền nhiều props bằng object

```html
<BlogPost v-bind="post" />
```

Tương đương:

```html
<BlogPost :id="post.id" :title="post.title" />
```

# 9. One-Way Data Flow (Rất quan trọng)

❌ Không được sửa props trong component con

```js
props.foo = 'bar' // ❌
```

✔ **Cách đúng – tạo state riêng**

```js
const counter = ref(props.initialCounter)
```

✔ **Cách đúng – computed**

```js
const normalizedSize = computed(() => props.size.toLowerCase())
```

# 10. Mutating Object / Array Props

```js
props.user.name = 'New Name' // ⚠️ vẫn chạy
```

⚠️ Nguy hiểm vì:
- Làm thay đổi state của component cha
- Khó debug

✔ **Best practice:**
➡ Emit event để cha xử lý

```js
emit('update-user', newUser)
```

# 11. Prop Validation (Ràng buộc props)

```js
defineProps({
  propA: Number,
  propB: [String, Number],
  propC: {
    type: String,
    required: true
  },
  propE: {
    type: Number,
    default: 100
  },
  propG: {
    validator(value) {
      return ['success', 'warning', 'danger'].includes(value)
    }
  }
})
```

📌 Ghi nhớ:
- Props optional mặc định
- Boolean không truyền → `false`
- Object / Array default phải là function

# 12. Runtime Type Checks

Các kiểu hỗ trợ:
- String, Number, Boolean
- Array, Object
- Date, Function
- Custom class

```js
class Person {}

defineProps({
  author: Person
})
```

# 13. Nullable Props

```js
defineProps({
  id: {
    type: [String, null],
    required: true
  }
})
```

# 14. Boolean Casting

```html
<MyComponent disabled />
<MyComponent />
```

```js
defineProps({
  disabled: Boolean
})
```

📌 Lưu ý thứ tự:
- `disabled: [Boolean, String]` // Boolean ưu tiên
- `disabled: [String, Boolean]` // String ưu tiên

# 15. Tổng kết nhanh

✔ Props dùng để truyền dữ liệu từ cha → con
✔ Props là readonly
✔ Không mutate props
✔ Nên validate props
✔ Luôn tuân theo one-way data flow