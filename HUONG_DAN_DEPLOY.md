# HƯỚNG DẪN TRIỂN KHAI (DEPLOY)
## Dự án: Cửa hàng Mẹ và Bé

---

## PHƯƠNG THỨC 1: CHẠY THỦ CÔNG (LOCAL)

### Yêu cầu hệ thống
- Node.js >= 18.x
- MySQL >= 8.0
- npm >= 9.x

### Bước 1 — Cài đặt MySQL và tạo database

```sql
-- Đăng nhập MySQL
mysql -u root -p

-- Tạo database và import dữ liệu
CREATE DATABASE IF NOT EXISTS babyShop;
USE babyShop;
SOURCE /đường/dẫn/đến/database.sql;
```

Hoặc import qua MySQL Workbench / phpMyAdmin.

### Bước 2 — Cài đặt và chạy Backend

```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt dependencies
npm install

# Khởi động server (port 5000)
node server.js
```

Kiểm tra: mở trình duyệt vào `http://localhost:5000` — nếu thấy `API running` là thành công.

### Bước 3 — Cài đặt và chạy Frontend

Mở terminal mới:

```bash
# Di chuyển vào thư mục frontend
cd frontend

# Cài đặt dependencies
npm install

# Khởi động ứng dụng React (port 3000)
npm start
```

Truy cập: `http://localhost:3000`

---

## PHƯƠNG THỨC 2: DOCKER (KHUYẾN NGHỊ)

### Yêu cầu
- Docker Desktop >= 24.x
- Docker Compose >= 2.x

### Chạy toàn bộ hệ thống bằng 1 lệnh

```bash
# Từ thư mục gốc Web/
docker-compose up --build
```

Hệ thống sẽ tự động:
1. Tạo container MySQL, import `database.sql`
2. Build và chạy Backend (port 5000)
3. Build React app, serve qua Nginx (port 3000)

| Dịch vụ | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| Database | localhost:3306 |

### Dừng hệ thống

```bash
docker-compose down
```

### Dừng và xóa toàn bộ dữ liệu

```bash
docker-compose down -v
```

---

## PHƯƠNG THỨC 3: DEPLOY LÊN MÁY CHỦ (VPS/CLOUD)

### 3.1 Yêu cầu máy chủ
- Ubuntu 22.04 LTS (khuyến nghị)
- RAM >= 2GB
- Đã cài Docker & Docker Compose

### 3.2 Upload source code lên server

```bash
# Clone hoặc copy source code lên server
scp -r ./Web user@your-server-ip:/var/www/babyshop
```

### 3.3 Cấu hình biến môi trường

```bash
cd /var/www/babyshop

# Tạo file .env từ template
cp .env.example .env

# Chỉnh sửa giá trị thực tế
nano .env
```

Nội dung `.env` cần cập nhật:
```
DB_HOST=db
DB_PORT=3306
DB_USER=root
DB_PASSWORD=<mật_khẩu_mạnh>
DB_NAME=babyShop
PORT=5000
REACT_APP_API_URL=http://<your-domain-or-ip>:5000
```

### 3.4 Chạy với Docker Compose

```bash
docker-compose up -d --build
```

### 3.5 Cấu hình tường lửa (Firewall)

```bash
# Mở các port cần thiết
ufw allow 3000   # Frontend
ufw allow 5000   # Backend API
ufw allow 3306   # MySQL (chỉ mở nếu cần truy cập từ xa)
ufw enable
```

---

## CẤU TRÚC FILE DEPLOY

```
Web/
├── docker-compose.yml        # Orchestrate toàn bộ services
├── .env.example              # Template biến môi trường
├── HUONG_DAN_DEPLOY.md       # File này
├── backend/
│   └── Dockerfile            # Build Backend image
├── frontend/
│   ├── Dockerfile            # Build Frontend image (multi-stage)
│   └── nginx.conf            # Cấu hình Nginx cho SPA + API proxy
└── database.sql              # Schema + dữ liệu mẫu (auto-import)
```

---

## KIỂM TRA SAU KHI DEPLOY

```bash
# Kiểm tra các container đang chạy
docker-compose ps

# Xem logs Backend
docker-compose logs backend

# Xem logs Database
docker-compose logs db

# Xem logs Frontend (Nginx)
docker-compose logs frontend
```

---

## XỬ LÝ SỰ CỐ THƯỜNG GẶP

| Lỗi | Nguyên nhân | Giải pháp |
|---|---|---|
| `Database connection failed` | MySQL chưa sẵn sàng | Đợi 30s rồi restart backend: `docker-compose restart backend` |
| `CORS error` trên trình duyệt | Frontend gọi sai API URL | Kiểm tra `REACT_APP_API_URL` trong .env |
| Port 3000/5000 đã bị dùng | Conflict port | Đổi port trong docker-compose.yml |
| `Cannot find module` | Chưa `npm install` | Chạy lại `docker-compose up --build` |
| Ảnh không hiển thị | Thiếu volume mount | Kiểm tra volume `./backend/public/image` |
