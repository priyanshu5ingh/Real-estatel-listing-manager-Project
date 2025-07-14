# Real Estate Listing Manager

This is a modern web app for managing and browsing real estate listings, designed with a focus on Indian properties and users.

## What Has Been Done

- Set up the project using Vite for fast development.
- Built main pages: Home, About, and Contact.
- Added navigation with a stylish header and links to all pages.
- Created a Hero section with a big headline, search bar, and a new building image.
- Added a row of partner company logos.
- Built a Residencies section with a carousel of property cards, each showing Indian locations and rupee prices, with new building images.
- Made a Value section with an image and an interactive accordion for features.
- Designed a Contact section with a modern, glassy look and glowing buttons.
- Added a Get Started call-to-action bar.
- Finished with a Footer that has the logo and useful links.
- Made everything responsive and visually appealing, with glassmorphism, glowing effects, and smooth animations.
- All content and data is localized for India.

## New: Authentication (Login/Signup)

- Added Firebase authentication setup (see `src/utils/firebase.js`).
- Created Login and Signup pages for users to securely access the platform.
- All authentication UI is localized for India.
- The header now shows Login/Signup links if you are not logged in, and a Logout button if you are logged in (with glowing effects).
- Logging out will redirect you to the login page.

### How to set up authentication
1. Create a Firebase project at https://console.firebase.google.com/.
2. Enable Email/Password authentication in the Firebase console.
3. Copy your Firebase config values and replace the placeholders in `src/utils/firebase.js`.
4. You can now sign up and log in with email and password.

## Updates (Today)

- Redesigned Login and Signup pages to a modern, clean, card-based layout with a left illustration and right form.
- Login and Signup pages are now visually consistent, responsive, and professional.
- Signup page now only asks for Email, Password, and Confirm Password (no full name).
- On successful signup, users are redirected to the Login page with a green success message: "Your account is created, please log in now."
- Removed unused fields and old social login options (like Apple).
- Improved background: solid black with a modern white glow in the corner.
- All error and success messages are clear and user-friendly.
- **Note:** There is no backend yet. The login and signup pages are UI only and not functional.

## How to Use (Authentication)

- **Note:** The authentication pages are currently UI only and do not actually create or log in users. Backend integration will be added in the future.

1. **Run the app locally:**
   - `npm install` (if not already done)
   - `npm run dev`
2. **Sign up:**
   - Go to the Signup page.
   - Enter your email, password, and confirm password.
   - Click "Create Account".
   - You will be redirected to the Login page with a success message.
3. **Log in:**
   - Enter your email and password on the Login page.
   - Click "Login" to access the app.

---

**More features and improvements will be added tomorrow.**

## Next Step

- Push all changes to git to save your progress.

## Tech Stack Used

- **React** (with JSX)
- **Vite** (build tool)
- **React Router DOM** (for page navigation)
- **Framer Motion** (animations)
- **Swiper** (carousel)
- **React CountUp** (animated stats)
- **CSS** (custom, with glassmorphism and modern effects)

## How to Run the Project Locally

1. Make sure you have Node.js and npm (or yarn) installed.
2. Clone this repository to your computer.
3. Open a terminal in the project folder.
4. Install dependencies:
   - With npm: `npm install`
   - Or with yarn: `yarn`
5. Start the development server:
   - With npm: `npm run dev`
   - Or with yarn: `yarn dev`
6. Open your browser and go to the address shown in the terminal (usually http://localhost:5173).

## How to Deploy

You can deploy this app to any static hosting service (like Vercel, Netlify, or GitHub Pages):

1. Build the project for production:
   - With npm: `npm run build`
   - Or with yarn: `yarn build`
2. The final files will be in the `dist` folder.
3. Upload the contents of the `dist` folder to your hosting provider.

---

Feel free to customize and expand this project as you like! 

## 🔐 Authentication & Backend Integration (2024 Update)

- **Authentication:**
  - Login and Signup use Firebase Authentication (Email/Password).
  - The frontend manages user sessions with Firebase.
- **Backend (Node.js/Express/MongoDB):**
  - All property CRUD (add, update, delete, etc.) is handled by the backend API.
  - Protected routes require authentication.
  - The frontend sends the Firebase ID token in the `Authorization` header (`Bearer <token>`) for protected requests.
  - The backend verifies the token using the Firebase Admin SDK.

### How it works
1. **User signs up or logs in via Firebase (UI unchanged).**
2. **When adding a property (or any protected action):**
   - The frontend gets the current user’s Firebase ID token.
   - The token is sent to the backend in the `Authorization` header.
   - The backend verifies the token and allows/denies the request.

### How to Test the Full Flow
1. **Run the backend and frontend as usual.**
2. **Sign up or log in using the Login/Signup pages.**
3. **Try to add a property:**
   - Go to the Add Property page (visible only when logged in).
   - Fill out the form and submit.
   - If logged in, the property will be added via the backend.
   - If not logged in, the backend will reject the request.

### Notes
- You do NOT need to log in separately on the backend.
- All user session management is handled by Firebase on the frontend.
- The backend only accepts requests with a valid Firebase ID token.

--- 