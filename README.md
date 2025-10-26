# 🌿 Waste Management System – Frontend

This is the **frontend interface** for the [Waste Management System](https://waste-management-frontend-topaz.vercel.app/), built using **React**, **Vite**, and **Tailwind CSS**.  
It provides a fast, responsive, and intelligent user experience for sustainable waste management through technology and machine learning.

The frontend integrates with the backend API to handle **user authentication**, **recycling requests**, and **waste classification** using an ML model via **Teachable Machine**.

---

## 🚀 Features

- ⚡ **Vite-Powered Build System** for lightning-fast development and hot reloads  
- 🧠 **ML Integration** with **Teachable Machine** for image-based waste classification  
- 👤 **User Authentication** connected to backend JWT APIs  
- ♻️ **Recycling Request Interface** with real-time feedback and email updates  
- 🎨 **Modern UI** built using **Tailwind CSS** and **DaisyUI**  
- ✨ **Smooth Animations** using **Framer Motion** and **GSAP**  
- 🔔 **Notifications** with **React Hot Toast**  
- 🔗 **React Router v7** for seamless navigation  
- 🧩 **Reusable Components** and clean, scalable folder structure  

---

## 🛠️ Tech Stack

| Category | Technologies |
|-----------|--------------|
| **Frontend Framework** | React (Vite + JSX) |
| **Styling** | Tailwind CSS, DaisyUI |
| **Animations** | GSAP, Framer Motion |
| **Routing** | React Router v7 |
| **Notifications** | React Hot Toast |
| **HTTP Client** | Axios |
| **Machine Learning** | Teachable Machine (Image Model) |
| **Icons** | Lucide React, React Icons |

---

## 📁 Project Structure

vite-project/            
│\
├── public/ # Static assets\
├── src/\
│ ├── assets/ # Images, icons, and styles\
│ ├── components/ # Reusable UI components\
│ ├── pages/ # Page-level components (Home, Login, Dashboard)\
│ ├── hooks/ # Custom React hooks\
│ ├── services/ # API and ML integrations\
│ ├── utils/ # Helper functions\
│ ├── App.jsx # Root component\
│ └── main.jsx # App entry point\
│
├── .eslintrc.json # Linting configuration\
├── tailwind.config.js # Tailwind setup\
├── postcss.config.js # PostCSS setup\
├── vite.config.js # Vite configuration\
├── package.json\
└── README.md

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:
```bash
VITE_CLOUDINARY_CLOUD_NAME=Your_cloudinary_name
VITE_CLOUDINARY_UPLOAD_PRESET=Your_cloudinary_preset_name
VITE_API_URL=Backend_URL
```

---

## 🧩 Setup & Installation

Follow these steps to run the project locally:

1. **Clone the repository**
```bash
git clone https://github.com/SambhavJI/Waste-Management.git
cd Waste-Management
```
2. **Install dependencies**
```bash
npm install
```
3. **Configure environment variables**
Create a `.env` file in the root directory with your credentials.

4. **Start the development server**
```bash
npm run dev
```

The app runs by default at [http://localhost:5173](http://localhost:5173).

5. **Build for production**
```bash
npm run build
```

6. **Preview production build**
```bash
npm run preview
```

---

## 🎨 UI Highlights

- Built with **Tailwind CSS 4** and **DaisyUI** for component styling  
- Fully responsive, optimized for both mobile and desktop users  
- Supports animations and transitions powered by **GSAP** and **Framer Motion**
--

## 🧑‍💼 Maintainer  
**Developer:** [SambhavJI](https://github.com/SambhavJI)  
**Project Type:** MERN + ML + Vite  
**License:** MIT  

---
