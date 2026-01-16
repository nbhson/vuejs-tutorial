Dưới đây là bản tóm tắt đầy đủ – chi tiết – dễ hiểu bài học Components Basics (Vue 3), kèm ví dụ minh họa cho từng phần, dựa đúng theo nội dung trang bạn đang xem.

# 1. Component là gì? Tại sao cần Component?

## Khái niệm

- Component là các khối UI độc lập, có thể tái sử dụng.
- Ứng dụng Vue thường được tổ chức theo cây component (component tree).

Mỗi component:
- Có template (HTML)
- Có logic (JS)
- Có style (CSS) (tuỳ chọn)

👉 Giống HTML nhưng component có logic riêng, không chỉ là thẻ tĩnh.

# 2. Defining a Component (Định nghĩa Component)

## 2.1. Dùng Single File Component (SFC – .vue) (phổ biến nhất)

### Options API

```html
<!-- ButtonCounter.vue -->
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">
    You clicked me {{ count }} times.
  </button>
</template>
```

### Composition API (`<script setup>`)

```html
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">
    You clicked me {{ count }} times.
  </button>
</template>
```

> 📌 Khuyến nghị Vue 3: dùng `<script setup>` vì:
>
> - Gọn hơn
> - Ít boilerplate
> - Hiệu năng tốt hơn

## 2.2. Không dùng build step (Component dạng object JS)

```js
export default {
  data() {
    return { count: 0 }
  },
  template: `
    <button @click="count++">
      You clicked me {{ count }} times.
    </button>
  `
}
```

👉 Cách này ít dùng trong dự án lớn.

# 3. Using a Component (Sử dụng Component)

## 3.1. Import và đăng ký component (Options API)

```html
<script>
import ButtonCounter from './ButtonCounter.vue'

export default {
  components: {
    ButtonCounter
  }
}
</script>

<template>
  <h1>Here is a child component!</h1>
  <ButtonCounter />
</template>
```

## 3.2. Với `<script setup>` (tự động đăng ký)

```html
<script setup>
import ButtonCounter from './ButtonCounter.vue'
</script>

<template>
  <h1>Here is a child component!</h1>
  <ButtonCounter />
</template>
```

> 📌 Không cần `components: {}` nữa.

## 3.3. Tái sử dụng component

```html
<ButtonCounter />
<ButtonCounter />
<ButtonCounter />
```

➡️ Mỗi lần dùng = 1 instance riêng
➡️ State KHÔNG dùng chung

# 4. Quy tắc đặt tên Component

**Trong SFC (khuyến nghị)**

```html
<ButtonCounter />
```

- Dùng **PascalCase**

**Trong DOM template (HTML thuần)**

```html
<button-counter></button-counter>
```

- Bắt buộc **kebab-case**
- Phải có thẻ đóng

# 5. Passing Props (Truyền dữ liệu từ cha → con)

## 5.1. Props là gì?

- Props là thuộc tính tùy chỉnh
- Dùng để truyền dữ liệu từ component cha xuống component con

## 5.2. Khai báo props

**Options API**

```html
<script>
export default {
  props: ['title']
}
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

**`<script setup>`**

```html
<script setup>
defineProps(['title'])
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

## 5.3. Truyền props từ component cha

```html
<BlogPost title="My journey with Vue" />
```

## 5.4. Props động với v-bind

```html
<BlogPost :title="post.title" />
```

> 📌 Dùng khi dữ liệu thay đổi theo state.

## 5.5. Props + v-for

```html
<BlogPost
  v-for="post in posts"
  :key="post.id"
  :title="post.title"
/>
```

# 6. Listening to Events (Giao tiếp con → cha)

## 6.1. Vấn đề

- Props chỉ cha → con
- Muốn con báo ngược lại cho cha → dùng Custom Events

## 6.2. Emit event từ component con

```html
<template>
  <button @click="$emit('enlarge-text')">
    Enlarge text
  </button>
</template>
```

## 6.3. Cha lắng nghe event

```html
<BlogPost @enlarge-text="postFontSize += 0.1" />
```

## 6.4. Khai báo emits (khuyến nghị)

**`<script setup>`**

```html
<script setup>
defineEmits(['enlarge-text'])
</script>
```

**Options API**

```js
export default {
  emits: ['enlarge-text']
}
```

> 📌 Lợi ích:
>
> - Document rõ event
> - Validate event
> - Tránh lỗi không mong muốn

# 7. Slots (Truyền nội dung HTML)

## 7.1. Slot là gì?

- Cho phép truyền nội dung HTML từ cha vào con
- Giống `children` trong React

## 7.2. Sử dụng slot

**Component cha**

```html
<AlertBox>
  Something bad happened.
</AlertBox>
```

**Component con**

```html
<template>
  <div class="alert-box">
    <strong>Error!</strong>
    <slot />
  </div>
</template>
```

> 📌 `<slot />` = vị trí nội dung được chèn vào

# 8. Dynamic Components (Component động)

## 8.1. Khi nào dùng?

- Tab
- Switch view
- Wizard step

## 8.2. Cú pháp

```html
<component :is="currentTab" />
```

Hoặc:

```html
<component :is="tabs[currentTab]" />
```

> 📌 `:is` có thể là:
>
> - Tên component
> - Hoặc object component import vào

# 9. In-DOM Template Parsing Caveats (Lưu ý khi viết template trong HTML)

## 9.1. Case-insensitive

❌ Sai:

```html
<BlogPost postTitle="hello" />
```

✅ Đúng:

```html
<blog-post post-title="hello"></blog-post>
```

## 9.2. Không dùng self-closing

❌ Sai:

```html
<my-component />
```

✅ Đúng:

```html
<my-component></my-component>
```

## 9.3. Giới hạn vị trí thẻ (table, ul, select...)

❌ Sai:

```html
<table>
  <blog-post-row></blog-post-row>
</table>
```

✅ Đúng:

```html
<table>
  <tr is="vue:blog-post-row"></tr>
</table>
```

## 10 Tổng kết ngắn gọn (rất dễ nhớ)

- `computed` → Tính toán

- `watch` → Theo dõi thay đổi

- `watchEffect` → Theo dõi tự động

- `onMounted` → Bắt đầu

- `onUnmounted` → Dọn dẹp

> 💡 Lifecycle quyết định THỜI ĐIỂM
> 💡 computed / watch quyết định PHẢN ỨNG

# 11. Tổng kết nhanh

| Chủ đề | Ý chính |
| :--- | :--- |
| **Component** | Khối UI tái sử dụng |
| **Props** | Truyền dữ liệu cha → con |
| **Events** | Con → cha |
| **Slot** | Truyền nội dung HTML |
| **Dynamic component** | Component thay đổi theo state |
| **script setup** | Cách viết gọn & hiện đại |