Dưới đây là tóm tắt đầy đủ – chi tiết – dễ hiểu bài học Lifecycle Hooks (Vòng đời component) trong Vue 3, kèm ví dụ minh họa cho từng phần dựa đúng vào nội dung trang bạn đang xem.

# 1. Lifecycle Hooks là gì?

Lifecycle Hooks (các hook vòng đời) là những hàm đặc biệt mà Vue tự động gọi tại những thời điểm xác định trong vòng đời của một component.

👉 Khi một component được tạo ra, Vue sẽ:

- Khởi tạo dữ liệu (reactivity)
- Biên dịch template
- Gắn component vào DOM
- Cập nhật DOM khi dữ liệu thay đổi
- Gỡ component khỏi DOM

Tại mỗi giai đoạn, Vue cho phép bạn chèn code của mình vào thông qua lifecycle hooks.

> 📌 Mục đích:
>
> - Gọi API
> - Truy cập DOM
> - Gắn / hủy event listener
> - Dọn dẹp tài nguyên (timer, subscription…)

# 2. Cách đăng ký Lifecycle Hooks

Vue 3 hỗ trợ 2 API style:

- Composition API (khuyến nghị)
- Options API (phong cách cũ)

## 2.1. Composition API (`<script setup>`)

**Ví dụ với `onMounted`:**

```html
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log('Component đã được mount vào DOM')
})
</script>
```

> 📌 Hook `onMounted` chạy sau khi component render xong và DOM đã tồn tại.

## 2.2. Options API

```js
export default {
  mounted() {
    console.log('Component đã được mount vào DOM')
  }
}
```

> 📌 Hai cách trên hoàn toàn tương đương về chức năng.

# 3. Các Lifecycle Hooks quan trọng nhất

Vue có nhiều hook, nhưng 3 hook được dùng nhiều nhất là:

## 3.1. onMounted / mounted

**⏱ Khi nào chạy?**

- Sau khi component render lần đầu
- DOM đã tồn tại và có thể truy cập

**📌 Dùng khi nào?**

- Call API
- Truy cập DOM (ref)
- Khởi tạo thư viện JS (chart, map…)

**✅ Ví dụ:**

```html
<script setup>
import { ref, onMounted } from 'vue'

const count = ref(0)

onMounted(() => {
  console.log('Giá trị count ban đầu:', count.value)
})
</script>
```

## 3.2. onUpdated / updated

**⏱ Khi nào chạy?**

- Mỗi lần component re-render do dữ liệu thay đổi

**📌 Dùng khi nào?**

- Theo dõi DOM sau khi dữ liệu đổi
- Debug UI update

> ⚠️ Cẩn thận: chạy rất nhiều lần → không nên dùng cho logic nặng.

**✅ Ví dụ:**

```html
<script setup>
import { ref, onUpdated } from 'vue'

const count = ref(0)

onUpdated(() => {
  console.log('Component vừa được cập nhật, count =', count.value)
})
</script>
```

## 3.3. onUnmounted / unmounted

**⏱ Khi nào chạy?**

- Trước khi component bị gỡ khỏi DOM

**📌 Dùng khi nào?**

- Clear setInterval, setTimeout
- Remove event listener
- Hủy subscription / observer

**✅ Ví dụ:**

```html
<script setup>
import { onMounted, onUnmounted } from 'vue'

let timer

onMounted(() => {
  timer = setInterval(() => {
    console.log('Đang chạy...')
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
  console.log('Đã dọn dẹp timer')
})
</script>
```

# 4. Ngữ cảnh `this` trong Lifecycle Hooks

> ⚠️ Chỉ áp dụng với Options API

Lifecycle hooks được gọi với `this` trỏ đến component

**KHÔNG dùng arrow function nếu cần `this`**

❌ Sai:

```js
export default {
  mounted: () => {
    console.log(this) // undefined
  }
}
```

✅ Đúng:

```js
export default {
  mounted() {
    console.log(this) // component instance
  }
}
```

> 📌 Composition API không dùng `this`, nên không có vấn đề này.

# 5. Quy tắc quan trọng khi dùng Composition API

## 5.1. Hook phải được đăng ký đồng bộ (synchronous)

Vue chỉ liên kết hook với component nếu nó được gọi trực tiếp trong quá trình setup.

❌ Sai (hook nằm trong `setTimeout`):

```js
setTimeout(() => {
  onMounted(() => {
    console.log('Không chạy')
  })
}, 100)
```

✅ Đúng:

```js
onMounted(() => {
  console.log('Chạy bình thường')
})
```

## 5.2. Có thể gọi hook trong hàm ngoài setup

Miễn là call stack vẫn xuất phát từ `setup()`.

✅ Ví dụ đúng:

```js
function useLogger() {
  onMounted(() => {
    console.log('Mounted từ composable')
  })
}

export default {
  setup() {
    useLogger()
  }
}
```

> 📌 Điều này cho phép tạo composables tái sử dụng.

# 6. Sơ đồ vòng đời component (Lifecycle Diagram)

Sơ đồ trong bài thể hiện thứ tự tổng quát:

1. Create component
2. → `setup()`
3. → render
4. → `mounted`
5. → `updated` (nhiều lần)
6. → `unmounted`

> 📌 Không cần nhớ hết ngay, nhưng:
>
> - `mounted`: DOM sẵn sàng
> - `updated`: dữ liệu thay đổi
> - `unmounted`: dọn dẹp

# 7. Tổng kết nhanh (dễ nhớ)

| Hook | Khi nào chạy | Dùng để làm gì |
| :--- | :--- | :--- |
| `onMounted` | Sau khi render | Call API, truy cập DOM |
| `onUpdated` | Sau mỗi update | Theo dõi UI |
| `onUnmounted` | Trước khi bị xóa | Cleanup tài nguyên |