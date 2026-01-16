# Reactivity Fundamentals: ref() vs reactive()

Trong Vue 3, Reactivity (tính phản ứng) là cơ chế giúp Vue tự động cập nhật DOM khi trạng thái ứng dụng thay đổi. Để làm được điều này, Vue cần biết khi nào dữ liệu được đọc và khi nào nó bị thay đổi.

**Mục đích cốt lõi (Why do they exist?):**
1.  **`reactive()`**: Là cách tiếp cận "tự nhiên" nhất của Vue với Reactivity System dựa trên **JavaScript Proxy**. Nó biến đổi cả một object thành một proxy để Vue có thể can thiệp (intercept) vào mọi thao tác đọc/ghi trên object đó. Mục đích là để **theo dõi sự thay đổi của các cấu trúc dữ liệu phức tạp (Objects, Arrays)**.
2.  **`ref()`**: Giải quyết một hạn chế của JavaScript: các kiểu dữ liệu nguyên thủy (number, string, boolean) được truyền theo giá trị (pass-by-value), không phải tham chiếu (pass-by-reference). Nếu bạn truyền một số `0` đi, Vue sẽ mất dấu nó. `ref()` ra đời với mục đích **tạo ra một "cái wrapper" (lớp vỏ bọc) dạng object** xung quanh giá trị nguyên thủy đó, giúp Vue có thể theo dõi được nó y như một object.

Tóm lại: `reactive` dùng sức mạnh của Proxy cho Objects, còn `ref` là giải pháp "đóng gói" để mang khả năng đó đến cho Primitives.

## 1. `ref()`

`ref()` được sử dụng để tạo một tham chiếu phản ứng (reactive reference) cho **bất kỳ kiểu dữ liệu nào** (nguyên thủy hoặc đối tượng).

### Đặc điểm:
- **Dữ liệu nguyên thủy (Primitives):** `String`, `Number`, `Boolean`, `null`, `undefined` chỉ có thể dùng `ref()`.
- **Truy cập:** Khi truy cập giá trị của `ref` trong `<script>`, bạn phải dùng `.value`. Trong `<template>`, Vue sẽ tự động "mở gói" (unwrap) nên không cần `.value`.
- **Cơ chế:** `ref` tạo ra một object bao bọc giá trị thực sự bên trong thuộc tính `.value`.

```javascript
import { ref } from 'vue'

const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

```html
<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>
```

## 2. `reactive()`

`reactive()` dùng để tạo bản sao phản ứng sâu (deep reactive copy) của một **đối tượng** (Object, Array, Map, Set...).

### Đặc điểm:
- **Chỉ dành cho Object:** Không thể dùng cho dữ liệu nguyên thủy.
- **Truy cập trực tiếp:** Không cần `.value`. Bạn truy cập các thuộc tính trực tiếp như object bình thường.
- **Deep Reactivity:** Mặc định là phản ứng sâu, nghĩa là thay đổi các thuộc tính lồng nhau cũng kích hoạt cập nhật.

### Hạn chế:
- **Mất tính phản ứng khi destructuring:** Nếu bạn destruct một object `reactive`, các biến tách ra sẽ mất tính kết nối phản ứng với object gốc (trừ khi dùng `toRefs`).
- **Thay thế object:** Không thể thay thế toàn bộ object `reactive` bằng một object khác mà vẫn giữ tính phản ứng cho các tham chiếu cũ.

```javascript
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  user: {
    name: 'Son'
  }
})

state.count++
```

## 3. Khi nào dùng cái nào?

| Đặc điểm | `ref()` | `reactive()` |
| :--- | :--- | :--- |
| **Kiểu dữ liệu** | Mọi kiểu (Primitives + Objects) | Chỉ Objects (Array, Map, Set...) |
| **Truy cập (Script)** | `.value` | Trực tiếp |
| **Truy cập (Template)** | Trực tiếp (Auto-unwrap) | Trực tiếp |
| **Thay đổi toàn bộ** | Có thể (`ref.value = ...`) | Không nên |
| **Khuyến nghị** | Dùng mặc định cho hầu hết trường hợp | Dùng cho nhóm các state logic liên quan |

**Lời khuyên:** Nếu bạn mới bắt đầu hoặc phân vân, hãy dùng `ref()` vì nó linh hoạt và an toàn hơn.


## 🧠 TÓM TẮT NGAY TỪ ĐẦU (để khỏi rối)

❗ Trong **Options API**, `data()` chính là “ref/reactive ngầm”.
❗ Bạn **KHÔNG** dùng `ref()`, nhưng Vue dùng thay bạn.

### 1️⃣ TẠI SAO code của bạn VẪN UPDATE UI?

Code của bạn:
```javascript
const app = createApp({
  data() {
    return {
      count: 0
    }
  }
})
```

Khi Vue khởi tạo component, nó làm việc này (tư duy logic):
```javascript
const rawData = { count: 0 }
const reactiveData = reactive(rawData)

this.count = reactiveData.count
```

👉 Nghĩa là:
1.  `count` (trong template)
2.  ↓
3.  `reactive proxy` (Vue tạo ra)
4.  ↓
5.  `getter / setter`

🔥 **Không có `ref()` trong code của bạn, nhưng reactivity vẫn tồn tại.**

### 💥 VẬY BẢN CHẤT `data()` LÀ GÌ?

> `data()` ≈ `reactive()` + expose lên `this`

**So sánh trực tiếp:**

| Options API | Composition API (tương đương) |
| :--- | :--- |
| ```javascript data() { return { count: 0 } } ``` | ```javascript const state = reactive({ count: 0 }) ``` |

👉 **KHÔNG** có sự khác biệt về reactivity.

### 2️⃣ VẬY `count++` Ở ĐÂU RA?

```html
<button @click="count++">{{ count }}</button>
```

Thực chất Vue dịch thành:
```javascript
this.count++   // setter
```

Setter này:
1.  Trigger reactivity
2.  Báo component render lại
3.  Update DOM

👉 Không phải vì `count` là biến thường.
👉 Mà vì `count` là property của `reactive proxy`.

### 3️⃣ VẬY CÂU HỎI QUAN TRỌNG HƠN 👇

> “Thế thì tại sao cần `ref()`?”

👉 **Trả lời ngắn:** Vì trong Composition API, Vue **KHÔNG** còn chỗ để tự bọc reactivity cho bạn.

**🔁 So sánh 2 bối cảnh:**

#### 🟢 Options API (Vue kiểm soát toàn bộ)
```javascript
data() {
  return { count: 0 }
}
```
-   ✔ Vue biết chắc object này là state.
-   ✔ Vue tự wrap reactive.
-   ✔ Bạn không cần ref.

#### 🔴 Composition API (bạn kiểm soát)
```javascript
const count = 0
```
-   ❌ Vue không biết biến này dùng để làm gì.
-   ❌ Không thể track.
-   ❌ Không update UI.

👉 Bạn **PHẢI** nói với Vue:
```javascript
const count = ref(0)
```

### 4️⃣ SO SÁNH TƯ DUY (CỰC QUAN TRỌNG)

| Options API (Vue làm) | Composition API (Dev làm) |
| :--- | :--- |
| - tạo component | - tạo biến |
| - gọi `data()` | - tự quyết định cái nào là reactive |
| - wrap `reactive` | - tự dùng `ref` / `reactive` |
| - expose `this.count` | |

👉 `ref()` là công cụ cho **developer**, không phải cho Vue.

### 5️⃣ VÌ SAO Vue KHÔNG TỰ LÀM reactive TRONG Composition API?

Ví dụ:
```javascript
const a = 1
const b = a + 1
const c = Math.random()
```

❓ Vue phải đoán:
-   Cái nào là state?
-   Cái nào chỉ là biến tạm?
-   Cái nào dùng cho UI?

👉 Không thể đoán chính xác.
👉 Nên Vue bắt bạn khai báo rõ ràng bằng `ref()`.

### 6️⃣ SO SÁNH 1–1 CHO DỄ NHỚ

| Trường hợp | Ai wrap reactive? |
| :--- | :--- |
| `data()` | Vue |
| `props` | Vue |
| `computed`| Vue |
| `setup()` | ❌ Bạn |
| JS thường | ❌ Không ai |

### 7️⃣ VẬY CÁCH BẠN HIỂU ĐÚNG NÊN LÀ GÌ?

❌ **Sai:**
> “ref là wrapper thay thế cho biến”

✅ **Đúng:**
> “ref là cách khai báo với Vue: cái này là state, hãy theo dõi nó”

## 🧠 MỘT CÂU CHỐT HẠ

> -   Trong Options API: Vue đoán giúp bạn.
> -   Trong Composition API: bạn nói rõ với Vue.