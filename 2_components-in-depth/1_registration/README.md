# Component Registration (Đăng ký Component)

Dưới đây là tóm tắt đầy đủ – chi tiết – dễ hiểu bài học Component Registration trong Vue 3, kèm ví dụ minh họa cho từng phần.

## 1. Component Registration là gì?

Trong Vue, component phải được “đăng ký” (register) thì Vue mới biết:
-   Component đó nằm ở đâu.
-   Khi gặp thẻ `<MyComponent />` trong template thì phải render gì.

👉 Có 2 cách đăng ký component:
1.  **Global Registration** (Đăng ký toàn cục)
2.  **Local Registration** (Đăng ký cục bộ)

---

## 2. Global Registration (Đăng ký toàn cục)

### 2.1. Khái niệm
Component được đăng ký dùng được ở mọi component trong cùng một app, kể cả component con, cháu, chắt…

### 2.2. Cách đăng ký Global

**Ví dụ 1: Đăng ký component đơn giản**
```javascript
import { createApp } from 'vue'

const app = createApp({})

app.component(
  'MyComponent', // tên component
  {
    template: '<div>Hello Global Component</div>'
  }
)
```

**Ví dụ 2: Đăng ký component từ file .vue**
```javascript
import MyComponent from './MyComponent.vue'

app.component('MyComponent', MyComponent)
```

**Ví dụ 3: Chain nhiều component**
```javascript
app
  .component('ComponentA', ComponentA)
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC)
```

### 2.3. Sử dụng component global trong template
```html
<template>
  <ComponentA />
  <ComponentB />
  <ComponentC />
</template>
```
👉 Các component này có thể dùng ở bất kỳ đâu trong app.

### 2.4. Nhược điểm của Global Registration ❌
-   **Không tree-shaking:** Dù không dùng component → vẫn bị build vào bundle.
-   **Khó quản lý dependency:** Không biết component này đến từ đâu.
-   **App lớn:** Sẽ rất khó bảo trì.

---

## 3. Local Registration (Đăng ký cục bộ)

### 3.1. Khái niệm
-   Component chỉ dùng được trong component hiện tại.
-   Rõ ràng dependency.
-   Tree-shaking tốt.

👉 Vue khuyến khích dùng **Local Registration** cho app vừa & lớn.

### 3.2. Local Registration với `<script setup>` (Vue 3 – khuyên dùng)
```html
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```
👉 Không cần `components: {}`, chỉ cần import là dùng được.

### 3.3. Local Registration không dùng `<script setup>`
```javascript
import ComponentA from './ComponentA.vue'

export default {
  components: {
    ComponentA
  }
}
```
**Template:**
```html
<template>
  <ComponentA />
</template>
```

### 3.4. Cách hoạt động của components
```javascript
export default {
  components: {
    ComponentA: ComponentA
  }
}
```
👉 Đây là dạng đầy đủ. Thường dùng ES6 shorthand: `components: { ComponentA }`.

### 3.5. Lưu ý quan trọng ⚠️
Component đăng ký local **KHÔNG** dùng được cho component con.
-   Ví dụ: `Parent.vue` đăng ký `ComponentA` thì `Child.vue` **KHÔNG** dùng được `ComponentA`.
👉 Muốn dùng → phải import lại trong `Child.vue`.

---

## 4. Component Name Casing (Quy tắc đặt tên component)

### 4.1. Vì sao dùng PascalCase?
Ví dụ: `MyComponent`, `UserProfile`, `BaseButton`.

**Lý do:**
-   Là identifier hợp lệ trong JavaScript.
-   IDE auto-complete tốt.
-   Dễ phân biệt với HTML tag.

### 4.2. Dùng PascalCase hay kebab-case trong template?
Vue hỗ trợ cả 2:
-   Component đăng ký: `MyComponent`.
-   Trong template có thể dùng: `<MyComponent />` hoặc `<my-component />`.

👉 Vue tự map **kebab-case ↔ PascalCase**.

### 4.3. Lưu ý với in-DOM templates
HTML không hỗ trợ PascalCase. Khi viết template trực tiếp trong HTML (không qua bước compile của Vue):
-   Dùng: `<my-component></my-component>`.
-   ❌ `<MyComponent>` sẽ không chạy.

---

## 5. Khi nào dùng Global vs Local?

| **Global Registration** (nên dùng khi) | **Local Registration** (khuyên dùng) |
| :--- | :--- |
| Base component (Button, Icon, Modal…) | Component dùng riêng cho 1 page |
| Component dùng ở rất nhiều nơi | Component business logic |
| Tên rõ ràng, ít thay đổi | App vừa và lớn |

---

## 6. Tóm tắt nhanh (cheat sheet)

| Tiêu chí | Global | Local |
| :--- | :--- | :--- |
| **Phạm vi** | Toàn app | Component hiện tại |
| **Tree-shaking** | ❌ Không | ✅ Có |
| **Quản lý** | Khó | Rõ ràng |
| **Vue 3 khuyên dùng** | ❌ | ✅ |