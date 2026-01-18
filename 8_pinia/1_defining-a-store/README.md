# Định nghĩa Store trong Pinia: Tóm tắt Đầy đủ & Dễ hiểu

Dưới đây là bản tóm tắt chi tiết – đầy đủ – dễ hiểu bài **“Defining a Store”** (Định nghĩa Store trong Pinia), kèm ví dụ minh họa cho từng phần. 👌

---

## 1. Store trong Pinia là gì?

**Store** là một thực thể quản lý trạng thái (**State**) toàn cục. Nó giống như một "nguồn sự thật duy nhất" chứa dữ liệu dùng chung cho toàn bộ ứng dụng mà không bị rằng buộc bởi cấu trúc phân cấp của component.

- Store được tạo bằng hàm `defineStore()`.
- Mỗi store **bắt buộc** phải có một **`id`** duy nhất (kiểu chuỗi).

👉 **Pinia dùng `id` này để:**
- Kết nối và định danh chính xác trên **Vue DevTools**.
- Quản lý việc cài đặt và truy xuất store trong toàn bộ ứng dụng.

**Cú pháp cơ bản:**
```javascript
import { defineStore } from 'pinia'

// 'alerts' là ID duy nhất của store này
export const useAlertsStore = defineStore('alerts', {
  // các cấu hình (options) hoặc hàm setup
})
```

> [!TIP]
> **Quy ước đặt tên:** Hàm khởi tạo store nên tuân theo quy tắc: `use` + `TênStore` + `Store` (ví dụ: `useUserStore`, `useCartStore`, `useAuthStore`).

---

## 2. Hai cách định nghĩa Store trong Pinia

Pinia cực kỳ linh hoạt khi hỗ trợ cả hai kiểu cú pháp tương ứng với hai phong cách viết code trong Vue 3:
1. **Option Store**: Tương tự như Options API (data, computed, methods).
2. **Setup Store**: Tương tự như Composition API (ref, computed, function).

---

## 3. Option Store (Cách 1 – Trực quan, dễ học)

Đây là cách viết truyền thống, cực kỳ phù hợp cho những người đã quen với Vue 2 hoặc Options API.

### Thành phần chính:
| Thuộc tính | Tương ứng trong Vue | Ý nghĩa |
| :--- | :--- | :--- |
| **`state`** | `data()` | Nơi định nghĩa các dữ liệu phản ứng |
| **`getters`** | `computed` | Các giá trị được tính toán dựa trên state |
| **`actions`** | `methods` | Các hàm xử lý logic hoặc thay đổi state |

**Ví dụ:**
```javascript
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  // State phải là một hàm trả về object
  state: () => ({
    count: 0,
    name: 'Eduardo',
  }),

  getters: {
    doubleCount: (state) => state.count * 2,
  },

  actions: {
    increment() {
      this.count++
    },
  },
})
```

---

## 4. Setup Store (Cách 2 – Linh hoạt, mạnh mẽ)

Cú pháp này sử dụng hàm để định nghĩa store, cho phép bạn tận dụng tối đa sức mạnh của Composition API.

**Ví dụ:**
```javascript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // ref() tương đương với state
  const count = ref(0)
  const name = ref('Eduardo')

  // computed() tương đương với getters
  const doubleCount = computed(() => count.value * 2)

  // function() tương đương với actions
  function increment() {
    count.value++
  }

  // Bắt buộc phải return tất cả các thuộc tính muốn expose ra ngoài
  return {
    count,
    name,
    doubleCount,
    increment,
  }
})
```

> [!IMPORTANT]
> Trong Setup Store, bạn **PHẢI** `return` tất cả các biến state. Nếu không return, Pinia sẽ không thể nhận diện chúng để hỗ trợ SSR, DevTools hoặc các Plugin.

---

## 5. Sử dụng Router & Inject trong Setup Store

Một ưu điểm lớn của Setup Store là bạn có thể sử dụng các Composable khác ngay bên trong nó.

```javascript
import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import { inject } from 'vue'

export const useSearchFilters = defineStore('search-filters', () => {
  const route = useRoute() // Lấy thông tin route hiện tại
  const appProvided = inject('appProvided') // Lấy dữ liệu được inject toàn cục

  return {
    // Lưu ý: Thường không nên return route hoặc inject() 
    // vì chúng không phải là trạng thái thuộc quyền quản lý của store này.
  }
})
```

---

## 6. Nên chọn Option Store hay Setup Store?

| Tiêu chí | Option Store | Setup Store |
| :--- | :--- | :--- |
| **Độ khó** | Dễ học, cấu trúc cố định | Đòi hỏi hiểu về Composition API |
| **Độ linh hoạt** | Thấp hơn | Rất cao, dễ dàng lồng các composable |
| **Dự án** | App nhỏ, người mới bắt đầu | App lớn, logic phức tạp, cần tái sử dụng |

👉 **Lời khuyên:** Hãy chọn cách nào giúp bạn và đồng đội cảm thấy thoải mái và dễ bảo trì nhất.

---

## 7. Sử dụng Store trong Component

Store chỉ thực sự được khởi tạo khi bạn gọi hàm `useXxxStore()` bên trong một component.

```html
<script setup>
import { useCounterStore } from '@/stores/counter'

// Khởi tạo instance của store
const store = useCounterStore()

// Truy cập trực tiếp:
// store.count
// store.doubleCount
// store.increment()
</script>
```

---

## 8. CẢNH BÁO: Không được Destructure trực tiếp Store ❌

Nếu bạn dùng kỹ thuật destructure thông thường từ ES6, bạn sẽ làm **mất tính phản ứng (reactivity)** của dữ liệu.

```javascript
// ❌ SAI: count và doubleCount sẽ không còn tự cập nhật khi store thay đổi
const { count, doubleCount } = store 
```

---

## 9. Cách đúng: Sử dụng `storeToRefs()` ✅

Để có thể destructure mà vẫn giữ được tính phản ứng cho `state` và `getters`, hãy sử dụng tiện ích `storeToRefs`.

```html
<script setup>
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

const store = useCounterStore()

// ✅ Đúng: count và doubleCount vẫn giữ tính reactive
const { count, doubleCount } = storeToRefs(store)

// ✅ Đúng: actions có thể destructure trực tiếp vì chúng là các hàm
const { increment } = store
</script>
```

---

## 10. Khuyến nghị (Best Practices) 🚀

- **Tách file:** Mỗi store nên nằm trong một file riêng biệt.
- **Thư mục:** Đặt tất cả các file store vào thư mục `src/stores/`.
- **Lợi ích:** 
  - Tự động tách mã (Code-splitting).
  - Hỗ trợ TypeScript gợi ý code (inference) chính xác nhất.
  - Cấu trúc dự án rõ ràng, dễ tìm kiếm và bảo trì.

---

## 11. Tổng kết nhanh 🎯

1. **Store** = Quản lý trạng thái dùng chung toàn app.
2. **`defineStore(id, configuration)`**: Hàm duy nhất để tạo store.
3. **2 Kiểu viết**: **Option Store** (dễ dùng) và **Setup Store** (linh hoạt).
4. **Phản ứng**: Không destructure store trực tiếp, hãy dùng **`storeToRefs()`** cho state và getters.
