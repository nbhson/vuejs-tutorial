Dưới đây là bản tóm tắt đầy đủ – chi tiết – dễ hiểu bài học Template Refs trong Vue 3, kèm ví dụ minh họa cho từng phần, dựa đúng theo nội dung trang bạn đang xem.

# 🧩 Template Refs trong Vue 3

# 1. Template Ref là gì? Dùng khi nào?

Template Ref cho phép bạn truy cập trực tiếp DOM element hoặc instance của component con sau khi component được mount.

👉 Bình thường Vue khuyến khích bạn dùng data / props / emits.
👉 Nhưng Template Refs cần thiết khi:

- Focus input
- Đo kích thước DOM
- Tích hợp thư viện bên thứ 3 (chart, map, editor…)
- Gọi method của component con (trường hợp đặc biệt)

**Ví dụ template ref cơ bản:**

```html
<input ref="input" />
```

# 2. Truy cập Template Ref với Composition API (Vue ≥ 3.5)

Vue 3.5 giới thiệu helper `useTemplateRef()` (cách chuẩn & gọn nhất).

**Ví dụ: focus input khi component mount**

```html
<script setup>
import { useTemplateRef, onMounted } from 'vue'

const input = useTemplateRef('my-input')

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="my-input" />
</template>
```

> 📌 Lưu ý:
>
> - `'my-input'` phải trùng với giá trị `ref` trong template
> - `input.value` chính là DOM element
> - TypeScript sẽ tự infer kiểu (`HTMLInputElement`)

# 3. Template Ref trước Vue 3.5 (cách cũ)

Nếu dùng Vue < 3.5, bạn phải tự khai báo `ref()`.

**Ví dụ với `<script setup>`**

```html
<script setup>
import { ref, onMounted } from 'vue'

const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```

**Nếu KHÔNG dùng `<script setup>`**

```js
export default {
  setup() {
    const input = ref(null)
    return { input }
  }
}
```

# 4. Template Ref trong Options API (this.$refs)

Vue sẽ gom tất cả template refs vào `this.$refs`.

**Ví dụ:**

```html
<script>
export default {
  mounted() {
    this.$refs.input.focus()
  }
}
</script>

<template>
  <input ref="input" />
</template>
```

> ⚠️ Chỉ dùng được sau khi mounted

# 5. Lưu ý quan trọng khi dùng Template Refs

❌ Không truy cập được ngay khi render

```html
{{ $refs.input }} <!-- undefined ở lần render đầu -->
```

👉 Vì DOM chưa tồn tại trước khi mounted

✅ Theo dõi ref an toàn với `watchEffect`

```js
watchEffect(() => {
  if (input.value) {
    input.value.focus()
  }
})
```

✔ Xử lý được:

- Chưa mount
- Bị unmount (`v-if`)

# 6. Ref dùng cho Component Con

**Ví dụ: ref vào component con**

```html
<script setup>
import { useTemplateRef, onMounted } from 'vue'
import Child from './Child.vue'

const childRef = useTemplateRef('child')

onMounted(() => {
  console.log(childRef.value)
})
</script>

<template>
  <Child ref="child" />
</template>
```

> 📌 `childRef.value` là instance của component con

# 7. defineExpose() – expose API cho component con (script setup)

Mặc định, component dùng `<script setup>` là private.

👉 Muốn cho cha truy cập → dùng `defineExpose`

**Ví dụ trong `Child.vue`**

```html
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

defineExpose({
  a,
  b
})
</script>
```

👉 Component cha nhận được:

```js
{ a: 1, b: 2 }
```

> ⚠️ `defineExpose()` phải gọi trước `await`

# 8. Hạn chế truy cập component con với expose (Options API)

```js
export default {
  expose: ['publicData', 'publicMethod'],
  data() {
    return {
      publicData: 'foo',
      privateData: 'bar'
    }
  },
  methods: {
    publicMethod() {},
    privateMethod() {}
  }
}
```

👉 Cha chỉ truy cập được:

- `publicData`
- `publicMethod`

# 9. Template Ref bên trong v-for (Vue ≥ 3.5)

Khi dùng `ref` trong `v-for`, ref sẽ là một mảng

**Ví dụ:**

```html
<script setup>
import { ref, useTemplateRef, onMounted } from 'vue'

const list = ref([1, 2, 3])
const itemRefs = useTemplateRef('items')

onMounted(() => {
  console.log(itemRefs.value)
})
</script>

<template>
  <ul>
    <li v-for="item in list" ref="items">
      {{ item }}
    </li>
  </ul>
</template>
```

> 📌 `itemRefs.value` → `Array<HTMLElement>`
>
> ⚠️ Không đảm bảo thứ tự giống mảng dữ liệu

# 10. v-for trước Vue 3.5

```html
<script setup>
import { ref, onMounted } from 'vue'

const list = ref([1, 2, 3])
const itemRefs = ref([])

onMounted(() => {
  console.log(itemRefs.value)
})
</script>

<template>
  <li v-for="item in list" ref="itemRefs">{{ item }}</li>
</template>
```

# 11. Function Refs – ref bằng hàm

Thay vì string, bạn có thể dùng function

**Ví dụ:**

```html
<input :ref="(el) => {
  if (el) {
    console.log('mounted', el)
  } else {
    console.log('unmounted')
  }
}" />
```

> 📌 Khi:
>
> - mount → `el` là DOM element
> - unmount → `el = null`

👉 Dùng khi cần toàn quyền kiểm soát ref

# 12. Khi nào NÊN / KHÔNG NÊN dùng Template Refs?

## ✅ Nên dùng khi:

- Focus input
- Đo kích thước DOM
- Tích hợp thư viện ngoài
- Gọi method component con (bất khả kháng)

## ❌ Không nên dùng khi:

- Có thể giải quyết bằng props, emit, v-model
- Logic dữ liệu thuần (nên dùng reactivity)

# 🎯 Tóm tắt nhanh

| Nội dung | Ghi nhớ |
| :--- | :--- |
| **Template Ref** | Truy cập DOM / component instance |
| **Vue ≥ 3.5** | Dùng `useTemplateRef()` |
| **Vue < 3.5** | Dùng `ref(null)` |
| **Component con** | Dùng `defineExpose()` |
| **v-for** | Ref → mảng |
| **Best practice** | Dùng khi thật sự cần |