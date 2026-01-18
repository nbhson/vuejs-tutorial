Dưới đây là tóm tắt đầy đủ – chi tiết – dễ hiểu bài học Fallthrough Attributes (Thuộc tính kế thừa) trong Vue 3, kèm ví dụ minh họa cho từng phần 👇

# 1. Fallthrough Attributes là gì?

Fallthrough attributes là những attribute hoặc event được truyền vào component nhưng KHÔNG được khai báo trong:
- `props`
- `emits`

👉 Ví dụ thường gặp: `class`, `style`, `id`, `@click`, `@focus`, …

Khi component chỉ có 1 root element, các fallthrough attributes này sẽ tự động gắn vào root element đó.

**Ví dụ:**

**Component con:**

```html
<!-- MyButton.vue -->
<template>
  <button>Click Me</button>
</template>
```

**Component cha:**

```html
<MyButton class="large" />
```

**DOM sau khi render:**

```html
<button class="large">Click Me</button>
```

➡️ `class="large"` không phải prop ⇒ được coi là fallthrough attribute.

# 2. Gộp (merge) class và style

Nếu root element đã có `class` hoặc `style`, Vue sẽ tự động gộp với attribute truyền từ component cha.

**Ví dụ:**

**Component con:**

```html
<template>
  <button class="btn">Click Me</button>
</template>
```

**Component cha:**

```html
<MyButton class="large" />
```

**DOM render:**

```html
<button class="btn large">Click Me</button>
```

➡️ Vue không ghi đè, mà gộp class.

# 3. Kế thừa event (v-on listener)

Event listener (`@click`, `@input`, …) cũng là fallthrough attribute.

**Ví dụ:**

**Component cha:**

```html
<MyButton @click="handleClick" />
```

**Component con:**

```html
<template>
  <button>Click Me</button>
</template>
```

➡️ Khi click vào `<button>`, `handleClick` ở component cha sẽ được gọi.

🔹 Nếu component con đã có `@click`, thì:
- Cả hai đều chạy.

# 4. Kế thừa qua component lồng nhau (Nested Component)

Nếu root element của component là một component khác, fallthrough attributes sẽ được chuyển tiếp (forward).

**Ví dụ:**

**MyButton.vue:**

```html
<template>
  <BaseButton />
</template>
```

**Sử dụng:**

```html
<MyButton class="large" />
```

➡️ `class="large"` sẽ được chuyển sang `<BaseButton>`.

> [!IMPORTANT]
> - Props / emits đã khai báo ở `MyButton` sẽ bị “tiêu thụ”.
> - Chỉ những attribute không khai báo mới được forward.

# 5. Tắt kế thừa attribute (`inheritAttrs: false`)

Mặc định Vue tự động kế thừa.
Nếu bạn muốn tự kiểm soát attribute gắn vào đâu ⇒ tắt đi.

**Cách 1: Options API**
```js
export default {
  inheritAttrs: false
}
```

**Cách 2: `<script setup>` (Vue 3.3+)**
```html
<script setup>
defineOptions({
  inheritAttrs: false
})
</script>
```

# 6. Dùng `$attrs` để gắn attribute thủ công

`$attrs` chứa toàn bộ fallthrough attributes.

**Ví dụ thực tế:**

Yêu cầu:
- Bọc button bằng `<div>`
- Attribute từ cha (`class`, `@click`) phải gắn vào `<button>`

**Component con:**

```html
<template>
  <div class="btn-wrapper">
    <button class="btn" v-bind="$attrs">
      Click Me
    </button>
  </div>
</template>
```

➡️ `v-bind="$attrs"` sẽ gắn tất cả attribute vào `<button>`.

# 7. Lưu ý khi dùng `$attrs`

- Attribute giữ nguyên casing: `$attrs['foo-bar']`
- Event `@click` sẽ thành: `$attrs.onClick`
- `$attrs` KHÔNG reactive:
    - Không dùng `watch`.
    - Muốn reactive ⇒ dùng `props`.

# 8. Component có nhiều root node

❌ **KHÔNG tự động fallthrough.**

**Ví dụ gây warning:**
```html
<template>
  <header />
  <main />
  <footer />
</template>
```

**Sử dụng:**
```html
<CustomLayout id="layout" />
```

➡️ Vue không biết gắn `id` vào đâu ⇒ warning.

**Cách sửa (bind thủ công):**
```html
<template>
  <header />
  <main v-bind="$attrs" />
  <footer />
</template>
```

# 9. Truy cập fallthrough attributes trong JavaScript

**Với `<script setup>`:**
```html
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
console.log(attrs)
</script>
```

**Với `setup()`:**
```js
export default {
  setup(props, ctx) {
    console.log(ctx.attrs)
  }
}
```

**Với Options API:**
```js
export default {
  created() {
    console.log(this.$attrs)
  }
}
```

> [!WARNING]
> `attrs` luôn cập nhật nhưng không reactive.

# 10. Tóm tắt nhanh (cheat sheet)

| Trường hợp | Hành vi |
| :--- | :--- |
| **1 root node** | Auto fallthrough |
| **`class`, `style`** | Tự động merge |
| **Event listener** | Kế thừa & chạy song song |
| **Root là component khác** | Forward attribute |
| **Nhiều root node** | ❌ Không auto |
| **`inheritAttrs: false`** | Chủ động kiểm soát |
| **`$attrs`** | Toàn bộ attribute không khai báo |