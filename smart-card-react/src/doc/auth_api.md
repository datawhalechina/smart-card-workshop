# 认证模块 API 文档 (`/api/v1/auth`)

本模块负责处理用户注册和登录认证。

---

## 1. 用户注册

- **Endpoint**: `POST /api/v1/auth/signup`
- **功能描述**: 创建一个新用户账户。
- **请求头**:
  ```json
  {
    "Content-Type": "application/json"
  }
  ```
- **请求体 (Pydantic Schema: `UserCreate`)**:
  ```json
  {
    "name": "王小明",
    "email": "user@example.com",
    "password": "a_strong_password"
  }
  ```
- **成功响应 (200 OK - Pydantic Schema: `UserPublic`)**:
  ```json
  {
    "id": "user_uuid_123",
    "name": "王小明",
    "email": "user@example.com",
    "avatar_url": "https://default-avatar-url.com/avatar.png"
  }
  ```
- **错误响应 (409 Conflict)**:
  ```json
  {
    "detail": "Email already registered"
  }
  ```

---

## 2. 用户登录

- **Endpoint**: `POST /api/v1/auth/signin`
- **功能描述**: 使用邮箱和密码进行用户认证，成功后返回JWT。
- **请求头**:
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```
- **请求体 (Form Data)**:
  - `username`: 用户的邮箱地址 (e.g., `user@example.com`)
  - `password`: 用户的密码 (e.g., `a_strong_password`)
- **成功响应 (200 OK)**:
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "bearer"
  }
  ```
- **错误响应 (401 Unauthorized)**:
  ```json
  {
    "detail": "Incorrect email or password"
  }
  ``` 