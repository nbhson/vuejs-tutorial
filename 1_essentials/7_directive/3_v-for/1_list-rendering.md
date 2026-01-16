Dưới đây là tóm tắt đầy đủ – chi tiết – dễ hiểu bài List Rendering (v-for) trong Vue 3, kèm ví dụ minh họa cho từng phần, dựa đúng nội dung trang bạn đang xem.

# 1. v-for – Render danh sách từ mảng

## Khái niệm

`v-for` dùng để lặp qua một mảng và render phần tử tương ứng.

Cú pháp cơ bản:

```html
v-for="item in items"
```

## Ví dụ

```js
const items = ref([
  { message: 'Foo' },
  { message: 'Bar' }
])
```

```html
<li v-for="item in items">
  {{ item.message }}
</li>
```

> 👉 Kết quả:
>
> Foo
> Bar

# 2. Truy cập index trong v-for

## Khái niệm

`v-for` hỗ trợ tham số thứ hai là `index` (vị trí phần tử).

## Ví dụ

```html
<li v-for="(item, index) in items">
  {{ index }} - {{ item.message }}
</li>
```

> 👉 Kết quả:
>
> 0 - Foo
> 1 - Bar

# 3. Phạm vi biến (Scope) trong v-for

## Khái niệm

Bên trong `v-for`:

- Truy cập được biến cha
- Biến `item`, `index` chỉ tồn tại trong vòng lặp

Tương đương JavaScript:

```js
items.forEach((item, index) => {
  console.log(item.message, index)
})
```

# 4. Destructuring trong v-for

## Khái niệm

Có thể destructuring object giống như tham số hàm JS.

## Ví dụ

```html
<li v-for="{ message } in items">
  {{ message }}
</li>
```

Hoặc có index:

```html
<li v-for="({ message }, index) in items">
  {{ index }} - {{ message }}
</li>
```

# 5. v-for lồng nhau (Nested loop)

## Khái niệm

`v-for` bên trong vẫn truy cập được scope bên ngoài.

## Ví dụ

```html
<li v-for="item in items">
  <span v-for="child in item.children">
    {{ item.message }} - {{ child }}
  </span>
</li>
```

# 6. in và of trong v-for

## Khái niệm

- `in` và `of` tương đương nhau
- `of` giống cú pháp JavaScript hơn

```html
<div v-for="item of items"></div>
```

# 7. v-for với Object

## Khái niệm

- Có thể lặp qua giá trị, key, và index
- Thứ tự dựa trên `Object.values()`

## Ví dụ

```js
const myObject = reactive({
  title: 'Vue Lists',
  author: 'Jane Doe',
  year: 2024
})
```

```html
<li v-for="value in myObject">
  {{ value }}
</li>
```

Có key:

```html
<li v-for="(value, key) in myObject">
  {{ key }}: {{ value }}
</li>
```

Có index:

```html
<li v-for="(value, key, index) in myObject">
  {{ index }} - {{ key }}: {{ value }}
</li>
```

# 8. v-for với Range (số nguyên)

## Khái niệm

Lặp từ 1 → n (không phải từ 0)

## Ví dụ

```html
<span v-for="n in 5">{{ n }}</span>
```

> 👉 Kết quả:
>
> 1 2 3 4 5

# 9. v-for trên thẻ template

## Khái niệm

- Dùng khi muốn render nhiều phần tử cùng lúc
- `<template>` không render ra DOM

## Ví dụ

```html
<ul>
  <template v-for="item in items">
    <li>{{ item.message }}</li>
    <li class="divider"></li>
  </template>
</ul>
```

# 10. v-for kết hợp với v-if (⚠️ Quan trọng)

## Nguyên tắc

- `v-if` chạy trước `v-for`
- Không nên đặt cả hai trên cùng một element

❌ Sai:

```html
<li v-for="todo in todos" v-if="!todo.done">
```

✅ Đúng:

```html
<template v-for="todo in todos">
  <li v-if="!todo.done">{{ todo.name }}</li>
</template>
```

## Best Practice

Lọc dữ liệu bằng `computed`

```js
const activeTodos = computed(() =>
  todos.value.filter(t => !t.done)
)
```

# 11. key – Duy trì trạng thái danh sách

## Khái niệm

`key` giúp Vue:

- Theo dõi đúng phần tử
- Không làm mất state (input, component…)

## Ví dụ

```html
<div v-for="item in items" :key="item.id">
  {{ item.message }}
</div>
```

> ⚠️ Lưu ý:
>
> - `key` phải là string hoặc number
> - Không dùng object làm `key`

# 12. v-for với Component

## Khái niệm

- Component không tự nhận item
- Phải truyền qua props

## Ví dụ

```html
<TodoItem
  v-for="(todo, index) in todos"
  :key="todo.id"
  :todo="todo"
  :index="index"
/>
```

# 13. Vue & Array Change Detection

Vue theo dõi được các method sau:

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

# 14. Thay thế mảng (Non-mutating methods)

## Ví dụ

```js
items.value = items.value.filter(item =>
  item.message.includes('Foo')
)
```

> 👉 Vue không render lại toàn bộ, mà tái sử dụng DOM thông minh.

# 15. Hiển thị danh sách lọc / sắp xếp

Dùng `computed`

```js
const evenNumbers = computed(() =>
  numbers.value.filter(n => n % 2 === 0)
)
```

```html
<li v-for="n in evenNumbers">{{ n }}</li>
```

⚠️ Cẩn thận với `sort()` & `reverse()`

```js
// Sai
numbers.reverse()

// Đúng
[...numbers].reverse()
```

# Tóm tắt nhanh (cheat-sheet)

| Trường hợp | Cách làm |
| :--- | :--- |
| **Render list** | `v-for="item in items"` |
| **Dùng index** | `(item, index)` |
| **Object** | `(value, key, index)` |
| **Lọc dữ liệu** | `computed` |
| **Kết hợp v-if** | Dùng `<template>` |
| **Giữ state** | `:key` |
| **Component** | Truyền props |

