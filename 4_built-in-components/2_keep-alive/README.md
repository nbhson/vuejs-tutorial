# KeepAlive trong Vue 3: Tóm tắt Đầy đủ & Dễ hiểu

Dưới đây là tóm tắt đầy đủ – chi tiết – dễ hiểu bài học `<KeepAlive>` trong Vue 3, kèm ví dụ minh họa cho từng phần. 👇

---

## 1. `<KeepAlive>` là gì?

`<KeepAlive>` là một component dựng sẵn (built-in) của Vue dùng để **cache (ghi nhớ)** instance của component khi bạn thực hiện chuyển đổi giữa các component động.

👉 **Bình thường:**
- Khi chuyển đổi component → component cũ sẽ bị **unmount** (hủy bỏ).
- Toàn bộ **State** (dữ liệu, nội dung input, giá trị counter...) sẽ bị mất hoàn toàn.

👉 **Với `<KeepAlive>`:**
- Component cũ sẽ không bị destroy.
- Nó chỉ chuyển sang trạng thái **inactive** (ngưng hoạt động) và được lưu trữ trong bộ nhớ.
- Khi quay lại component đó → các trạng thái (State) cũ vẫn được giữ nguyên vẹn.

---

## 2. Vấn đề khi KHÔNG dùng `<KeepAlive>`

**Dynamic Component cơ bản:**
```html
<component :is="activeComponent" />
```

**Hành vi mặc định:**
1. Chuyển từ Component A sang Component B.
2. Component A bị unmount khỏi DOM.
3. Khi quay lại Component A → Vue tạo một instance mới hoàn toàn.
4. Mọi dữ liệu đã nhập hoặc thay đổi trong Component A trước đó bị reset về mặc định.

📌 **Hành vi này phù hợp khi:**
- Bạn không cần giữ lại dữ liệu cũ.
- Bạn muốn component luôn được khởi tạo mới mỗi khi người dùng truy cập.

---

## 3. Giải pháp: Bọc bằng `<KeepAlive>`

**Cách dùng cơ bản:**
```html
<KeepAlive>
  <component :is="activeComponent" />
</KeepAlive>
```

**Kết quả:**
- Khi chuyển đổi component: Component cũ sẽ được đưa vào bộ nhớ cache thay vì bị tiêu hủy.
- Khi quay lại: Trạng thái và dữ liệu cũ được khôi phục ngay lập tức.

**Ví dụ minh họa:**
- **Component A:** Chứa một bộ đếm (counter).
- **Component B:** Chứa một ô nhập liệu (input).

👉 **Khi dùng `<KeepAlive>`:** Nếu bạn tăng counter ở A, sau đó chuyển sang B nhập văn bản, rồi quay lại A thì giá trị counter vẫn được giữ nguyên như lúc bạn rời đi.

---

## 4. Lưu ý khi dùng trong DOM template

Nếu bạn viết template trực tiếp trong file HTML (không phải Single File Component - SFC):

```html
<keep-alive>
  <component :is="activeComponent"></component>
</keep-alive>
```

> [!IMPORTANT]
> Trình duyệt xử lý các thẻ HTML không phân biệt hoa thường, do đó trong môi trường DOM thực tế, bạn **phải** sử dụng tên thẻ là `<keep-alive>` (viết thường, có gạch nối).

---

## 5. Include / Exclude – Chỉ cache component mong muốn

Mặc định, `<KeepAlive>` sẽ cache **tất cả** các component con bên trong nó. Bạn có thể giới hạn điều này bằng hai thuộc tính `include` và `exclude`.

> [!CAUTION]
> **Điều kiện quan trọng:** Vue so sánh dựa trên thuộc tính `name` của component. Nếu component không có `name`, nó sẽ không thể được nhận diện chính xác bởi `include`/`exclude`.
> ```js
> export default {
>   name: 'MyComponent'
> }
> ```

### 5.1 Include – Chỉ cache những component được chỉ định

**a. Chuỗi (ngăn cách bởi dấu phẩy):**
```html
<KeepAlive include="A,B">
  <component :is="view" />
</KeepAlive>
```

**b. Biểu thức chính quy (RegExp):**
```html
<KeepAlive :include="/A|B/">
  <component :is="view" />
</KeepAlive>
```

**c. Mảng (Array):**
```html
<KeepAlive :include="['A', 'B']">
  <component :is="view" />
</KeepAlive>
```

### 5.2 Exclude – Loại trừ những component không muốn cache

```html
<KeepAlive exclude="Login">
  <component :is="view" />
</KeepAlive>
```
👉 Component `Login` sẽ luôn bị tiêu hủy (unmount) mỗi khi người dùng chuyển sang component khác.

---

## 6. Max Cached Instances – Giới hạn số lượng cache

Sử dụng prop `max` để giới hạn số lượng instance tối đa được giữ lại trong bộ nhớ.

```html
<KeepAlive :max="10">
  <component :is="activeComponent" />
</KeepAlive>
```

**Cơ chế hoạt động:**
- `<KeepAlive>` hoạt động theo thuật toán **LRU (Least Recently Used)**.
- Khi số lượng component vượt quá con số `max`: Instance nào **ít được sử dụng nhất** trong thời gian qua sẽ bị tiêu hủy để nhường chỗ cho instance mới.

📌 **Hữu ích khi:** Ứng dụng có rất nhiều tab hoặc view phức tạp, giúp tránh tiêu tốn quá nhiều bộ nhớ hệ thống.

---

## 7. Lifecycle của component được cache

Component nằm bên trong `<KeepAlive>` sẽ có hai hook vòng đời đặc biệt:

| Trạng thái | Hook tương ứng |
| :--- | :--- |
| Khi được hiển thị lại từ cache | **`activated`** / **`onActivated`** |
| Khi bị ẩn đi và đưa vào cache | **`deactivated`** / **`onDeactivated`** |

### 7.1 Composition API
```html
<script setup>
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  console.log('Component đã quay trở lại!')
})

onDeactivated(() => {
  console.log('Component đã tạm nghỉ và được đưa vào cache.')
})
</script>
```

### 7.2 Options API
```js
export default {
  activated() {
    console.log('Component đã quay trở lại!')
  },
  deactivated() {
    console.log('Component đã tạm nghỉ.')
  }
}
```

> [!NOTE]
> - `activated` cũng sẽ được gọi ngay khi component được mount lần đầu tiên.
> - `deactivated` cũng sẽ được gọi khi component chuẩn bị bị unmount hoàn toàn khỏi ứng dụng.
> - Các hook này áp dụng cho cả component gốc trong `<KeepAlive>` và **tất cả các component con** sâu bên trong nó.

---

## 8. Khi nào NÊN và KHÔNG NÊN dùng `<KeepAlive>`

✅ **NÊN dùng khi:**
- Hệ thống điều hướng dạng Tab.
- Các Form nhập liệu nhiều bước (Wizard form).
- Các component tốn nhiều tài nguyên để render lại từ đầu.
- Khi người dùng thường xuyên chuyển đổi qua lại giữa các màn hình mà cần giữ nguyên trạng thái làm việc.

❌ **KHÔNG NÊN dùng khi:**
- Component chứa các dữ liệu nhạy cảm cần được xóa bỏ khi rời khỏi.
- Khi bạn thực sự muốn dữ liệu được làm mới (reset) hoàn toàn mỗi khi người dùng mở lại.
- Lạm dụng quá nhiều làm tiêu tốn dung lượng bộ nhớ (RAM).

---

---

## 9. Ví dụ thực tế (Live Example)

Dưới đây là cách triển khai một hệ thống tab đơn giản sử dụng `<KeepAlive>` để giữ trạng thái cho Counter và Input.

### Component gốc (`App.vue`)
```html
<script setup>
import { shallowRef } from 'vue'
import CompA from './CompA.vue'
import CompB from './CompB.vue'

const currentTab = shallowRef(CompA)
const tabs = { CompA, CompB }
</script>

<template>
  <button v-for="(_, name) in tabs" @click="currentTab = tabs[name]">
    {{ name }}
  </button>

  <KeepAlive>
    <component :is="currentTab" />
  </KeepAlive>
</template>
```

### Component con (`CompA.vue`)
```html
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <p>Số lần click: {{ count }}</p>
  <button @click="count++">Tăng</button>
</template>
```

---

## 10. Tóm tắt nhanh (Cheat sheet) 🎯

- **`<KeepAlive>`**: Dùng để cache component, tránh unmount.
- **Dùng với**: `<component :is="...">`.
- **`include` / `exclude`**: Lọc các component muốn hoặc không muốn cache.
- **`max`**: Giới hạn số lượng instance trong bộ nhớ (theo cơ chế LRU).
- **Lifecycle đặc biệt**: `activated` (hiện ra) và `deactivated` (ẩn đi).