# Slots trong Vue 3: Tóm tắt Đầy đủ & Dễ hiểu

Dưới đây là tóm tắt đầy đủ – chi tiết – dễ hiểu bài học **Slots** trong Vue 3, kèm ví dụ minh họa cho từng phần. Nội dung được trình bày theo đúng cấu trúc của tài liệu chính thức. 👇

## 1. Slot là gì? (Slot Content & Slot Outlet)

**Khái niệm:**
- **Slot** cho phép component cha truyền template (HTML) vào component con.
- Component con quyết định **render ở đâu**, còn component cha quyết định **nội dung**.

👉 Slot giống như những “chỗ trống” trong component con để component cha điền nội dung vào.

**Ví dụ cơ bản:**

**Component cha:**
```html
<FancyButton>
  Click me! <!-- Slot content -->
</FancyButton>
```

**Component con (`FancyButton.vue`):**
```html
<template>
  <button class="fancy-btn">
    <slot></slot> <!-- Slot outlet -->
  </button>
</template>
```

👉 **Kết quả render:**
```html
<button class="fancy-btn">Click me!</button>
```

> [!NOTE]
> `<slot>` được gọi là **slot outlet** (điểm đặt nội dung).

## 2. Slot không chỉ là text

Slot có thể chứa bất kỳ kiểu nội dung nào:
- HTML thô.
- Nhiều phần tử lồng nhau.
- Các component khác.

**Ví dụ:**
```html
<FancyButton>
  <span style="color:red">Click me!</span>
  <AwesomeIcon name="plus" />
</FancyButton>
```

## 3. Render Scope (Phạm vi dữ liệu của Slot)

**Nguyên tắc quan trọng:**
- Slot sử dụng scope của component cha.
- **KHÔNG** truy cập được dữ liệu bên trong của component con.

**Ví dụ:**
```html
<!-- Parent Template -->
<span>{{ message }}</span>
<FancyButton>{{ message }}</FancyButton>
```
👉 Cả hai `{{ message }}` đều lấy giá trị từ parent, không phải từ `FancyButton`.

> [!IMPORTANT]
> Cơ chế này giống như **lexical scope** trong JavaScript.

## 4. Fallback Content (Nội dung mặc định cho Slot)

Sử dụng khi component cha không truyền bất kỳ nội dung nào vào slot.

**Ví dụ:**

**Component con:**
```html
<template>
  <button type="submit">
    <slot>Submit</slot> <!-- Fallback content -->
  </button>
</template>
```

**Component cha (không truyền nội dung):**
```html
<SubmitButton />
```
👉 **Render:** `<button>Submit</button>`

**Component cha (truyền nội dung):**
```html
<SubmitButton>Save</SubmitButton>
```
👉 **Render:** `<button>Save</button>`

## 5. Named Slots (Slot có tên)

Sử dụng khi component có nhiều vị trí render nội dung khác nhau.

**Component con:**
```html
<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>

    <main>
      <slot></slot> <!-- default slot -->
    </main>

    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
```

**Component cha (truyền nội dung):**
```html
<BaseLayout>
  <template #header>
    <h1>Page Title</h1>
  </template>

  <p>Main content here</p> <!-- Tự động vào default slot -->

  <template #footer>
    <p>Contact info</p>
  </template>
</BaseLayout>
```

> [!TIP]
> Slot không khai báo `name` mặc định sẽ được coi là slot `default`.

## 6. Conditional Slots (Slot có điều kiện)

**Mục đích:** Chỉ render wrapper bao quanh khi slot thực sự tồn tại nội dung.

**Ví dụ:**
```html
<template>
  <div class="card">
    <div v-if="$slots.header">
      <slot name="header" />
    </div>

    <div v-if="$slots.default">
      <slot />
    </div>

    <div v-if="$slots.footer">
      <slot name="footer" />
    </div>
  </div>
</template>
```
📌 `$slots` là một object dùng để kiểm tra slot nào đang được truyền nội dung.

## 7. Dynamic Slot Names (Tên slot động)

Sử dụng khi tên slot phụ thuộc vào một biến JavaScript.

**Ví dụ:**
```html
<BaseLayout>
  <template #[dynamicSlotName]>
    Nội dung động
  </template>
</BaseLayout>
```
📌 Sử dụng **dynamic arguments** của Vue với cú pháp `[]`.

## 8. Scoped Slots (Slot nhận dữ liệu từ con)

**Vấn đề:** Mặc định slot không truy cập được data của con.
**Giải pháp:** Truyền dữ liệu từ con ngược lên slot để cha có thể sử dụng.

**Component con:**
```html
<template>
  <slot :text="greetingMessage" :count="1"></slot>
</template>
```

**Component cha (nhận dữ liệu qua `v-slot`):**
```html
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
```

**Hoặc dùng Destructuring:**
```html
<MyComponent v-slot="{ text, count }">
  {{ text }} {{ count }}
</MyComponent>
```

> [!NOTE]
> Scoped slot hoạt động tương tự như một hàm nhận tham số trong JavaScript.

## 9. Named Scoped Slots

**Ví dụ:**

**Component con:**
```html
<slot name="header" message="hello"></slot>
```

**Component cha:**
```html
<MyComponent>
  <template #header="{ message }">
    {{ message }}
  </template>
</MyComponent>
```

## 10. Lưu ý khi kết hợp Default Slot và Named Slot

❌ **Sai (không thể compile):**
```html
<MyComponent v-slot="{ message }">
  <template #footer>
    {{ message }}
  </template>
</MyComponent>
```

✅ **Đúng:**
```html
<MyComponent>
  <template #default="{ message }">
    {{ message }}
  </template>

  <template #footer>
    Footer content
  </template>
</MyComponent>
```

## 11. Ví dụ thực tế: `FancyList` (Scoped Slot thực dụng)

**Component cha:**
```html
<FancyList>
  <template #item="{ body, username, likes }">
    <div class="item">
      <p>{{ body }}</p>
      <small>{{ username }} - {{ likes }} likes</small>
    </div>
  </template>
</FancyList>
```

**Component con:**
```html
<ul>
  <li v-for="item in items">
    <slot name="item" v-bind="item"></slot>
  </li>
</ul>
```
👉 **Logic** xử lý dữ liệu ở con – **UI** trang trí ở cha. Rất linh hoạt!

## 12. Renderless Components

**Khái niệm:**
- Là component không render bất kỳ mã HTML nào của riêng nó.
- Chỉ chứa logic xử lý, để slot (do cha truyền vào) quyết định UI hoàn toàn.

**Ví dụ:**
```html
<MouseTracker v-slot="{ x, y }">
  Mouse position: {{ x }}, {{ y }}
</MouseTracker>
```
📌 Trong Vue 3, chúng ta thường dùng **Composition API** thay vì renderless component, nhưng kiến thức về scoped slot vẫn rất quan trọng để xây dựng component thư viện.

## 13. Tổng kết nhanh

| Tính năng | Mục đích |
| :--- | :--- |
| **Slot** | Truyền nội dung (HTML/Component) từ cha xuống con |
| **Fallback** | Hiển thị nội dung mặc định khi cha không truyền gì |
| **Named Slot** | Định nghĩa nhiều vị trí render khác nhau |
| **Scoped Slot** | Truyền dữ liệu từ component con ngược lên cho cha |
| **Conditional Slot** | Kiểm tra sự tồn tại của slot trước khi render wrapper |
| **Dynamic Slot** | Sử dụng tên slot dựa trên biến động |
| **Renderless** | Tách biệt logic và giao diện hiển thị |