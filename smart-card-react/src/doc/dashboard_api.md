# 用户主页模块 API 文档 (`/api/v1/users`, `/api/v1/cards`, `/api/v1/subscriptions`)

本模块负责处理用户个人信息、卡片管理和会员订阅功能。所有接口都需要有效的JWT认证。

---

## 1. 获取当前用户信息

- **Endpoint**: `GET /api/v1/users/me`
- **功能描述**: 获取当前已登录用户的详细信息，包括会员等级和卡片使用情况。
- **请求头**:
  ```json
  {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **成功响应 (200 OK - Pydantic Schema: `UserWithStats`)**:
  ```json
  {
    "id": "user_uuid_123",
    "name": "创意设计师",
    "email": "designer@smartcard.com",
    "avatar_url": "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    "member_since": "2023-10-01T10:00:00Z",
    "subscription": {
      "level": "金卡会员",
      "daily_limit": 30,
      "cards_created_today": 5,
      "expires_at": "2025-08-14T10:00:00Z"
    }
  }
  ```

---

## 2. 获取用户卡片列表

- **Endpoint**: `GET /api/v1/cards`
- **功能描述**: 获取当前用户创建的所有卡片，支持分页。
- **请求头**:
  ```json
  {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Query 参数**:
  - `skip` (int, optional, default: 0): 分页偏移量。
  - `limit` (int, optional, default: 20): 每页数量。
- **成功响应 (200 OK - Pydantic Schema: `List[CardPublic]`)**:
  ```json
  [
    {
      "id": "card-1",
      "title": "季度营销报告摘要",
      "description": "Q3季度关键业绩指标和市场趋势分析。",
      "image_url": "/p1.png",
      "tags": ["报告", "营销"],
      "created_at": "2025-07-12T14:30:00Z",
      "is_favorite": true
    },
    {
      "id": "card-2",
      "title": "新产品发布会亮点",
      "description": "“智行”系列智能手表的核心功能介绍。",
      "image_url": "/p2.png",
      "tags": ["产品", "发布会"],
      "created_at": "2025-07-10T11:00:00Z",
      "is_favorite": false
    }
  ]
  ```

---

## 3. 删除卡片

- **Endpoint**: `DELETE /api/v1/cards/{card_id}`
- **功能描述**: 删除指定ID的卡片。
- **请求头**:
  ```json
  {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **成功响应 (200 OK)**:
  ```json
  {
    "message": "Card deleted successfully"
  }
  ```
- **错误响应 (404 Not Found)**:
  ```json
  {
    "detail": "Card not found"
  }
  ```

---

## 4. 创建支付会话 (会员充值)

- **Endpoint**: `POST /api/v1/subscriptions/create-checkout`
- **功能描述**: 为用户选择的会员计划创建一个支付会话（例如Stripe或Alipay）。
- **请求头**:
  ```json
  {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "Content-Type": "application/json"
  }
  ```
- **请求体**:
  ```json
  {
    "plan_id": "gold_monthly" 
  }
  ``` 
  (可选值: `standard_monthly`, `gold_monthly`, `black_gold_monthly`)
- **成功响应 (200 OK)**:
  ```json
  {
    "checkout_url": "https://payment-provider.com/session/sess_123xyz"
  }
  ```
- **错误响应 (400 Bad Request)**:
  ```json
  {
    "detail": "Invalid plan ID"
  }
  ``` 