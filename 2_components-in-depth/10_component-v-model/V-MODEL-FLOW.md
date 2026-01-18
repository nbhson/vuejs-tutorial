# Luồng Dữ liệu v-model qua Nhiều Cấp Component

Dưới đây là giải thích từ dễ đến đúng bản chất, kèm ví dụ luồng **Parent → Child → Child 1.1** để bạn thấy rõ cách dữ liệu di chuyển.

## 1. Trường hợp: Parent → Child → Child 1.1

Giả sử cấu trúc component:
```text
Parent
 └─ Child1
     └─ Child1_1
```

**Mục tiêu:**
- 👉 Parent giữ dữ liệu gốc.
- 👉 Child1_1 thực hiện thay đổi dữ liệu.
- 👉 Parent tự động nhận giá trị mới cập nhật.

### ❌ Cách SAI (không nên dùng)
- ❌ Child 1.1 tự sửa state của parent trực tiếp.
- ❌ Truyền props xuyên nhiều tầng và cố gắng sửa chúng.

> [!IMPORTANT]
> Vue **KHÔNG** cho phép component con sửa trực tiếp props nhận từ cha.

### ✅ Cách ĐÚNG & PHỔ BIẾN NHẤT: "Forward v-model"
- Parent giữ **state**.
- Các component trung gian chỉ đóng vai trò **chuyển tiếp (forward)** `v-model`.

---

#### 1️⃣ Parent.vue (Nguồn dữ liệu)

```html
<script setup>
import { ref } from 'vue'
import Child1 from './Child1.vue'

const count = ref(0)
</script>

<template>
  <h2>Parent: {{ count }}</h2>
  <Child1 v-model="count" />
</template>
```

#### 2️⃣ Child1.vue (Component trung gian)

👉 **KHÔNG** tạo state mới.
👉 Chỉ forward `v-model` xuống child 1.1.

```html
<script setup>
import Child1_1 from './Child1_1.vue'

const model = defineModel()
</script>

<template>
  <h3>Child1</h3>
  <Child1_1 v-model="model" />
</template>
```

📌 **Điểm quan trọng:**
- `defineModel()` tạo ra một ref liên kết trực tiếp với `v-model` của parent.
- `Child1` hoàn toàn không giữ bản sao dữ liệu riêng.

#### 3️⃣ Child1_1.vue (Component thao tác dữ liệu)

```html
<script setup>
const model = defineModel()

function increment() {
  model.value++
}
</script>

<template>
  <h4>Child1_1</h4>
  <button @click="increment">+</button>
</template>
```

---

## 2. Luồng dữ liệu (Cực kỳ quan trọng)

Sơ đồ di chuyển:
```text
Parent (count)
   ↑       ↓
Child1 (model)
   ↑       ↓
Child1_1 (model)
```

1. **Child1_1** thay đổi `model.value`.
2. Vue tự động phát (emit) event ngược lên.
3. **Parent** nhận được tín hiệu và cập nhật biến `count`.
4. Toàn bộ UI trong chuỗi component re-render để hiển thị giá trị mới.

👉 **Lợi ích:** Không cần viết `emit` thủ công ở từng cấp.

---

## 3. Nhiều v-model qua nhiều cấp

Ví dụ truyền cả `name` và `age`:

**Parent:**
```html
<Child1
  v-model:name="name"
  v-model:age="age"
/>
```

**Child1:**
```html
<script setup>
const name = defineModel('name')
const age = defineModel('age')
</script>

<template>
  <Child1_1
    v-model:name="name"
    v-model:age="age"
  />
</template>
```

**Child1_1:**
```html
<script setup>
const name = defineModel('name')
const age = defineModel('age')
</script>
```

---

## 4. Khi nào KHÔNG nên forward v-model?

❌ **Hạn chế dùng khi:**
- Cấu trúc quá sâu (3–4 cấp trở lên).
- Các component trung gian không có liên quan logic đến dữ liệu đó.
- Dữ liệu (state) cần dùng ở nhiều nhánh component khác nhau.

➡️ **Lúc này nên cân nhắc:**

| Giải pháp | Khi nào dùng |
| :--- | :--- |
| **Pinia** | App lớn, dữ liệu dùng chung toàn cục (Global State) |
| **Provide / Inject** | Truyền dữ liệu sâu, ít khi thay đổi (Dependency Injection) |
| **Emit events** | Logic cần sự rõ ràng, tách biệt hoàn toàn |

### 💡 Ví dụ thay thế bằng `provide` / `inject` (gọn hơn)

**Parent:**
```js
import { ref, provide } from 'vue'
const count = ref(0)
provide('count', count)
```

**Child 1.1:**
```js
import { inject } from 'vue'
const count = inject('count')
```

> [!CAUTION]
> **Nhược điểm:** Khó debug hơn vì không thấy rõ luồng dữ liệu đi qua các component trung gian trên template.

---

## 5. Tổng kết nhanh

- ✅ **2–3 tầng:** Dùng `v-model` forwarding (nhanh, dễ hiểu).
- ✅ **Nhiều tầng, nhiều nhánh:** Dùng **Pinia** (chuẩn quy trình).
- ✅ **Truyền sâu, dữ liệu tĩnh hoặc ít đổi:** Dùng `provide`/`inject`.