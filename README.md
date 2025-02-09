# Travel Planner Web App

## 📌 Project Overview
This is a **Next.js + Redux + Tailwind CSS** web application that allows users to **search for cities**, view detailed information (weather, places to visit, country details), and **save cities** to a personal dashboard.

## ✨ Features
- 🔍 **City Search** – Search for cities and get weather, country, and popular places.
- ☁ **Weather Information** – Fetches real-time weather data.
- 🏛 **Places to Visit** – Displays top attractions using the Foursquare API.
- 📌 **Save Cities** – Users can save cities to a dashboard for later reference.
- 📜 **SEO Optimized** – Uses Open Graph, Twitter Cards, and JSON-LD for better searchability.
- ♿ **Accessibility** – ARIA attributes, keyboard-friendly navigation.
- 🚀 **Performance Optimizations** – Lazy loading, code splitting, caching.
- 📱 **Fully Responsive** – Works across mobile, tablet, and desktop.

## 🚀 Tech Stack
- **Frontend:** Next.js (React 17)
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **APIs Used:**
  - [WeatherStack API](https://weatherstack.com/)
  - [RestCountries API](https://restcountries.com/)
  - [Foursquare API](https://location.foursquare.com/developer/)

---

## 🛠️ Setup Instructions
### 1️⃣ Install Dependencies
```bash
npm install
```


### 3️⃣ Run the Development Server
```bash
npm run dev
```
Now, open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Folder Structure
```
/pages
  /city/[cityName].tsx    # Dynamic City Page
  /dashboard.tsx         # User Dashboard
  index.tsx             # Home Page
/components
  CityCard.tsx          # Reusable City Card
  Header.tsx            # Navbar/Header
/redux
  store.ts              # Redux Store Setup
  citySlice.ts          # Redux Slice for Cities
/api
  foursquare.ts         # API Integration for Places
/styles                # Tailwind CSS Styling
```

---

## ⚡ Optimizations
### ✅ **Accessibility Enhancements**
- `alt` attributes added to all images.
- `aria-label` added for buttons & interactive elements.
- Keyboard navigability ensured.

### ✅ **Performance Boosts**
- **Lazy loading** of images & API calls.
- **Next.js Code Splitting** for optimized bundles.
- **Client-side caching** to reduce redundant API calls.

---

## 📌 API Usage
### 1️⃣ **Fetch Weather Data**
```bash
GET http://api.weatherstack.com/current?access_key=YOUR_API_KEY&query={city}, India
```

### 2️⃣ **Fetch Country Details**
```bash
GET https://restcountries.com/v3.1/name/{country}?fullText=true
```

### 3️⃣ **Fetch Places to Visit** (Foursquare API)
```bash
GET https://api.foursquare.com/v3/places/search?query=tourist attractions&near={city}&limit=5
```

---



