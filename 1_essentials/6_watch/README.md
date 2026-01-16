Dưới đây là bản tóm tắt đầy đủ – chi tiết – dễ hiểu bài Watchers (Vue 3), kèm ví dụ minh họa cho từng phần, dựa đúng theo nội dung trang Vue chính thức bạn đang xem.

# 1. Watchers là gì? Dùng khi nào?

## Khái niệm

Watchers dùng để theo dõi sự thay đổi của dữ liệu reactive và thực hiện side effects (tác động phụ) khi dữ liệu đó thay đổi.

Side effects thường là:

- Gọi API
- Cập nhật state khác
- Thao tác DOM
- Ghi log, debounce, throttle…

## Khi nào dùng watcher?

- Khi computed không phù hợp (computed chỉ dùng để trả về giá trị).
- Khi bạn cần thực thi logic khi dữ liệu thay đổi (đặc biệt là async).

# 2. Watcher với Options API (watch option)

## Cách dùng

- Khai báo trong `watch`
- Key là tên biến reactive
- Value là function được gọi khi biến thay đổi

## Ví dụ

```js
export default {
  data() {
    return {
      question: '',
      answer: 'Questions usually contain a question mark.'
    }
  },
  watch: {
    question(newVal, oldVal) {
      if (newVal.includes('?')) {
        this.answer = 'You asked a question!'
      }
    }
  }
}
```

> 📌 newVal: giá trị mới
> 📌 oldVal: giá trị cũ

# 3. Watcher với Composition API (watch())

## Cú pháp

```js
watch(source, callback, options?)
```

- `source`: ref / reactive / getter / array
- `callback`: hàm chạy khi source đổi

## Ví dụ cơ bản

```js
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newVal, oldVal) => {
  console.log(newVal, oldVal)
})
```

# 4. Các loại Watch Source

## 4.1 Watch một ref

```js
watch(count, (newVal) => {
  console.log(newVal)
})
```

## 4.2 Watch bằng getter (phổ biến & an toàn)

```js
watch(
  () => obj.count,
  (count) => {
    console.log(count)
  }
)
```

❌ Sai (KHÔNG hoạt động):

```js
watch(obj.count, () => {})
```

## 4.3 Watch nhiều nguồn (array)

```js
watch(
  [x, () => y.value],
  ([newX, newY]) => {
    console.log(newX, newY)
  }
)
```

# 5. Deep Watchers (watch sâu)

## Mặc định

- Watcher chỉ trigger khi object bị thay thế
- ❌ Không trigger khi property bên trong thay đổi

## 5.1 Deep watcher với Options API

```js
watch: {
  user: {
    handler(newVal) {
      console.log(newVal)
    },
    deep: true
  }
}
```

## 5.2 Deep watcher với Composition API

```js
watch(
  () => state.user,
  () => {
    console.log('user changed')
  },
  { deep: true }
)
```

> ⚠️ Cảnh báo hiệu năng
>
> - Deep watch rất tốn tài nguyên
> - Chỉ dùng khi thật sự cần

# 6. Eager Watchers (immediate)

## Mặc định

Watcher chỉ chạy khi dữ liệu thay đổi

`immediate: true`

Chạy ngay khi component được tạo

```js
watch(
  id,
  () => {
    fetchData()
  },
  { immediate: true }
)
```

> 📌 Thường dùng để:
>
> - Fetch dữ liệu ban đầu
> - Đồng bộ state ngay từ đầu

# 7. Once Watchers (once: true) – Vue 3.4+

Chỉ chạy 1 lần duy nhất

```js
watch(
  source,
  () => {
    console.log('chạy 1 lần')
  },
  { once: true }
)
```

# 8. watchEffect()

## Ý tưởng

- Tự động theo dõi dependency
- Không cần chỉ định source

## Ví dụ

```js
watchEffect(async () => {
  const res = await fetch(`/api/${id.value}`)
  data.value = await res.json()
})
```

> 📌
>
> - Chạy ngay lập tức
> - Tự động re-run khi dependency thay đổi

## So sánh watch vs watchEffect

| watch | watchEffect |
| :--- | :--- |
| Cần source rõ ràng | Tự động detect |
| Kiểm soát chính xác | Code ngắn gọn |
| Không auto run | Auto run |

🧠 So sánh với watch()

Nếu bạn muốn theo dõi chính xác một biến, hãy dùng watch:

```js
watch(id, async () => {
  const res = await fetch(`/api/${id.value}`)
  data.value = await res.json()
})
```

✔ Rõ ràng
✔ Không bị hiểu nhầm dependency
✔ An toàn với async

🔑 Kết luận ngắn gọn

🔹 watchEffect chỉ phụ thuộc vào reactive state được READ
🔹 Trong ví dụ này, dependency duy nhất là id.value
🔹 data.value KHÔNG làm watchEffect re-run

# 9. Cleanup side effects (hủy tác vụ cũ)

## Vấn đề

API cũ trả về sau khi state đã đổi → dữ liệu sai

## Giải pháp với onCleanup

```js
watch(id, (newId, oldId, onCleanup) => {
  const controller = new AbortController()

  fetch(`/api/${newId}`, { signal: controller.signal })

  onCleanup(() => {
    controller.abort()
  })
})
```

> 📌 Rất quan trọng khi làm async

# 10. Thời điểm chạy watcher (flush)

## Mặc định

Chạy trước khi DOM cập nhật

## `flush: 'post'` – sau DOM update

```js
watch(source, () => {
  console.log('DOM đã update')
}, { flush: 'post' })
```

## `flush: 'sync'` – chạy ngay lập tức

```js
watch(source, () => {
  console.log('sync')
}, { flush: 'sync' })
```

> ⚠️ Không batching → dễ gây lag

# 11. $watch() – tạo watcher thủ công

```js
created() {
  const unwatch = this.$watch('count', (val) => {
    console.log(val)
  })

  unwatch() // dừng watcher
}
```

> 📌 Dùng khi:
>
> - Watch có điều kiện
> - Watch theo hành động người dùng

# 12. Dừng Watcher & Memory Leak

## Tự động dừng

- Watch khai báo trong `setup()` → tự dừng khi unmount

## Watch tạo async → phải dừng thủ công

```js
const stop = watchEffect(() => {})

stop()
```

❌ Không nên:

```js
setTimeout(() => {
  watchEffect(() => {})
}, 100)
```

# 13. Best Practices (khuyến nghị)

✅ Dùng `watch` khi:

- Cần kiểm soát chính xác
- Logic phức tạp

✅ Dùng `watchEffect` khi:

- Nhiều dependency
- Code ngắn gọn

❌ Tránh:

- Deep watch không cần thiết
- Sync watcher với data lớn