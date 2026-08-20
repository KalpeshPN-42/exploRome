# exploRome
"Discover, host, and explore unique stays worldwide with exploRome—where history meets modern travel."
# 🏛️ exploRome — Full-Stack Travel Accommodation & Experience Platform

exploRome is a full-stack web application designed to help users discover, host, and manage property listings and unique stays worldwide. Built with Node.js, Express, MongoDB, and modern Web APIs, exploRome features interactive location mapping, secure authentication, media uploads, and server-side data validation.

---

## ✨ Key Features

- **User Authentication & Authorization:** Secure registration, login, and persistent sessions powered by `Passport.js` and `express-session`.
- **Full Listing Management (CRUD):** Hosts can create, view, update, and delete property listings.
- **Interactive Geolocation & Maps:** Real-time location markers and dynamic popup cards using MapLibre GL JS and OpenFreeMap.
- **Media Uploads:** Cloud image storage and management integrated via `Multer` and `Cloudinary`.
- **Strict Server Validation:** Dynamic schema validation using `Joi` to sanitize input data and block malformed API requests.
- **Encrypted Session Persistence:** Production-ready session storage backed by `connect-mongo` and native `WebCrypto` (`AES-256-GCM`).
- **Reviews & Ratings:** Guests can leave star ratings and reviews on host properties.
- **Robust Error Handling:** Centralized custom error middleware providing clear feedback and graceful fallbacks.

---

## 🛠️ Tech Stack

### **Backend**
- **Runtime & Framework:** Node.js, Express.js
- **Database:** MongoDB, Mongoose ODM
- **Authentication:** Passport.js (Local Strategy)
- **Validation:** Joi
- **Session & Storage:** Express-Session, Connect-Mongo, WebCrypto API

### **Frontend**
- **Templating:** EJS with `ejs-mate` layouts
- **Styling & UI:** CSS3, FontAwesome Icons, Responsive Layouts
- **Maps API:** MapLibre GL JS

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v18 or higher)
- MongoDB (Local instance or MongoDB Atlas Cluster)

### **Installation**

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/KalpeshPN-42/exploRome.git](https://github.com/KalpeshPN-42/exploRome.git)
   cd exploRome
2. **You can visit my website on:**
   https://explorome.onrender.com