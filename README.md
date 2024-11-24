# Connect - Learning Management System (LMS)

An advanced Learning Management System (LMS) built with **Next.js**, designed to provide seamless course management and purchasing for both teachers and students. The platform integrates modern tools for authentication, payments, media streaming, and file management, delivering a robust and user-friendly experience.

---

## 🌐 Live Demo

Check out the live application: [Connect Live Link](https://cloud-course-six.vercel.app/search)

---

## 🚀 Features

### General Features
- **Responsive Design:** Fully responsive user interface powered by **Tailwind CSS** and **ShadCN UI**.
- **Role-Based Access Control:** User authentication and role management (Teacher/Student) with **Clerk**.
- **Secure Payments:** Integrated payment gateway using **Razorpay** for seamless transactions.
- **Video Streaming:** High-quality video hosting and streaming powered by **MUX**.
- **File Uploads:** Effortless course resource uploads with **Uploadthing**.
- **Course Management:** Comprehensive tools for managing courses, including videos, assignments, and more.

### For Teachers
- **Course Creation:** Easily create and manage course modules.
- **Content Upload:** Upload video lectures, PDFs, and other resources.
- **Revenue Tracking:** Monitor course sales and earnings via Razorpay integration.

### For Students
- **Course Enrollment:** Browse and purchase courses with secure payment options.
- **Content Access:** Stream video lectures and download course materials.
- **Progress Tracking:** Keep track of course progress and completed modules.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **UI Styling:** [Tailwind CSS](https://tailwindcss.com/), [ShadCN UI](https://shadcn.dev/)
- **Authentication:** [Clerk](https://clerk.dev/)
- **Payments:** [Razorpay](https://razorpay.com/)
- **Media Streaming:** [MUX](https://www.mux.com/)
- **File Uploads:** [Uploadthing](https://uploadthing.com/)

---

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/lms-nextjs.git
   cd lms-nextjs
## Set Up Environment Variables

2. Create a `.env.local` file in the root directory and add the following:

```env
   NEXT_PUBLIC_CLERK_FRONTEND_API=<Your Clerk Frontend API Key>
   CLERK_API_KEY=<Your Clerk Backend API Key>
   NEXT_PUBLIC_RAZORPAY_KEY=<Your Razorpay Key>
   MUX_TOKEN_ID=<Your MUX Token ID>
   MUX_TOKEN_SECRET=<Your MUX Token Secret>
   UPLOADTHING_SECRET=<Your Uploadthing Secret>
   UPLOADTHING_ID=<Your Uploadthing ID>
```
## Run the Development Server
```bash
npm run dev
```
- Open http://localhost:3000 to view your application in the browser.
---
## 📖 Usage
   - Teachers
      - Sign up and create an account as a teacher.
      - Navigate to the Create Course section to design your course.
      - Upload videos and resources using the integrated MUX and Uploadthing tools.
      - Publish your course and track purchases through the dashboard.
   - Students
      - Sign up and create an account as a student.
      - Browse available courses and select the one you want to enroll in.
      - Make secure payments via Razorpay.
      - Access course content and track your progress.
---
## 🎨 Customization
- UI/UX: Modify components in the components directory to customize the design.
Payment Gateway: Adjust Razorpay configuration in the lib/razorpay.js file.
Authentication: Manage user roles and permissions in auth.js.
---
## 🤝 Contributing
Contributions are welcome! To contribute:

Fork the repository.
1. Create a new branch:
```bash
git checkout -b feature-name
```
2. Make your changes and commit:
```bash
git commit -m "Add feature-name"
```
3. Push the changes:
```bash
git push origin feature-name
```
Create a pull request.
---

## 📜 License
- This project is licensed under the MIT License.
---
## 📞 Contact
- Author: Abhay Joshi
- Email: abhayjoshi201@gmail.com
- GitHub: https://github.com/abhayjoshi201
  
---
