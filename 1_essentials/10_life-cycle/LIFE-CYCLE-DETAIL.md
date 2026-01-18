Dưới đây là mô tả CHI TIẾT – DỄ HIỂU toàn bộ Lifecycle Hooks trong Vue 3, giải thích rõ hook nào chạy khi nào và nên dùng cho việc gì, kèm ví dụ thực tế.

(Mình trình bày theo Composition API trước, và ghi chú tương ứng với Options API)

# 1. Lifecycle Hooks là gì?

Mỗi component Vue sẽ trải qua các giai đoạn:
- Khởi tạo
- Render & gắn vào DOM
- Cập nhật khi dữ liệu thay đổi
- Bị hủy (remove khỏi DOM)

👉 Lifecycle Hooks là các “điểm móc” để bạn chạy code đúng thời điểm trong vòng đời đó.

# 2. Các Lifecycle Hooks theo thứ tự vòng đời

### 🔹 1. `beforeCreate` (Vue 2) ❌ – Vue 3 hầu như không dùng
- Vue 3 không khuyến khích dùng
- Thời điểm này chưa có data, props, computed
👉 Bỏ qua, không cần nhớ

### 🔹 2. `created` (Vue 2) ❌ – Vue 3 gộp vào `setup`
Trong Vue 3, logic này nằm trong `setup()`

👉 Nếu bạn từng dùng Vue 2 thì:
```js
created() {
  // logic khởi tạo
}
```
➡ Vue 3: đặt thẳng trong `setup()`

### 🔹 3. `beforeMount`
**📌 Khi nào chạy?**
- Component chuẩn bị render
- DOM CHƯA tồn tại

**📌 Dùng để làm gì?**
- Chuẩn bị dữ liệu trước khi render
- Debug quá trình render

**Ví dụ:**
```js
import { onBeforeMount } from 'vue'

onBeforeMount(() => {
  console.log('Component sắp được mount')
})
```
> ⚠️ Không thao tác DOM ở đây

### 🔹 4. `mounted` ⭐ (RẤT QUAN TRỌNG)
**📌 Khi nào chạy?**
Component đã:
- Render xong
- Gắn vào DOM

**📌 Dùng để làm gì?**
- ✔ Gọi API
- ✔ Gắn event listener
- ✔ Thao tác DOM
- ✔ Dùng thư viện bên thứ 3 (chart, map, modal…)

**Ví dụ:**
```js
import { onMounted } from 'vue'

onMounted(() => {
  console.log('Component đã mount')
  fetchData()
})
```
📌 90% trường hợp gọi API → dùng `mounted`

### 🔹 5. `beforeUpdate`
**📌 Khi nào chạy?**
- Data thay đổi
- DOM chưa cập nhật

**📌 Dùng để làm gì?**
- So sánh dữ liệu cũ – mới
- Debug trước khi DOM update

**Ví dụ:**
```js
import { onBeforeUpdate } from 'vue'

onBeforeUpdate(() => {
  console.log('Dữ liệu đổi, DOM sắp update')
})
```
⚠️ Hiếm dùng trong thực tế

### 🔹 6. `updated`
**📌 Khi nào chạy?**
- DOM đã cập nhật xong sau khi data thay đổi

**📌 Dùng để làm gì?**
- ✔ Xử lý logic phụ thuộc DOM mới
- ✔ Đồng bộ UI ngoài Vue

**Ví dụ:**
```js
import { onUpdated } from 'vue'

onUpdated(() => {
  console.log('DOM đã update')
})
```
> ⚠️ Cẩn thận vòng lặp vô hạn nếu thay đổi state trong hook này

### 🔹 7. `beforeUnmount`
**📌 Khi nào chạy?**
- Component sắp bị remove khỏi DOM

**📌 Dùng để làm gì?**
✔ **Cleanup:**
- `clearInterval`
- `removeEventListener`
- `unsubscribe socket`

**Ví dụ:**
```js
import { onBeforeUnmount } from 'vue'

onBeforeUnmount(() => {
  console.log('Component sắp bị hủy')
})
```

### 🔹 8. `unmounted` ⭐
**📌 Khi nào chạy?**
- Component đã bị remove khỏi DOM

**📌 Dùng để làm gì?**
- ✔ Cleanup cuối cùng
- ✔ Logging, analytics

**Ví dụ:**
```js
import { onUnmounted } from 'vue'

onUnmounted(() => {
  console.log('Component đã bị hủy')
})
```

# 3. Bảng tổng hợp nhanh (RẤT DỄ NHỚ)

| Hook | Khi chạy | Dùng để |
| :--- | :--- | :--- |
| `onBeforeMount` | Trước render | Chuẩn bị dữ liệu |
| `onMounted` ⭐ | DOM sẵn sàng | API, DOM, lib |
| `onBeforeUpdate` | Trước DOM update | Debug |
| `onUpdated` | Sau DOM update | Sync UI |
| `onBeforeUnmount` | Trước khi hủy | Cleanup |
| `onUnmounted` ⭐ | Sau khi hủy | Cleanup |

# 4. So sánh Composition API vs Options API

| Composition API | Options API |
| :--- | :--- |
| `onMounted` | `mounted` |
| `onUpdated` | `updated` |
| `onUnmounted` | `unmounted` |

**Ví dụ Options API:**
```js
export default {
  mounted() {
    console.log('mounted')
  },
  unmounted() {
    console.log('unmounted')
  }
}
```

# 5. Lifecycle Hooks hay dùng nhất (thực tế)

👉 Thứ tự phổ biến khi code:
1. `setup()` → khởi tạo state
2. `onMounted()` → gọi API
3. `onUpdated()` → xử lý UI phụ
4. `onUnmounted()` → cleanup

# 6. Những lỗi thường gặp ❌

- ❌ Thao tác DOM trong `setup()`
- ❌ Gọi API trong `onUpdated()`
- ❌ Quên cleanup interval / event
- ❌ Dùng arrow function trong Options API lifecycle.