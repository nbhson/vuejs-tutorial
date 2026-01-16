Dưới đây là tóm tắt đầy đủ – chi tiết – dễ hiểu bài học Form Input Bindings (v-model) trong Vue 3, kèm ví dụ minh họa cho từng phần, dựa trên trang bạn đang xem.

# 1. Mục đích của v-model

Trong frontend, ta thường cần đồng bộ dữ liệu giữa form và JavaScript.

❌ Cách thủ công (dài dòng):

```html
<input :value="text" @input="text = $event.target.value" />
```

✅ Dùng `v-model` (ngắn gọn):

```html
<input v-model="text" />
```

👉 `v-model` tự động:

- Lấy giá trị từ input → JS
- Cập nhật UI khi JS thay đổi

# 2. Cách v-model hoạt động với từng loại input

| Element | Property | Event |
| :--- | :--- | :--- |
| `input` (text) / `textarea` | `value` | `input` |
| `checkbox` / `radio` | `checked` | `change` |
| `select` | `value` | `change` |

> 📌 Lưu ý quan trọng
>
> `v-model` bỏ qua các thuộc tính HTML ban đầu (`value`, `checked`, `selected`)
> → JavaScript là nguồn dữ liệu duy nhất (source of truth)

# 3. Basic Usage – Text input

Ví dụ:

```html
<p>Message: {{ message }}</p>
<input v-model="message" placeholder="Nhập nội dung" />
```

```js
export default {
  data() {
    return {
      message: ''
    }
  }
}
```

👉 Gõ vào input → message đổi → UI tự cập nhật

# 4. Multiline Text – textarea

```html
<p style="white-space: pre-line">{{ message }}</p>
<textarea v-model="message"></textarea>
```

❌ Sai:

```html
<textarea>{{ message }}</textarea>
```

✅ Đúng:

```html
<textarea v-model="message"></textarea>
```

# 5. Checkbox

## 5.1 Checkbox đơn (Boolean)

```html
<input type="checkbox" v-model="checked" />
<label>{{ checked }}</label>
```

```js
data() {
  return {
    checked: false
  }
}
```

👉 true / false

## 5.2 Nhiều checkbox → Array

```html
<input type="checkbox" value="Vue" v-model="skills" /> Vue
<input type="checkbox" value="React" v-model="skills" /> React
<input type="checkbox" value="Angular" v-model="skills" /> Angular

<p>{{ skills }}</p>
```

```js
data() {
  return {
    skills: []
  }
}
```

👉 `skills = ['Vue', 'React']`

# 6. Radio Button

```html
<input type="radio" value="Nam" v-model="gender" /> Nam
<input type="radio" value="Nữ" v-model="gender" /> Nữ

<p>Giới tính: {{ gender }}</p>
```

```js
data() {
  return {
    gender: ''
  }
}
```

👉 Chỉ chọn 1 giá trị duy nhất

# 7. Select

## 7.1 Select đơn

```html
<select v-model="city">
  <option disabled value="">Chọn thành phố</option>
  <option>Hà Nội</option>
  <option>HCM</option>
  <option>Đà Nẵng</option>
</select>

<p>{{ city }}</p>
```

> 📌 Nên có option disabled để tránh lỗi trên iOS

## 7.2 Select multiple (Array)

```html
<select v-model="cities" multiple>
  <option>Hà Nội</option>
  <option>HCM</option>
  <option>Đà Nẵng</option>
</select>

<p>{{ cities }}</p>
```

```js
data() {
  return {
    cities: []
  }
}
```

## 7.3 Select với v-for

```html
<select v-model="selected">
  <option v-for="opt in options" :value="opt.value">
    {{ opt.text }}
  </option>
</select>
```

```js
data() {
  return {
    selected: 'A',
    options: [
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ]
  }
}
```

# 8. Value Bindings (giá trị không phải string)

## 8.1 Checkbox với true-value / false-value

```html
<input
  type="checkbox"
  v-model="status"
  true-value="yes"
  false-value="no"
/>

<p>{{ status }}</p>
```

👉 yes / no thay vì true / false

## 8.2 Radio với giá trị động

```html
<input type="radio" :value="10" v-model="score" />
<input type="radio" :value="20" v-model="score" />
```

👉 score là number, không phải string

## 8.3 Select với object

```html
<select v-model="selected">
  <option :value="{ id: 1, name: 'Vue' }">Vue</option>
</select>
```

👉 selected là object

# 9. Modifiers của v-model

## 9.1 .lazy – cập nhật khi blur / change

```html
<input v-model.lazy="msg" />
```

👉 Không cập nhật theo từng ký tự

## 9.2 .number – ép kiểu Number

```html
<input v-model.number="age" type="number" />
```

👉 age là Number, không phải string

## 9.3 .trim – tự động xóa khoảng trắng

```html
<input v-model.trim="username" />
```

👉 `" son "` → `"son"`

# 10. v-model với Component

`v-model` không chỉ dùng cho input

Có thể dùng với component tự tạo

📖 Xem thêm:
👉 Component v-model (bài học tiếp theo)

# 11. Tổng kết nhanh

| Tình huống | Dùng |
| :--- | :--- |
| **Input text** | `v-model` |
| **Checkbox boolean** | `v-model` |
| **Nhiều checkbox** | Array |
| **Radio** | string / number |
| **Select** | string / array / object |
| **Ép kiểu** | `.number` |
| **Trim** | `.trim` |
| **Delay update** | `.lazy` |