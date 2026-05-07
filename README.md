# Hệ thống thương mại điện tử phân tán

Đề tài xây dựng hệ thống thương mại điện tử theo kiến trúc microservices, hỗ trợ xử lý đơn hàng, thanh toán mô phỏng, theo dõi vận chuyển và thông báo realtime qua WebSocket.

## Cấu trúc chính

- `services/api-gateway`: API Gateway định tuyến request.
- `services/auth-service`: đăng ký, đăng nhập, sinh JWT.
- `services/user-service`: hồ sơ người dùng.
- `services/product-service`: sản phẩm, danh mục, tồn kho.
- `services/cart-service`: giỏ hàng.
- `services/order-service`: tạo đơn hàng và trạng thái đơn.
- `services/payment-service`: thanh toán mô phỏng.
- `services/notification-service`: realtime notification bằng WebSocket.
- `services/delivery-service`: tracking vận chuyển.
- `services/analytics-service`: dashboard thống kê.
- `shared-lib`: DTO, constant, response dùng chung.
- `frontend-react`: dashboard ReactJS.
- `docker/docker-compose.yml`: PostgreSQL và Redis.
- `docs`: tài liệu kiến trúc, database, sequence diagram.

## Chạy backend

```powershell
mvn clean package
mvn -pl services/api-gateway spring-boot:run
mvn -pl services/auth-service spring-boot:run
mvn -pl services/product-service spring-boot:run
mvn -pl services/order-service spring-boot:run
mvn -pl services/notification-service spring-boot:run
```

## Chạy hạ tầng

```powershell
docker compose -f docker/docker-compose.yml up -d
```

## Chạy frontend

```powershell
cd frontend-react
npm install
npm run dev
```

## API mẫu

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/products`
- `POST /api/cart/items`
- `POST /api/orders`
- `POST /api/payments`
- `POST /api/notifications`
- `GET /api/deliveries/{orderId}`
- `GET /api/analytics/dashboard`

## WebSocket

Frontend kết nối:

```text
ws://localhost:8087/ws/notifications
```

Gửi thử thông báo:

```powershell
Invoke-RestMethod -Method Post -Uri http://localhost:8087/api/notifications -ContentType "application/json" -Body '{"userId":1,"message":"Order #1 updated"}'
```
