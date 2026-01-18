# Suspense trong Vue 3: Tóm tắt Đầy đủ & Dễ hiểu

Dưới đây là tóm tắt chi tiết – đầy đủ – dễ hiểu về bài học `<Suspense>` trong Vue 3, kèm ví dụ minh họa cho từng phần. 👇

---

## 1. `<Suspense>` là gì?

`<Suspense>` là một component dựng sẵn (built-in) của Vue 3, được dùng để quản lý các tác vụ bất đồng bộ (async) trong cây component.

**Mục đích chính:**
- Hiển thị trạng thái chờ (loading state) một cách tập trung.
- Đợi nhiều async component hoặc async `setup()` hoàn thành trước khi hiển thị giao diện chính.

> [!CAUTION]
> **Experimental:** Tính năng này hiện vẫn đang trong giai đoạn thử nghiệm (experimental) và API có thể thay đổi trong tương lai.

👉 **Vấn đề giải quyết:** Không cần mỗi component phải tự xử lý logic hiển thị spinner riêng lẻ, giúp tránh tình trạng giao diện bị "nhảy" hoặc quá nhiều spinner xuất hiện lộn xộn.

---

## 2. Async Dependencies (Phụ thuộc bất động bộ)

`<Suspense>` sẽ theo dõi và đợi tất cả các "phụ thuộc bất đồng bộ" bên trong cây component của nó hoàn thành trước khi chuyển từ trạng thái fallback sang trạng thái hiển thị chính.

**Ví dụ cấu trúc cây component:**
```text
<Suspense>
 └─ <Dashboard>
    ├─ <Profile>
    │  └─ <FriendStatus> (async setup)
    └─ <Content>
       ├─ <ActivityFeed> (async component)
       └─ <Stats> (async component)
```
➡️ Nếu bất kỳ component con nào ở bất kỳ cấp độ nào là async, `<Suspense>` sẽ chờ cho đến khi tất cả chúng sẵn sàng.

---

## 3. Async setup()

### 3.1 `setup()` dạng async (Composition API)
Khi sử dụng Options API hoặc hàm `setup()` truyền thống, bạn có thể định nghĩa nó là một hàm `async`.

```javascript
export default {
  async setup() {
    const res = await fetch('https://api.example.com/posts')
    const posts = await res.json()

    return { posts }
  }
}
```
➡️ Component này sẽ tự động được coi là một async dependency của `<Suspense>`.

### 3.2 `<script setup>` với `await` (Tự động async)
Trong `<script setup>`, bạn có thể sử dụng `await` trực tiếp ở cấp cao nhất (top-level await).

```html
<script setup>
// Vue tự động hiểu đây là async component
const res = await fetch('https://api.example.com/posts')
const posts = await res.json()
</script>

<template>
  <ul>
    <li v-for="post in posts" :key="post.id">
      {{ post.title }}
    </li>
  </ul>
</template>
```

---

## 4. Async Components

### 4.1 Mặc định bị `<Suspense>` kiểm soát
Khi sử dụng `defineAsyncComponent`, component tải chậm này sẽ mặc định được `<Suspense>` quản lý nếu nó nằm trong cây component của Suspense.

```javascript
import { defineAsyncComponent } from 'vue'

const AsyncStats = defineAsyncComponent(() =>
  import('./Stats.vue')
)
```
➡️ Trạng thái loading riêng của component này sẽ bị bỏ qua, nhường quyền điều khiển cho `<Suspense>`.

### 4.2 Thoát khỏi sự kiểm soát (`suspensible: false`)
Nếu muốn component tự xử lý trạng thái loading của chính nó thay vì đợi cùng `<Suspense>`, hãy đặt `suspensible: false`.

```javascript
const AsyncStats = defineAsyncComponent({
  loader: () => import('./Stats.vue'),
  suspensible: false
})
```

---

## 5. Loading State (Default & Fallback Slot)

`<Suspense>` hoạt động dựa trên 2 slot chính:
- **`#default`**: Nội dung chính của ứng dụng (nơi chứa các tasks async).
- **`#fallback`**: Giao diện hiển thị trong lúc chờ đợi (Loading UI).

> [!IMPORTANT]
> Mỗi slot bên trong `<Suspense>` chỉ được phép chứa **một node gốc duy nhất**.

**Ví dụ cơ bản:**
```html
<Suspense>
  <!-- Nội dung chính -->
  <Dashboard />

  <!-- Giao diện khi đang tải -->
  <template #fallback>
    <p>Đang tải dữ liệu, vui lòng chờ...</p>
  </template>
</Suspense>
```

**Cơ chế hoạt động:**
1. Render nội dung trong `#default` vào bộ nhớ đệm.
2. Nếu gặp async dependency → Chuyển sang trạng thái **pending**.
3. Hiển thị nội dung trong `#fallback`.
4. Khi tất cả async tasks hoàn tất → Hiển thị nội dung `#default` ra màn hình.

---

## 6. Events của `<Suspense>`

`<Suspense>` phát ra các sự kiện để bạn có thể theo dõi tiến trình:

| Event | Khi nào xảy ra |
| :--- | :--- |
| **`pending`** | Bắt đầu quá trình tải (vào trạng thái pending) |
| **`resolve`** | Tất cả nội dung trong `#default` đã tải xong |
| **`fallback`** | Nội dung `#fallback` bắt đầu được hiển thị |

**Ví dụ:**
```html
<Suspense @pending="onLoading" @resolve="onDone">
  <Dashboard />
  <template #fallback>Loading...</template>
</Suspense>
```

---

## 7. Error Handling (Xử lý lỗi)

> [!WARNING]
> Bản thân `<Suspense>` **không xử lý lỗi** xảy ra bên trong các tác vụ async.

Để xử lý lỗi (ví dụ API lỗi), bạn cần sử dụng:
- Hook `onErrorCaptured()` (Composition API).
- Hoặc Options `errorCaptured` (Options API).

**Ví dụ:**
```javascript
import { onErrorCaptured, ref } from 'vue'

const error = ref(null)

onErrorCaptured((err) => {
  error.value = err
  console.error('Phát hiện lỗi async:', err)
  return false // Ngăn lỗi lan lên cấp cao hơn
})
```

---

## 8. Kết hợp với các Built-in Components khác

Khi sử dụng chung với `Transition`, `KeepAlive` và `RouterView`, thứ tự lồng nhau cực kỳ quan trọng:

```html
<RouterView v-slot="{ Component }">
  <Transition mode="out-in">
    <KeepAlive>
      <Suspense>
        <!-- Render component từ router -->
        <component :is="Component" />
        
        <!-- Loading state chung cho toàn bộ route -->
        <template #fallback>
          Đang chuyển trang...
        </template>
      </Suspense>
    </KeepAlive>
  </Transition>
</RouterView>
```

---

## 9. Nested `<Suspense>` (Vue 3.3+)

Dùng khi bạn có các `Suspense` lồng nhau. Thuộc tính `suspensible` giúp component con đồng bộ trạng thái với component `Suspense` cha.

```html
<Suspense>
  <OuterComponent>
    <!-- Giao quyền kiểm soát cho Suspense cha -->
    <Suspense suspensible>
      <InnerComponent />
    </Suspense>
  </OuterComponent>
</Suspense>
```
👉 **Lợi ích:** Tránh việc hiển thị quá nhiều fallback cùng lúc và giúp quá trình cập nhật DOM mượt mà hơn.

---

## 10. Tổng kết nhanh (Cheat Sheet) 🎯

| Nội dung | Quy tắc ghi nhớ |
| :--- | :--- |
| **Mục đích** | Quản lý trạng thái chờ của nhiều async tasks cùng lúc |
| **Async setup** | Sử dụng `async setup()` hoặc top-level `await` trong `<script setup>` |
| **Slots** | Gồm 2 phần: `default` (nội dung) và `fallback` (loading) |
| **Events** | Theo dõi qua `pending`, `resolve`, `fallback` |
| **Xử lý lỗi** | Bắt buộc dùng `onErrorCaptured` ở component cha |
| **Trạng thái** | Hiện tại vẫn là tính năng **Experimental** |