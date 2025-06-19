# Email Verification and Management Service

### Submitted by:
- **ישראל קורד** – 328406756  
- **גבריאל פרננדז** – 123456789  

---

## 📌 Overview

This project provides a backend service built with **Express.js** for verifying and managing email addresses.  
The service includes:

- Email verification via the external **AbstractAPI**
- Management of a **whitelist** (verified emails)
- Management of a **blacklist** (blocked emails)
- Efficient API usage through local caching in JSON files
- Modular code using **ES Modules** and **asynchronous** operations

---

## 🎯 Project Goals

- ✅ Verify email addresses via an external API  
- ✅ Automatically add verified emails to a whitelist  
- ✅ Manage and store a blacklist of unwanted emails  
- ✅ Avoid redundant API calls by checking the whitelist first  

---

## 🧩 API Routes

All routes are under:  
`http://localhost:3000/api`

### ✅ Email Verification

**Endpoint:** `GET /api/validate`  
**Query Parameter Required:** `address=your@email.com`  

**Behavior:**  
1. Checks if email is in the whitelist  
2. If yes → returns valid  
3. If not → queries external API  
4. If API verifies → adds email to whitelist  

---

### 🚫 Blacklist Management

#### ➕ Add Email to Blacklist
- **Endpoint:** `POST /api/blacklist/add`  
- **Body (JSON):**
```json
{
  "email": "spam@example.com"
}
```

#### 📄 Get Blacklist
- **Endpoint:** `GET /api/blacklist`  
- Returns the current blacklist.

#### ❌ Remove Email from Blacklist
- **Endpoint:** `DELETE /api/blacklist/remove`  
- **Body (JSON):**
```json
{
  "email": "spam@example.com"
}
```

---

### ✅ Whitelist Management

#### 📄 Get Whitelist
- **Endpoint:** `GET /api/whitelist`  
- Returns the current whitelist.

#### ➕ Add Email to Whitelist
- **Endpoint:** `POST /api/whitelist/add`  
- **Body (JSON):**
```json
{
  "email": "add@example.com"
}
```

#### ❌ Remove Email from Whitelist
- **Endpoint:** `DELETE /api/whitelist/remove`  
- **Body (JSON):**
```json
{
  "email": "remove@example.com"
}
```

---

## ⚙️ Installation & Usage

### 📦 Dependencies
Install the required packages:
```bash
#we are using express,cors,dotenv,nodemon
npm install
```

### 🚀 Running the Project

**Start production:**
```bash
npm start
# or
node server.js
```

**Start in development (with nodemon):**
```bash
npm run dev
# or
nodemon server.js
```

---

## 🔑 Notes on API Usage

We are using **AbstractAPI** for email validation.  
Due to usage limits, we recommend **minimizing unnecessary tests**.  

If the current API key fails or quota is exceeded, please contact us to get a new `API_KEY`.

---

## 📬 Contact
email: israel070609@gmail.com
Feel free to reach out to us for any issues regarding the API or the project.