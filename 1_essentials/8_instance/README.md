
# 1. Multiple Application Instances (Nhiều ứng dụng Vue trên 1 trang)

## Ý chính
Có thể tạo nhiều ứng dụng Vue độc lập trên cùng một trang web. Mỗi ứng dụng sẽ có:
- Cấu hình riêng.
- Phạm vi (scope) riêng biệt.

## Ví dụ
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
