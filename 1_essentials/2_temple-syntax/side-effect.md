# Side Effects & Re-rendering Detail

Câu hỏi này rất hay 👍 và chạm đúng cơ chế cốt lõi của Vue. Mình trả lời chính xác + rõ ràng, không mơ hồ.

---

## 1. Không có `v-once` → function CÓ được gọi lại không?

### 👉 CÓ. Chắc chắn có.

Với code của bạn:
```html
<p>{{ number }}</p>
<p>{{ content }} - {{ changeContent() }}</p>
```

**Mỗi lần component re-render:**
- `changeContent()` **SẼ ĐƯỢC GỌI LẠI**.
- Kể cả khi:
  - `number` thay đổi.
  - `content` thay đổi.
  - Hoặc bất kỳ reactive state nào trong component thay đổi.

### Ví dụ rõ ràng
```javascript
methods: {
  changeContent() {
    console.log('changeContent called')
    return 'Hello'
  }
}
```

> 👉 **Khi bạn chạy:**
> ```javascript
> this.number++
> ```
>
> **Console sẽ in:**
> ```text
> changeContent called
> ```
>
> ➡️ **Kết luận:** Dù `content` **KHÔNG** đổi, function vẫn chạy lại.

---

## 2. Vậy UI có render lại toàn bộ không?

### 👉 KHÔNG render lại toàn bộ DOM thật

**Vue KHÔNG:**
- Xóa hết DOM.
- Tạo lại toàn bộ HTML.

**Vue làm gì?**
1. Re-run render function.
2. Tạo Virtual DOM mới.
3. So sánh với Virtual DOM cũ (diff).
4. Chỉ cập nhật phần DOM thật bị thay đổi (patch).

---

## 3. Cụ thể với ví dụ của bạn

### Trường hợp 1: `number` thay đổi
```javascript
this.number++
```

**Điều xảy ra:**
1. Component re-render.
2. `changeContent()` → được gọi lại.
3. Vue diff DOM.
4. **DOM thật được cập nhật:**
   - `<p>{{number}}</p>`   ✅ thay đổi (DOM update).
   - `<p>...</p>`          ❌ KHÔNG thay đổi.

> ➡️ Chỉ thẻ `<p>` chứa `number` được update trong DOM.

### Trường hợp 2: `content` thay đổi
```javascript
this.content = 'New content'
```

**Kết quả:**
1. Component re-render.
2. `changeContent()` → được gọi lại.
3. **DOM update ở:**
   - `<p>{{ content }} - ...</p>`

### Trường hợp 3: State KHÔNG liên quan thay đổi
```javascript
this.someOtherState = true
```

> 👉 **Kết quả:**
> 1. Component re-render.
> 2. `changeContent()` → **VẪN ĐƯỢC GỌI**.
> 3. **DOM thật:**
>    - KHÔNG có node nào đổi.
>    - Nhưng render cycle vẫn chạy.

---

## 4. Kết luận cực kỳ quan trọng

> ❗ **Vue re-render component, không re-render toàn bộ DOM.**

| Cấp độ | Có xảy ra? |
| :--- | :---: |
| Gọi lại function trong template | ✅ |
| Chạy lại render function | ✅ |
| Tạo Virtual DOM mới | ✅ |
| Update DOM thật toàn bộ | ❌ |
| Update DOM node có thay đổi | ✅ |

---

## 5. Vì sao KHÔNG nên gọi function trực tiếp trong template?

### ❌ Tệ:
```html
<p>{{ changeContent() }}</p>
```

**Vì:**
- Bị gọi lại **mỗi lần** render.
- Dễ gây lag nếu function xử lý nặng.
- Dễ gây **side-effect** không mong muốn.

### ✅ Cách tốt hơn: `computed`
```javascript
computed: {
  formattedContent() {
    return this.content + ' - Hello'
  }
}
```

```html
<p>{{ formattedContent }}</p>
```

> 👉 **Lợi ích của `computed`:**
> - Chỉ chạy lại khi **dependency** thay đổi.
> - Có cơ chế **caching**.
> - Tối ưu **performance**.

---

## 6. Tóm tắt 1 câu để nhớ

> ❗ **Vue luôn re-render component khi state đổi, gọi lại toàn bộ expression trong template, nhưng chỉ update DOM node bị thay đổi.**