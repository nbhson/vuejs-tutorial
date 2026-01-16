Bạn nhận xét rất đúng 👌

Bề ngoài `computed` – `watch` – `watchEffect` đều:

🔁 re-run khi dependency thay đổi

Nhưng mục đích thiết kế, cách chạy, và thứ chúng sinh ra hoàn toàn khác nhau.
Mình sẽ giải thích theo tư duy thực tế + ví dụ đời thật, không giáo điều.

# 1️⃣ Điểm giống nhau (để bạn thấy mình không hiểu nhầm)

Cả 3 đều:

- Dựa trên Vue reactivity
- Track dependency
- Re-run khi dependency thay đổi
- Chạy reactive-driven, không cần gọi thủ công

👉 Nên cảm giác “chúng giống nhau” là hoàn toàn hợp lý

# 2️⃣ Sự khác biệt cốt lõi (1 câu mỗi cái)

| API | Bản chất |
| :--- | :--- |
| `computed` | Tạo ra giá trị mới từ state |
| `watch` | Phản ứng khi state thay đổi |
| `watchEffect` | Tự động phản ứng dựa trên những gì nó đọc |

# 3️⃣ computed – “Tôi sinh ra GIÁ TRỊ”

## Bản chất

- Nhận dependency
- Trả về 1 giá trị
- Pure & không side-effect

```js
const fullName = computed(() => {
  return firstName.value + ' ' + lastName.value
})
```

## Đặc điểm quan trọng

- ✅ Có return
- ✅ Có cache (dependency không đổi → không re-run)
- ❌ Không async
- ❌ Không làm side-effect

> 📌 Tư duy:
>
> "Tôi là công thức toán học"

# 4️⃣ watch – “Khi mày đổi, tao LÀM GÌ ĐÓ”

## Bản chất

- Lắng nghe 1 dependency cụ thể
- Thực hiện side-effect

```js
watch(id, async (newId) => {
  fetch(`/api/${newId}`)
})
```

## Đặc điểm

- ✅ Async
- ✅ Có oldValue, newValue
- ✅ Có immediate, once, deep
- ❌ Không trả về giá trị

> 📌 Tư duy:
>
> "Khi X thay đổi → làm hành động Y"

# 5️⃣ watchEffect – “Tao nhìn xem mày dùng gì, tao tự biết”

## Bản chất

- Không cần khai báo dependency
- Vue tự detect những gì được READ

```js
watchEffect(() => {
  console.log(id.value)
})
```

## Đặc điểm

- ✅ Code ngắn
- ✅ Tự động dependency
- ❌ Khó debug
- ❌ Nguy hiểm với async nếu không hiểu rõ

> 📌 Tư duy:
>
> "Cứ chạy đi, tao tự track"

# 6️⃣ Sự khác biệt THỰC TẾ (rất quan trọng)

## 🔁 Ví dụ giống nhau bề ngoài

```js
computed(() => a.value + b.value)
watch(() => a.value + b.value, () => {})
watchEffect(() => a.value + b.value)
```

👉 Nhưng kết quả hoàn toàn khác:

| API | Kết quả |
| :--- | :--- |
| `computed` | Tạo ra giá trị mới |
| `watch` | Không tạo gì, chỉ phản ứng |
| `watchEffect` | Không tạo gì, chỉ chạy |

## 💥 Nếu bạn dùng SAI mục đích

❌ Dùng computed để fetch API

```js
const data = computed(async () => {
  return await fetch(...)
})
```

→ ❌ sai thiết kế
→ ❌ không cleanup
→ ❌ khó kiểm soát

❌ Dùng watch để sinh giá trị hiển thị

```js
watch(a, () => {
  sum.value = a.value + b.value
})
```

→ ❌ thừa code
→ ❌ mất cache

# 7️⃣ Khi nào dùng cái nào? (Rule of Thumb)

## ✅ Dùng computed khi:

- Bạn muốn giá trị mới
- Dữ liệu đồng bộ
- Không side-effect

## ✅ Dùng watch khi:

- Async / API
- Side-effect
- Cần oldValue
- Cần kiểm soát chính xác

## ✅ Dùng watchEffect khi:

- Nhiều dependency
- Code ngắn
- Không cần quá chính xác dependency

# 8️⃣ Bảng so sánh cuối (rất đáng nhớ)

| Tiêu chí | computed | watch | watchEffect |
| :--- | :--- | :--- | :--- |
| Trả về giá trị | ✅ | ❌ | ❌ |
| Side-effect | ❌ | ✅ | ✅ |
| Async | ❌ | ✅ | ⚠️ |
| Auto track | ✅ | ❌ | ✅ |
| Cache | ✅ | ❌ | ❌ |
| Debug dễ | ✅ | ✅ | ❌ |

# 9️⃣ Cách ghi nhớ đơn giản (1 câu)

- 🧠 `computed` = value
- 🧠 `watch` = reaction
- 🧠 `watchEffect` = auto-reaction