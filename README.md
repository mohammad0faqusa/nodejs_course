# 🚀 Node.js, Express, MongoDB & More — The Complete Bootcamp

> Learn to build **scalable, modern backend applications** using JavaScript, Node.js, Express, and MongoDB — from fundamentals to deployment.

🎓 **Course:** [The Complete Node.js, Express, MongoDB Bootcamp — Udemy](https://www.udemy.com/certificate/UC-e776ba76-aeee-4dd6-b72b-273d34836681/)
📘 **Instructor:** Jonas Schmedtmann  

---

## 📚 Overview  
This repository contains my practice projects and final application developed during the **Node.js, Express, and MongoDB Bootcamp** course.  
The course takes you from backend fundamentals to an advanced, production-ready web application following the **MVC architecture** and **REST API best practices**.

---

## 🧩 Key Features
- Full **RESTful API** built with Node.js and Express  
- **MongoDB + Mongoose** for data modeling and NoSQL storage  
- **MVC architecture** for clean separation of concerns  
- Secure authentication and **JWT-based authorization**  
- File uploads and image processing  
- Advanced query features (filtering, sorting, pagination, field limiting)  
- Geospatial queries and aggregation pipelines  
- **Stripe payment integration**  
- **Email sending** (Mailtrap / Sendgrid)  
- Server-side rendering with **Pug templates**  
- Full **production deployment on Heroku**

---

## 🧠 Technologies Used
| Category | Tools & Libraries |
|-----------|------------------|
| Backend Framework | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcrypt, cookie-parser |
| Payment | Stripe |
| Templating | Pug |
| Security | Helmet, CORS, rate limiting, data sanitization |
| Deployment | Git, GitHub, Heroku |
| Testing | Postman |

---

## 🗂️ Project Structure
```

nodejs_course/
├── controllers/       # Business logic for APIs
├── models/            # Mongoose data models
├── routes/            # Express route definitions
├── public/            # Static files (CSS, JS, images)
├── views/             # Pug templates for SSR
├── utils/             # Reusable utilities (APIFeatures, error handling)
├── app.js             # Express app configuration
├── server.js          # Entry point
└── config.env         # Environment variables

```

---

## ⚙️ How to Run Locally
1. Clone the repository  
   ```bash
   git clone https://github.com/mohammad-faqusa/nodejs_course.git
   cd nodejs_course
```

2. Install dependencies

   ```bash
   npm install
   ```
3. Create a `.env` file in the root folder:

   ```
   NODE_ENV=development
   PORT=3000
   DATABASE=<your_mongo_uri>
   JWT_SECRET=<your_secret_key>
   JWT_EXPIRES_IN=90d
   ```
4. Run the development server

   ```bash
   npm run dev
   ```
5. Visit the app at: [http://localhost:3000](http://localhost:3000)

---

## 🌍 Deployment

The final app is deployed on **Heroku** with environment variables configured through the dashboard.
MongoDB is hosted on **MongoDB Atlas** for scalable cloud data management.

🔗 **Live App:** [glacial-dawn-63470-806b63a95e66.herokuapp.com](https://glacial-dawn-63470-806b63a95e66.herokuapp.com/)

---

## 🧾 Learning Outcomes

* Mastered **Node.js fundamentals** (modules, streams, event loop)
* Built RESTful APIs with Express and connected to MongoDB using Mongoose
* Applied **MVC design pattern** for maintainable architecture
* Implemented **authentication, authorization, and role-based access**
* Worked with **Stripe payments**, **email services**, and **file uploads**
* Deployed full-stack applications to production on Heroku

---

## 👨‍💻 Author

**Mohammad Faqusa**
Full-Stack Developer (Backend-Focused)
📧 [mohammadfaqusa9@gmail.com](mailto:mohammadfaqusa9@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/mohammad-faqusa/) • [GitHub](https://github.com/mohammad-faqusa)

