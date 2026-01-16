# Template Syntax (Cú pháp Template)

Dưới đây là bản tóm tắt đầy đủ – chi tiết – dễ hiểu bài học **Template Syntax** (Cú pháp Template trong Vue), được chia từng phần rõ ràng, mỗi phần đều có ví dụ minh họa sẵn để bạn học là dùng được ngay.

---

## 1. Template Syntax là gì?

### Ý chính
- Vue sử dụng **HTML-based template syntax**.
- Cho phép **liên kết dữ liệu (data binding)** giữa giao diện (DOM) và dữ liệu trong component.
- Vue sẽ **compile template** thành JavaScript tối ưu, chỉ render lại những phần cần thiết khi dữ liệu thay đổi.

> 👉 **Tóm lại:** Bạn viết HTML quen thuộc, Vue tự lo phần cập nhật giao diện.

---

## 2. Text Interpolation (Nội suy văn bản – `{{ }}`)

### Ý chính
- Là cách bind dữ liệu cơ bản và đơn giản nhất.
- Sử dụng cú pháp **Mustache** (hai dấu ngoặc nhọn): `{{ }}`.
- Khi dữ liệu thay đổi → giao diện tự động cập nhật.

### Ví dụ
```html
<template>
  <span>Message: {{ msg }}</span>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello Vue!'
    }
  }
}
</script>
```

> 👉 **Hiển thị:**
> `Message: Hello Vue!`

---

## 3. Raw HTML – `v-html`

### Ý chính
- Cú pháp `{{ }}` chỉ hiển thị text, **KHÔNG** render HTML.
- Muốn render HTML thực sự → dùng directive `v-html`.

> ⚠️ **Cảnh báo:** Rất nguy hiểm nếu dùng với dữ liệu do người dùng nhập vào (nguy cơ tấn công **XSS**).

### Ví dụ
```html
<template>
  <p>{{ rawHtml }}</p>
  <p v-html="rawHtml"></p>
</template>

<script>
export default {
  data() {
    return {
      rawHtml: '<span style="color:red">Vue rất tuyệt!</span>'
    }
  }
}
</script>
```

> 👉 **Kết quả:**
> - Dòng 1: in ra chuỗi HTML dưới dạng text thuần.
> - Dòng 2: in ra dòng chữ màu đỏ (HTML được render).

> ⚠️ **Lưu ý:** Chỉ dùng `v-html` với dữ liệu mà bạn hoàn toàn tin cậy.

---

## 4. Attribute Bindings – `v-bind`

### Ý chính
- Không thể dùng `{{ }}` bên trong các attribute của thẻ HTML.
- Phải dùng directive `v-bind` để bind giá trị cho thuộc tính.

### Ví dụ
```html
<template>
  <div v-bind:id="dynamicId"></div>
</template>

<script>
export default {
  data() {
    return {
      dynamicId: 'app-container'
    }
  }
}
</script>
```

> 👉 **Kết quả HTML:**
> ```html
> <div id="app-container"></div>
> ```

### 4.1 Shorthand của `v-bind` (Dấu `:`)
Đây là cách viết tắt phổ biến và chuẩn mực nhất trong Vue.

```html
<div :id="dynamicId"></div>
```

### 4.2 Same-name Shorthand (Vue 3.4+)
Nếu tên attribute giống hệt tên biến, bạn có thể viết gọn hơn nữa:

```html
<div :id></div>
```
> 👉 Tương đương với:
> ```html
> <div :id="id"></div>
> ```

---

## 5. Boolean Attributes

### Ý chính
- Áp dụng cho các attribute như `disabled`, `checked`, `selected`, v.v.
- Sự hiện diện của attribute phụ thuộc vào giá trị là **truthy** hay **falsy**.

### Ví dụ
```html
<button :disabled="isDisabled">Submit</button>
```

```javascript
data() {
  return {
    isDisabled: true
  }
}
```

> 👉 **Kết quả:** Button sẽ bị vô hiệu hóa (`disabled`).

---

## 6. Bind nhiều attributes cùng lúc

### Ý chính
- Có thể dùng một object chứa nhiều cặp `key: value` để bind hàng loạt thuộc tính cùng lúc.
- Sử dụng `v-bind="objectOfAttrs"`.

### Ví dụ
```html
<template>
  <div v-bind="attrs"></div>
</template>

<script>
export default {
  data() {
    return {
      attrs: {
        id: 'box',
        class: 'container',
        style: 'background: green'
      }
    }
  }
}
</script>
```

> 👉 **Kết quả HTML:**
> ```html
> <div id="box" class="container" style="background: green"></div>
> ```

---

## 7. Using JavaScript Expressions

### Ý chính
- Vue cho phép sử dụng các **biểu thức JavaScript (Expressions)** bên trong `{{ }}` hoặc `v-bind`.
- **KHÔNG** cho phép sử dụng các câu lệnh (Statements) như `if`, `for`, `var`, `while`, v.v.

### Ví dụ hợp lệ
```html
<p>{{ number + 1 }}</p>
<p>{{ ok ? 'YES' : 'NO' }}</p>
<p>{{ message.split('').reverse().join('') }}</p>
<div :id="`item-${id}`"></div>
```

### Ví dụ KHÔNG hợp lệ
```html
<!-- Đây là khai báo biến, không phải biểu thức -->
{{ var a = 1 }}

<!-- Luồng điều khiển sẽ không hoạt động, hãy dùng toán tử 3 ngôi -->
{{ if (ok) { return msg } }}
```

---

## 8. Gọi hàm trong template

### Ý chính
- Có thể gọi trực tiếp method (hàm) bên trong template.
- ⚠️ **Lưu ý:** Hàm sẽ được gọi lại mỗi khi component re-render, do đó **không nên** để hàm thực hiện các tác vụ nặng (side-effects) như gọi API hay thay đổi dữ liệu.

### Ví dụ
```html
<template>
  <p>{{ formatDate(date) }}</p>
</template>

<script>
export default {
  data() {
    return {
      date: '2026-01-16'
    }
  },
  methods: {
    formatDate(d) {
      return new Date(d).toLocaleDateString()
    }
  }
}
</script>
```

---

## 9. Restricted Globals (Biến toàn cục bị giới hạn)

### Ý chính
- Template chỉ có thể truy cập một danh sách giới hạn các biến toàn cục phổ biến.
- Các biến được phép: `Math`, `Date`, `Infinity`, `undefined`, `NaN`, `isFinite`, `isNaN`.
- **Không thể** truy cập trực tiếp các biến người dùng tự định nghĩa trên `window` (ví dụ `window.alert` sẽ không chạy trừ khi khai báo rõ).

### Ví dụ
```html
<p>{{ Math.max(5, 10) }}</p>
```

---

## 10. Directives (`v-`)

### Ý chính
- Directive là các thuộc tính đặc biệt bắt đầu bằng tiền tố `v-`.
- Nhiệm vụ: Thao tác lên DOM một cách reactive khi giá trị của expression thay đổi.

### Ví dụ
```html
<p v-if="seen">Bạn thấy tôi rồi!</p>
```

```javascript
data() {
  return {
    seen: true
  }
}
```
> Nếu `seen` là `false`, thẻ `<p>` sẽ bị xóa khỏi DOM.

---

## 11. Directive Arguments

### Ý chính
Một số directive nhận thêm "tham số" (argument), được viết sau dấu hai chấm `:`.

### Ví dụ `v-bind`
```html
<a v-bind:href="url">Vue</a>
<!-- Shorthand -->
<a :href="url">Vue</a>
```

### Ví dụ `v-on` (Lắng nghe sự kiện)
```html
<button v-on:click="submit">Submit</button>
<!-- Shorthand -->
<button @click="submit">Submit</button>
```

---

## 12. Dynamic Arguments (Tham số động)

### Ý chính
- Argument (tên thuộc tính hoặc tên sự kiện) có thể là một biến động.
- Cú pháp: Sử dụng dấu ngoặc vuông `[]`.

### Ví dụ
```html
<a :[attrName]="url">Link</a>
```

```javascript
data() {
  return {
    attrName: 'href',
    url: 'https://vuejs.org'
  }
}
```
> Kết quả sẽ tương đương với `<a href="https://vuejs.org">`.

---

## 13. Modifiers (Bổ trợ)

### Ý chính
- Modifier là các hậu tố đặc biệt bắt đầu bằng dấu chấm `.`.
- Dùng để thay đổi hành vi mặc định của directive.

### Ví dụ
```html
<form @submit.prevent="onSubmit">
  <button>Submit</button>
</form>
```
> 👉 `.prevent` tương đương với việc gọi `event.preventDefault()` trong JavaScript.

---

## 14. Tổng kết nhanh (Checklist)

- [x] **{{ }}**: Dùng để hiển thị text (Nội suy).
- [x] **v-html**: Dùng để render HTML (Cẩn thận lỗi XSS).
- [x] **v-bind** (hoặc `:`): Dùng để bind giá trị vào attribute.
- [x] **v-on** (hoặc `@`): Dùng để bắt sự kiện.
- [x] Có thể dùng **JavaScript Expression**, nhưng không dùng **Statement**.
- [x] **Directive** (v-...) là nền tảng cốt lõi của Vue template.