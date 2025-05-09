# 📸 Next Gallery

A sleek and efficient image gallery application built with **Next.js 15**, **Cloudinary**, and **MUI**.
It enables users to effortlessly upload, view, search, and delete images (**CRUD**). Each image supports a detailed fullscreen preview for an enhanced viewing experience.

---

## 🚀 Live Demo

🌐 [Visit the Live Gallery](https://next-image-gallery-rakibul.vercel.app/)

---

## ✨ Features

- 📤 Upload images directly to Cloudinary
- 🖼️ View all uploaded images in a clean gallery layout
- 🔍 Search images by name or tags
- 🗑️ Delete images from the gallery (and Cloudinary)
- 🔎 Click to enlarge any image in a beautiful modal view

---

## 🛠️ Tech Stack

| Tech            | Purpose                          |
|-----------------|----------------------------------|
| **Next.js 15**  | App router-based frontend        |
| **Cloudinary**  | Image storage and delivery       |
| **TypeScript**  | Type-safe development            |
| **MUI (v7)**    | Modern UI components             |

---

## 🖼️ Screenshots


 ![Upload](https://i.ibb.co.com/mr8sqgR0/upload.png) 
 ![Preview](https://i.ibb.co.com/DH8WB1Rw/preview.png) 
 ![Search](https://i.ibb.co.com/2DB5M5G/search.png)

---

## ⚙️ Run Locally

Clone the project

```bash
  git clone https://github.com/Rakibul-98/next_image_gallery.git
```

Go to the project directory

```bash
  cd next_image_gallery
```

Create a `.env.local` file in the root directory and configure the following variables:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key
NEXT_PUBLIC_CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_URL=cloudinary://your_api_key:your_api_secret@your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```


Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```
