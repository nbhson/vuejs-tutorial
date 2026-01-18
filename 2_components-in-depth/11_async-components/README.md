# Async Components trong Vue 3: Tóm tắt Đầy đủ & Dễ hiểu

Dưới đây là bản tóm tắt đầy đủ – chi tiết – dễ hiểu về bài **Async Components** (Component bất đồng bộ) trong Vue 3, kèm ví dụ minh họa cho từng phần. 👇

## 1. Async Component là gì? Dùng để làm gì?

**Khái niệm:**
Async Component là component được tải (load) từ server chỉ khi thực sự cần thiết, thay vì tải toàn bộ code của chúng ngay từ lúc ứng dụng khởi chạy.

👉 **Mục tiêu chính:**
- **Giảm dung lượng bundle ban đầu:** Chỉ tải những gì cần cho trang hiện tại.
- **Tăng tốc độ load trang:** Giúp người dùng thấy nội dung nhanh hơn.
- **Tối ưu hóa performance:** Cực kỳ quan trọng đối với các ứng dụng quy mô lớn.

**Ví dụ thực tế:**
- Các trang quản trị (Admin) chỉ load khi user truy cập vào đường dẫn `/admin`.
- Các thành phần nặng như Modal, Popup, Chart chỉ load khi người dùng nhấn nút mở.

## 2. Cách sử dụng cơ bản – `defineAsyncComponent`

Vue cung cấp hàm `defineAsyncComponent` để định nghĩa một component bất đồng bộ.

**Cú pháp cơ bản:**
```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // Tải component từ server...
    resolve({
      template: '<div>Async Component</div>'
    })
  })
})
```

� **Giải thích:**
- `defineAsyncComponent` nhận vào một **loader function**.
- Loader function này phải trả về một **Promise**.
- `resolve()` được gọi khi tải thành công, `reject()` khi tải thất bại.

## 3. Dùng với `import()` (Cách phổ biến nhất)

Trong thực tế, chúng ta thường kết hợp với tính năng dynamic import của JavaScript để tải các file `.vue`.

**Ví dụ:**
```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
```

📌 **Ưu điểm:**
- Code cực kỳ ngắn gọn và dễ hiểu.
- Các công cụ như Vite hay Webpack sẽ tự động thực hiện **Code Splitting** (tách file).
- Component chỉ được tải về máy khách khi nó lần đầu tiên được render trên UI.

## 4. Sử dụng Async Component như component bình thường

Sau khi định nghĩa, `AsyncComp` có thể được sử dụng hoàn toàn giống như bất kỳ component đồng bộ nào khác:
- Nhận dữ liệu qua **props**.
- Chứa nội dung trong **slots**.

**Ví dụ:**
```html
<template>
  <AsyncComp title="Hello World" />
</template>
```

## 5. Đăng ký Async Component

### 5.1. Đăng ký Global
Sử dụng cho các component cần dùng ở rất nhiều nơi.
```js
app.component(
  'MyComponent',
  defineAsyncComponent(() => import('./components/MyComponent.vue'))
)
```

### 5.2. Đăng ký Local (Options API)
```html
<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    AdminPage: defineAsyncComponent(() =>
      import('./components/AdminPageComponent.vue')
    )
  }
}
</script>

<template>
  <AdminPage />
</template>
```

### 5.3. Đăng ký Local (Composition API – `<script setup>`)
```html
<script setup>
import { defineAsyncComponent } from 'vue'

const AdminPage = defineAsyncComponent(() =>
  import('./components/AdminPageComponent.vue')
)
</script>

<template>
  <AdminPage />
</template>
```

## 6. Trạng thái Loading & Error

Quá trình tải dữ liệu bất đồng bộ luôn đi kèm với các trạng thái chờ đợi hoặc sai sót.

Vue cho phép tùy biến giao diện cho từng trạng thái cụ thể:
- ⏳ **Loading:** Đang trong quá trình tải.
- ❌ **Error:** Gặp lỗi khi tải (ví dụ: mất mạng).

**Cấu hình nâng cao:**
```js
const AsyncComp = defineAsyncComponent({
  // Hàm loader chính
  loader: () => import('./Foo.vue'),

  // Component hiển thị khi đang tải
  loadingComponent: LoadingComponent,
  // Thời gian trễ trước khi hiện LoadingComponent (mặc định 200ms)
  delay: 200,

  // Component hiển thị khi có lỗi
  errorComponent: ErrorComponent,
  // Thời gian chờ tối đa (nếu quá sẽ báo lỗi)
  timeout: 3000
})
```

| Tùy chọn | Ý nghĩa |
| :--- | :--- |
| **`loader`** | Hàm thực hiện việc load component |
| **`loadingComponent`** | UI hiển thị trong lúc chờ tải |
| **`delay`** | Tránh việc "nháy" Loading nếu mạng quá nhanh |
| **`errorComponent`** | UI hiển thị khi Promise bị reject hoặc timeout |
| **`timeout`** | Giới hạn thời gian tải tối đa (ms) |

**Ví dụ Loading Component:**
```html
<template>
  <div>Loading...</div>
</template>
```

**Ví dụ Error Component:**
```html
<template>
  <div>Load failed 😢</div>
</template>
```

## 7. Lazy Hydration (Sử dụng cho SSR)

> [!CAUTION]
> Tính năng này (từ Vue 3.5+) chỉ áp dụng khi bạn sử dụng **Server-Side Rendering (SSR)**.

**Lợi ích:**
- Cho phép render HTML từ server để SEO tốt.
- Nhưng không tải JavaScript (Hydrate) ngay lập tức tại máy khách.
- Chỉ thực hiện Hydration (làm cho trang web có khả năng tương tác) khi các điều kiện cụ thể được thỏa mãn.

## 8. Các chiến lược Hydration có sẵn

### 8.1. Hydrate khi browser rảnh (`hydrateOnIdle`)
Tận dụng thời gian trình duyệt không bận xử lý tác vụ nặng.
```js
import { defineAsyncComponent, hydrateOnIdle } from 'vue'

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: hydrateOnIdle()
})
```
📌 Dùng `requestIdleCallback`

### 8.2. Hydrate khi component xuất hiện trong viewport (`hydrateOnVisible`)
Chỉ hydrate khi người dùng cuộn trang tới vị trí của component.
```js
import { hydrateOnVisible } from 'vue'

hydrateOnVisible({ rootMargin: '100px' })
```
➡️ Dựa vào `IntersectionObserver`

### 8.3. Hydrate theo media query (`hydrateOnMediaQuery`)
Chỉ hydrate khi điều kiện CSS thỏa mãn (ví dụ: trên thiết bị di động).
```js
import { hydrateOnMediaQuery } from 'vue'

hydrateOnMediaQuery('(max-width: 500px)')
```
➡️ Chỉ hydrate khi điều kiện CSS đúng

### 8.4. Hydrate khi có tương tác (`hydrateOnInteraction`)
Chỉ tải JS khi người dùng click, hover hoặc gõ phím vào component.
```js
import { hydrateOnInteraction } from 'vue'

hydrateOnInteraction(['click', 'mouseover'])
```
📌 Event gây ra hydration sẽ được replay lại sau khi hydrate

## 9. Custom Hydration Strategy

Bạn hoàn toàn có thể tự viết logic điều khiển việc hydrate.

**Ví dụ:**
```ts
import { defineAsyncComponent, type HydrationStrategy } from 'vue'

const myStrategy: HydrationStrategy = (hydrate, forEachElement) => {
  forEachElement(el => {
    // logic kiểm tra custom của bạn ở đây...
  })

  hydrate() // Gọi hàm này để bắt đầu quá trình

  return () => {
    // dọn dẹp (cleanup) nếu cần
  }
}

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: myStrategy
})
```

## 10. Async Component + `<Suspense>`

Async Components hoạt động cực kỳ mượt mà khi được bọc trong component đặc biệt `<Suspense>`.

📌 **`<Suspense>` giúp:**
- Quản lý tập trung nhiều async component con cùng lúc.
- Hiển thị nội dung dự phòng (Fallback UI) một cách chuyên nghiệp.

> [!TIP]
> Chi tiết sâu hơn sẽ có trong bài học riêng về **Suspense**.

## 11. Tổng kết nhanh

✅ **Async Component là công cụ đắc lực để:**
- Tối ưu hóa hiệu năng ứng dụng (Performance).
- Thực hiện nạp chồng nội dung trì hoãn (Lazy loading).

✅ **Các từ khóa quan trọng cần nhớ:**
1. `defineAsyncComponent`
2. Dynamic `import()`
3. Giao diện **Loading** & **Error**
4. Kết hợp với `<Suspense>`
5. Chiến lược **Lazy Hydration** (dành cho SSR)
