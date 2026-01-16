# 5. Binding Inline Styles (:style)

## 5.1. Binding style bằng Object

```html
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

```js
const activeColor = ref('red')
const fontSize = ref(30)
```

**render:**

```html
<div style="color: red; font-size: 30px;"></div>
```

## 5.2. camelCase & kebab-case đều được

```html
<div :style="{ 'font-size': fontSize + 'px' }"></div>
```

## 5.3. Style object đặt trong biến

```js
const styleObject = reactive({
  color: 'red',
  fontSize: '30px'
})
```

```html
<div :style="styleObject"></div>
```

> ✔ Template sạch hơn

## 5.4. Dùng chung style thường và :style

```html
<h1 style="color: red" :style="'font-size: 1em'">
  hello
</h1>
```

**render:**

```html
<h1 style="color: red; font-size: 1em;">hello</h1>
```

# 6. Binding style bằng Array

```html
<div :style="[baseStyles, overridingStyles]"></div>
```

> ➡ Các object style sẽ merge lại với nhau

# 7. Auto-prefix (Vue tự thêm tiền tố trình duyệt)

Vue tự kiểm tra:

- `-webkit-`
- `-ms-`
- `-moz-`

👉 Bạn không cần lo compatibility

# 8. Multiple Values (nhiều giá trị cho 1 property)

```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

> ✔ Trình duyệt sẽ chọn giá trị hỗ trợ cuối cùng

# 9. Tóm tắt nhanh (cheat-sheet 🧠)

| Tình huống | Nên dùng |
| :--- | :--- |
| **Bật/tắt class** | `:class="{ active: isActive }"` |
| **Nhiều class** | Object hoặc Array |
| **Logic phức tạp** | `computed` |
| **Style động** | `:style="{ color, fontSize }"` |
| **Style gọn** | Object / Array |
| **Component** | Class tự merge vào root |