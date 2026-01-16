# Tạo Ứng Dụng Vue (Creating a Vue Application)

## 1. Application Instance (Thể hiện ứng dụng Vue)

### Ý chính
Mỗi ứng dụng Vue bắt đầu bằng việc tạo một **application instance** sử dụng hàm `createApp()` từ Vue. Application instance đóng vai trò là “bộ điều khiển trung tâm” của ứng dụng.

### Ví dụ
```javascript
import { createApp } from 'vue'

const app = createApp({
  // các cấu hình của root component
})
```

> 👉 **Lưu ý:**
> - `createApp()` tạo ra một ứng dụng Vue.
> - Object truyền vào chính là **root component**.

---

## 2. Root Component (Component gốc)

### Ý chính
- Mỗi ứng dụng Vue bắt buộc phải có **1 root component**.
- Root component có thể chứa nhiều component con.
- Thường được viết dưới dạng **Single-File Component (SFC)** (ví dụ: `App.vue`).

### Ví dụ với Single-File Component
```javascript
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
```

> 👉 `App.vue` là component gốc của toàn bộ ứng dụng.

### Ví dụ cây component
```text
App (root)
├─ TodoList
│  └─ TodoItem
│     ├─ TodoDeleteButton
│     └─ TodoEditButton
└─ TodoFooter
   ├─ TodoClearButton
   └─ TodoStatistics
```

> 👉 Điều này cho thấy Vue khuyến khích chia nhỏ giao diện thành các component tái sử dụng.

---

## 3. Mounting the App (Gắn ứng dụng vào DOM)

### Ý chính
Ứng dụng chỉ hiển thị khi gọi phương thức `.mount()`. Hàm này nhận vào:
- Một phần tử DOM thực tế.
- Hoặc một selector CSS (chuỗi ký tự).

### Ví dụ

**HTML:**
```html
<div id="app"></div>
```

**JavaScript:**
```javascript
app.mount('#app')
```

> 👉 **Kết quả:**
> - Nội dung của `App.vue` sẽ được render bên trong `<div id="app">`.
> - Thẻ `<div id="app">` **không** phải là một phần của component.

> ⚠️ **Lưu ý quan trọng:** Phải hoàn tất cấu hình app trước khi gọi `.mount()`.

---

## 4. In-DOM Root Component Template
*(Template viết trực tiếp trong HTML)*

### Ý chính
- Có thể viết template trực tiếp ngay trong file HTML.
- Vue sẽ sử dụng `innerHTML` của phần tử chứa làm template nếu root component không định nghĩa template riêng.
- **Thường dùng khi:**
  - Dùng Vue qua CDN.
  - Không có build step (như Webpack, Vite…).

### Ví dụ
**HTML:**
```html
<div id="app">
  <button @click="count++">{{ count }}</button>
</div>
```

**JavaScript:**
```javascript
import { createApp } from 'vue'

const app = createApp({
  data() {
    return {
      count: 0
    }
  }
})

app.mount('#app')
```

> 👉 **Khi click nút:**
> - Biến `count` tăng lên.
> - Vue tự động cập nhật giao diện (**reactivity**).

---

## 5. App Configurations (Cấu hình ứng dụng)

### Ý chính
Application instance cung cấp object `app.config` để cấu hình toàn bộ ứng dụng.

### Ví dụ: Bắt lỗi toàn cục (Global Error Handling)
```javascript
app.config.errorHandler = (err) => {
  console.error('Lỗi ứng dụng:', err)
}
```

> 👉 Mọi lỗi xảy ra trong các component con đều sẽ được bắt và xử lý tại đây.

---

## 6. Đăng ký Component toàn cục (Global Component)

### Ý chính
Có thể đăng ký component để sử dụng ở mọi nơi trong ứng dụng bằng phương thức `app.component()`.

### Ví dụ
```javascript
import TodoDeleteButton from './components/TodoDeleteButton.vue'

app.component('TodoDeleteButton', TodoDeleteButton)
```

> 👉 **Sau khi đăng ký:**
> ```html
> <TodoDeleteButton />
> ```
> Component này có thể được sử dụng ở bất kỳ component nào khác trong ứng dụng.

> ⚠️ **Lưu ý:** Phải đăng ký component trước khi gọi `.mount()`.

---

## 7. Multiple Application Instances (Nhiều ứng dụng Vue trên 1 trang)

### Ý chính
Có thể tạo nhiều ứng dụng Vue độc lập trên cùng một trang web. Mỗi ứng dụng sẽ có:
- Cấu hình riêng.
- Phạm vi (scope) riêng biệt.

### Ví dụ
```javascript
const app1 = createApp({ data: () => ({ msg: 'App 1' }) })
app1.mount('#container-1')

const app2 = createApp({ data: () => ({ msg: 'App 2' }) })
app2.mount('#container-2')
```

**HTML:**
```html
<div id="container-1"></div>
<div id="container-2"></div>
```

> 👉 **Trường hợp sử dụng:**
> - Trang web lớn (legacy apps).
> - Chỉ cần tích hợp Vue cho một vài khu vực nhỏ trên giao diện.
> - Phù hợp với server-rendered HTML.

---

## 8. Tổng kết nhanh (Checklist)

- [x] Dùng `createApp()` để khởi tạo ứng dụng.
- [x] Root component đóng vai trò là trung tâm của app.
- [x] Phải gọi `.mount()` thì ứng dụng mới được hiển thị (render).
- [x] Có thể viết template trong HTML hoặc trong file component.
- [x] Cấu hình ứng dụng thông qua `app.config`.
- [x] Đăng ký component toàn cục bằng `app.component()`.
- [x] Có thể chạy nhiều Vue app độc lập trên cùng một trang.