# Pinia vs Vuex: Lựa chọn Quản lý State cho Vue 3

Dưới đây là bản tóm tắt đầy đủ – chi tiết – dễ hiểu bài học so sánh Pinia và Vuex trong Vue 3, giúp bạn xác định công cụ phù hợp cho dự án của mình. 👇

## 1. Vuex có dùng thay Pinia được không?

👉 **Có.**
👉 Vuex và Pinia cùng mục tiêu: quản lý state global.

| Tiêu chí | Vuex | Pinia |
| :--- | :--- | :--- |
| **Dùng cho Vue 3** | ⚠️ Có, nhưng đã lỗi thời | ✅ Khuyến nghị |
| **Trạng thái** | Global state | Global state |
| **Reactive** | Có | Có (native) |
| **Dùng được TS** | Khó | Rất tốt |
| **Boilerplate** | Nhiều | Ít |
| **Devtools** | Có | Có (tốt hơn) |

> 📌 **Pinia chính là “Vuex thế hệ mới”**

## 2. So sánh TƯ DUY sử dụng (rất quan trọng)

### Vuex (cũ – phức tạp)
`State → Mutation → Action → Commit → State`

👉 Mỗi thay đổi phải:
1. Viết **mutation**
2. Rồi **action**
3. Rồi **commit**

### Pinia (mới – trực tiếp & tự nhiên)
`State → Action → State`

👉 **Action được phép sửa state trực tiếp.**

## 3. Ví dụ SO SÁNH cùng 1 chức năng
🎯 **Mục tiêu:** Tăng giá trị `count`.

### ❌ Vuex

**`store/index.js`**
```js
import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    increment({ commit }) {
      commit('increment')
    }
  }
})
```

**Component:**
```html
<script setup>
import { useStore } from 'vuex'
const store = useStore()

store.dispatch('increment')
</script>
```
⛔ **Quá nhiều bước cho việc rất nhỏ.**

### ✅ Pinia

**`stores/counter.js`**
```js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++
    }
  }
})
```

**Component:**
```html
<script setup>
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
counter.increment()
</script>
```

✔️ Ngắn | ✔️ Dễ đọc | ✔️ Không mutation

## 4. Vuex và Pinia có TƯƠNG TỰ nhau không?

👉 **Có về ý tưởng:**
- Global state
- Dùng cho nhiều component
- Devtools hỗ trợ

👉 **Nhưng khác rất nhiều về cách dùng:**

| Điểm khác | Vuex | Pinia |
| :--- | :--- | :--- |
| **Mutation** | BẮT BUỘC | ❌ Không |
| **Module** | Phức tạp | Rất đơn giản |
| **TypeScript** | Khó | Native |
| **Tree-shaking** | ❌ | ✅ |
| **Dev DX** | Thấp | Cao |

## 5. Khi nào NÊN dùng Vuex?

Chỉ dùng Vuex khi:
- ✅ Dự án cũ đang dùng Vuex.
- ✅ Bạn phải maintain code legacy.
- ✅ Team chưa migrate được sang Pinia.

❌ **KHÔNG nên:**
- Bắt đầu project Vue 3 mới.
- Dự án học tập.
- App mới cần scale.

## 6. Vuex hiện tại có còn được phát triển không?

👉 **Không còn phát triển tính năng mới.**

**Vue team:**
- ❌ Không thêm feature mới cho Vuex.
- ✅ **Pinia là official state management.**
- 📌 Vuex chỉ ở trạng thái maintenance mode.

## 7. Gợi ý kiến trúc CHUẨN cho bạn (theo lộ trình học)

| Tình huống | Giải pháp |
| :--- | :--- |
| **1–2 cấp component** | `v-model` forwarding |
| **3–4 cấp** | `provide` / `inject` |
| **App nhỏ** | Pinia |
| **App lớn** | Pinia + modules |
| **Project cũ** | Vuex |

## 8. Kết luận NGẮN GỌN

- 🔥 **Vuex ≈ Pinia** về mục tiêu.
- ❌ **Vuex < Pinia** về DX & tương lai.
- ✅ **Pinia** = lựa chọn đúng cho Vue 3.


test

test 2