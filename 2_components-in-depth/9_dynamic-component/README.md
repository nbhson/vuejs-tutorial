# Dynamic Components trong Vue 3: Tóm tắt Đầy đủ & Dễ hiểu

Dưới đây là tóm tắt ngắn gọn và súc tích về cách sử dụng **Dynamic Components** (Component động) trong Vue 3. 👇

## 1. Khi nào dùng?

Sử dụng khi bạn muốn chuyển đổi qua lại giữa các component khác nhau tại cùng một vị trí mà không muốn dùng quá nhiều lệnh `v-if` / `v-else`.

**Các ví dụ phổ biến:**
- Hệ thống các **Tabs** (tab nội dung).
- Chuyển đổi giữa các **Views** (layout).
- Các bước trong một **Wizard/Multi-step form**.

## 2. Cú pháp

Sử dụng phần tử đặc biệt `<component>` kết hợp với attribute `:is`.

**Cách 1: Truyền bằng tên (String)**
```html
<component :is="currentTab" />
```
*(`currentTab` là một chuỗi chứa tên component đã được đăng ký)*

**Cách 2: Truyền bằng đối tượng (Object)**
```html
<component :is="tabs[currentTab]" />
```
*(`tabs[currentTab]` trả về trực tiếp đối tượng component đã được import)*

> [!TIP]
> Giá trị truyền vào `:is` có thể là:
> - Tên component (dưới dạng string).
> - Hoặc trực tiếp đối tượng component đã được import vào file.

## 3. Giữ trạng thái với `<KeepAlive>`

Mặc định, khi chuyển đổi, component cũ sẽ bị **unmount** (hủy bỏ hoàn toàn). Nếu bạn muốn giữ lại trạng thái (ví dụ: dữ liệu đã nhập trong input), hãy bọc nó bằng `<KeepAlive>`.

```html
<KeepAlive>
  <component :is="currentTab" />
</KeepAlive>
```
