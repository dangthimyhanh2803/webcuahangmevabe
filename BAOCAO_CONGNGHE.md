# BÁO CÁO CÔNG NGHỆ SỬ DỤNG
## Dự án: Website Cửa hàng Mẹ và Bé

---

## 1. TỔNG QUAN DỰ ÁN

| Thông tin | Chi tiết |
|---|---|
| **Tên dự án** | Website Cửa hàng Mẹ và Bé |
| **Loại ứng dụng** | Ứng dụng web thương mại điện tử (E-Commerce) |
| **Kiến trúc** | Client–Server (SPA + REST API) |
| **Mô hình** | Full-Stack: Frontend tách biệt với Backend |
| **Ngôn ngữ chính** | JavaScript (Backend) · TypeScript (Frontend) |

---

## 2. KIẾN TRÚC HỆ THỐNG

```
┌─────────────────────────────────────────────────────────┐
│                        CLIENT                           │
│   React 18 (TypeScript) · Redux Toolkit · React Router  │
│                  Chạy trên port 3000                    │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/REST API (Axios)
                     │ CORS enabled
┌────────────────────▼────────────────────────────────────┐
│                       SERVER                            │
│           Node.js · Express.js v5                       │
│                  Chạy trên port 5000                    │
└────────────────────┬────────────────────────────────────┘
                     │ mysql2 driver
┌────────────────────▼────────────────────────────────────┐
│                     DATABASE                            │
│              MySQL · Database: babyShop                 │
│                  Chạy trên port 3306                    │
└─────────────────────────────────────────────────────────┘
```

---

## 3. CÔNG NGHỆ BACKEND

### 3.1 Nền tảng & Runtime

| Công nghệ | Phiên bản | Mô tả |
|---|---|---|
| **Node.js** | LTS | Môi trường chạy JavaScript phía server, xử lý I/O bất đồng bộ (non-blocking) |
| **npm** | LTS | Trình quản lý gói (Package Manager) cho Node.js |

### 3.2 Framework & Thư viện chính

| Thư viện | Phiên bản | Vai trò |
|---|---|---|
| **Express.js** | ^5.2.1 | Web framework cho Node.js, xây dựng RESTful API. Xử lý routing, middleware, request/response |
| **mysql2** | ^3.22.3 | Driver kết nối MySQL cho Node.js. Hỗ trợ Promise, prepared statements, connection pooling |
| **bcrypt** | ^6.0.0 | Thư viện mã hóa mật khẩu sử dụng thuật toán Bcrypt (salt + hash), bảo vệ thông tin đăng nhập |
| **cors** | ^2.8.6 | Middleware xử lý Cross-Origin Resource Sharing, cho phép Frontend (port 3000) gọi API Backend (port 5000) |
| **multer** | ^2.1.1 | Middleware xử lý upload file (multipart/form-data). Dùng để tải ảnh avatar người dùng và ảnh sản phẩm |
| **dotenv** | ^17.4.2 | Đọc biến môi trường từ file `.env`, tách cấu hình nhạy cảm ra khỏi code |

### 3.3 Cấu trúc Backend (MVC Pattern)

```
backend/
├── server.js              # Entry point, khởi tạo Express & mount routes
├── config/
│   ├── db.js              # Cấu hình kết nối MySQL
│   └── upload.js          # Cấu hình Multer (giới hạn 5MB, chỉ nhận image/*)
├── routes/                # Định nghĩa các endpoint URL (12 route files)
│   ├── accountRoutes.js
│   ├── productRoutes.js
│   ├── categoryRoutes.js
│   ├── orderRoutes.js
│   ├── orderDetailRoutes.js
│   ├── addressRoutes.js
│   ├── discountRoutes.js
│   ├── reviewRoutes.js
│   ├── otpCodeRoutes.js
│   ├── productImageRoutes.js
│   ├── productSpecRoutes.js
│   └── productDiscountRoutes.js
├── controllers/           # Xử lý logic nghiệp vụ (17 controller files)
│   ├── Account/
│   │   ├── accountController.js
│   │   ├── login.js
│   │   ├── register.js
│   │   ├── sendOtp.js
│   │   ├── verifyOtp.js
│   │   └── checkPhone.js
│   ├── productController.js
│   ├── categoryController.js
│   ├── orderController.js
│   ├── orderDetailController.js
│   ├── addressController.js
│   ├── discountController.js
│   ├── reviewController.js
│   └── ...
├── model/                 # Tầng dữ liệu, truy vấn SQL (11 model files)
│   ├── accountModel.js
│   ├── productModel.js
│   └── ...
└── public/
    └── image/             # Thư mục lưu ảnh sản phẩm & avatar
```

### 3.4 REST API Endpoints

| Endpoint | Method | Chức năng |
|---|---|---|
| `POST /api/account/register` | POST | Đăng ký tài khoản mới |
| `POST /api/account/login` | POST | Đăng nhập |
| `POST /api/account/send-otp` | POST | Gửi mã OTP xác thực |
| `POST /api/account/verify-otp` | POST | Xác minh mã OTP |
| `PUT /api/account/:id/avatar` | PUT | Cập nhật ảnh đại diện |
| `GET /api/product` | GET | Lấy danh sách sản phẩm |
| `GET /api/product/:id` | GET | Lấy chi tiết sản phẩm |
| `POST /api/product` | POST | Thêm sản phẩm mới |
| `PUT /api/product/:id` | PUT | Cập nhật sản phẩm |
| `DELETE /api/product/:id` | DELETE | Xóa sản phẩm |
| `GET /api/category` | GET | Lấy danh sách danh mục |
| `GET /api/order` | GET | Lấy danh sách đơn hàng |
| `POST /api/order` | POST | Tạo đơn hàng mới |
| `PUT /api/order/:id` | PUT | Cập nhật trạng thái đơn hàng |
| `GET /api/discount` | GET | Lấy danh sách mã giảm giá |
| `GET /api/review` | GET | Lấy đánh giá sản phẩm |
| `POST /api/review` | POST | Gửi đánh giá |
| `GET /api/address` | GET | Lấy địa chỉ giao hàng |
| `POST /api/address` | POST | Thêm địa chỉ mới |
| `/image/*` | Static | Phục vụ file ảnh tĩnh |

---

## 4. CÔNG NGHỆ FRONTEND

### 4.1 Framework & Core

| Thư viện | Phiên bản | Vai trò |
|---|---|---|
| **React** | 18.2.0 | Thư viện UI chính, xây dựng giao diện bằng component-based architecture. Sử dụng Virtual DOM để tối ưu render |
| **React DOM** | 18.2.0 | Kết nối React với trình duyệt (browser DOM) |
| **TypeScript** | ^6.0.3 | Bổ sung kiểu dữ liệu tĩnh (static typing) vào JavaScript, giúp phát hiện lỗi sớm và cải thiện khả năng bảo trì |
| **React Scripts** | 5.0.1 | Bộ công cụ tích hợp (Webpack, Babel, ESLint) để build và chạy ứng dụng React |

### 4.2 Routing & Navigation

| Thư viện | Phiên bản | Vai trò |
|---|---|---|
| **React Router DOM** | 6.22.3 | Quản lý định tuyến (routing) phía client, cho phép điều hướng giữa các trang mà không reload. Sử dụng `BrowserRouter`, `Routes`, `Route`, `Outlet` |

**Cấu trúc Route:**

| Đường dẫn | Component | Mô tả |
|---|---|---|
| `/` | Home | Trang chủ, danh sách sản phẩm |
| `/login` | Login | Đăng nhập / Đăng ký |
| `/search` | SearchResults | Kết quả tìm kiếm |
| `/detailproduct/:id` | DetailProduct | Chi tiết sản phẩm |
| `/cart` | Cart | Giỏ hàng |
| `/payment` | Payment | Thanh toán |
| `/payment/confirm-cod` | ConfirmCOD | Xác nhận thanh toán COD |
| `/payment/confirm-momo` | ConfirmMoMo | Xác nhận thanh toán MoMo |
| `/payment/confirm-vnpay` | ConfirmVNPAY | Xác nhận thanh toán VNPAY |
| `/address` | Address | Quản lý địa chỉ |
| `/account` | Account | Thông tin tài khoản |
| `/history` | History | Lịch sử đơn hàng |

### 4.3 State Management

| Thư viện | Phiên bản | Vai trò |
|---|---|---|
| **Redux Toolkit** | ^2.11.2 | Quản lý global state của ứng dụng theo mô hình Flux/Redux. Đơn giản hóa việc viết reducer và action |
| **React Redux** | ^9.2.0 | Kết nối Redux store với React components thông qua `useSelector`, `useDispatch` |

**State hiện tại được quản lý:**
- `search.keyword` — Từ khóa tìm kiếm sản phẩm toàn cục

### 4.4 HTTP Client

| Thư viện | Phiên bản | Vai trò |
|---|---|---|
| **Axios** | ^1.16.0 | Gửi HTTP request từ Frontend đến Backend API. Hỗ trợ interceptors, cancel token, xử lý response/error |

### 4.5 Icon & UI

| Thư viện | Phiên bản | Vai trò |
|---|---|---|
| **React Icons** | ^5.6.0 | Bộ icon đa dạng (Font Awesome, Material, Bootstrap...) dưới dạng React component |
| **@fortawesome/fontawesome-free** | ^7.2.0 | Bộ icon Font Awesome free (CSS-based) |

### 4.6 Testing

| Thư viện | Phiên bản | Vai trò |
|---|---|---|
| **@testing-library/react** | ^16.3.2 | Kiểm thử React components |
| **@testing-library/jest-dom** | ^6.9.1 | Custom Jest matchers cho DOM |
| **@testing-library/user-event** | ^13.5.0 | Mô phỏng hành động người dùng trong test |
| **@testing-library/dom** | ^10.4.1 | Base utilities cho DOM testing |

### 4.7 Cấu trúc Frontend

```
frontend/src/
├── App.js                      # Root component, định nghĩa toàn bộ routes
├── index.js                    # Entry point, render App vào DOM
├── layout/
│   ├── mainLayout.tsx          # Layout chính: Header + <Outlet/> + Footer
│   └── loginLayout.tsx         # Layout trang đăng nhập
├── pages/
│   ├── pageHome/home.tsx       # Trang chủ
│   ├── pageLogin/login.tsx     # Đăng nhập
│   ├── pageSearchResults/      # Tìm kiếm
│   ├── pageDetailsProducts/    # Chi tiết sản phẩm
│   ├── pageCart/cartX.tsx      # Giỏ hàng
│   ├── pagePayment/            # Thanh toán & xác nhận
│   ├── pageHistory/            # Lịch sử đơn hàng
│   ├── pageAddress/            # Địa chỉ giao hàng
│   └── pageAccount/            # Thông tin tài khoản
├── components/
│   ├── header.tsx / header2.tsx
│   ├── footer.tsx
│   ├── pagination.tsx
│   ├── accoutMenu.tsx
│   ├── registerForm.tsx
│   ├── PhoneForm.tsx
│   ├── InfoForm.tsx
│   ├── otpForm.tsx
│   ├── TermsModal.tsx
│   └── product/
│       ├── ProductCard.tsx
│       ├── ProductGrid.tsx
│       ├── CategorySidebar.tsx
│       └── ProductTypeList.tsx
├── redux/
│   ├── store.ts                # Cấu hình Redux store
│   └── search.ts               # Search slice (reducer + actions)
├── types/
│   └── ProductType.ts          # TypeScript interfaces
└── assets/
    ├── banners/                # 6 ảnh banner quảng cáo
    ├── backgrounds/
    ├── icons/
    ├── header/
    └── logo/
```

---

## 5. CƠ SỞ DỮ LIỆU

### 5.1 Hệ quản trị CSDL

| Công nghệ | Chi tiết |
|---|---|
| **MySQL** | Hệ quản trị CSDL quan hệ (RDBMS) phổ biến, mã nguồn mở |
| **Tên database** | `babyShop` |
| **Kết nối** | localhost:3306 |

### 5.2 Sơ đồ quan hệ (ERD tổng quan)

```
users ──────────────────┬──── addresses
  │                     │
  ├──── otp_codes        └──── orders ────── orderdetails ──── products
  │                               │                                │
  └──── reviews ──────────────────┘                           categories
                                                                   │
                                                         product_images
                                                         product_specs
                                                         product_discounts ── discounts
```

### 5.3 Chi tiết các bảng

| Bảng | Mô tả | Cột chính |
|---|---|---|
| **users** | Tài khoản người dùng | userId, userName, email, password (bcrypt), phone, isVerified, role |
| **addresses** | Địa chỉ giao hàng | addressId, userId, fullName, phone, province, district, detailAddress, isDefault |
| **otp_codes** | Mã OTP xác thực | id, userId, otp, created_at, expired_at, isUsed |
| **categories** | Danh mục sản phẩm | categoryId, categoryName, icon |
| **products** | Sản phẩm | productId, productName, price, description, categoryId, status |
| **product_images** | Ảnh sản phẩm | imageId, productId, imageUrl, isMain |
| **product_specs** | Thông số kỹ thuật | specId, productId, specName, specValue |
| **discounts** | Mã giảm giá | discountId, discountCode, discountValue, discountType (percent/fixed), startDate, endDate, status |
| **product_discounts** | Liên kết sản phẩm–giảm giá | id, productId, discountId |
| **orders** | Đơn hàng | orderId, userId, addressId, totalAmount, discountId, discountAmount, finalAmount, paymentMethod, status |
| **orderdetails** | Chi tiết đơn hàng | orderDetailId, orderId, productId, quantity, price |
| **reviews** | Đánh giá sản phẩm | reviewId, userId, productId, orderId, rating, comment, created_at |

### 5.4 Danh mục sản phẩm (10 danh mục)

| # | Danh mục |
|---|---|
| 1 | Sữa công thức |
| 2 | Tã & bỉm |
| 3 | Đồ chơi |
| 4 | Quần áo trẻ em |
| 5 | Dụng cụ ăn dặm |
| 6 | Chăm sóc sức khỏe |
| 7 | Phụ kiện mẹ bầu |
| 8 | Xe đẩy & ghế ngồi |
| 9 | Đồ dùng phòng tắm |
| 10 | Sản phẩm hữu cơ |

---

## 6. TÍCH HỢP THANH TOÁN

| Phương thức | Loại | Mô tả |
|---|---|---|
| **COD** | Offline | Thanh toán khi nhận hàng (Cash On Delivery) |
| **MoMo** | Online | Ví điện tử MoMo — xác nhận qua trang `/payment/confirm-momo` |
| **VNPAY** | Online | Cổng thanh toán VNPAY — xác nhận qua trang `/payment/confirm-vnpay` |

---

## 7. TÍNH NĂNG BẢO MẬT

| Tính năng | Công nghệ | Mô tả |
|---|---|---|
| **Mã hóa mật khẩu** | bcrypt v6 | Hash mật khẩu với salt rounds trước khi lưu DB |
| **Xác thực OTP** | Custom | Mã OTP có thời hạn (expired_at), đánh dấu đã dùng (isUsed) |
| **CORS** | cors middleware | Kiểm soát nguồn gốc request được chấp nhận |
| **Phân quyền** | role field | Phân biệt user/admin trong bảng users |
| **Giới hạn file upload** | multer | Tối đa 5MB, chỉ chấp nhận định dạng ảnh |
| **Biến môi trường** | dotenv | Tách thông tin nhạy cảm ra file .env |

---

## 8. CÔNG CỤ PHÁT TRIỂN

| Công cụ | Vai trò |
|---|---|
| **Visual Studio Code** | IDE phát triển chính |
| **Git** | Quản lý phiên bản mã nguồn |
| **npm** | Quản lý gói cho cả Frontend và Backend |
| **Postman** | Kiểm thử REST API |
| **MySQL Workbench** | Quản lý và truy vấn cơ sở dữ liệu |
| **Chrome DevTools** | Debug Frontend |

---

## 9. TỔNG HỢP STACK CÔNG NGHỆ

```
╔══════════════════════════════════════════════════════════╗
║                   TECHNOLOGY STACK                       ║
╠══════════════════╦═══════════════════════════════════════╣
║    FRONTEND      ║  React 18 + TypeScript                ║
║                  ║  React Router DOM 6 (SPA routing)     ║
║                  ║  Redux Toolkit (state management)     ║
║                  ║  Axios (HTTP client)                  ║
║                  ║  React Icons + Font Awesome           ║
╠══════════════════╬═══════════════════════════════════════╣
║    BACKEND       ║  Node.js + Express.js v5              ║
║                  ║  REST API Architecture                ║
║                  ║  bcrypt (password hashing)            ║
║                  ║  multer (file upload)                 ║
║                  ║  cors + dotenv                        ║
╠══════════════════╬═══════════════════════════════════════╣
║    DATABASE      ║  MySQL (mysql2 driver)                ║
║                  ║  12 bảng quan hệ                      ║
║                  ║  Database: babyShop                   ║
╠══════════════════╬═══════════════════════════════════════╣
║    PAYMENT       ║  COD / MoMo / VNPAY                   ║
╚══════════════════╩═══════════════════════════════════════╝
```
