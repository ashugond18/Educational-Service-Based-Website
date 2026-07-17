// ============================================================
// FIREBASE CONFIG — replace with YOUR project's values
// ============================================================
// How to get these (free, ~5 minutes):
// 1. Go to https://console.firebase.google.com and click "Add project"
// 2. Name it (e.g. "home-tutors-gorakhpur"), finish the wizard
// 3. In the left sidebar, click the </> (Web) icon to register a web app
// 4. Firebase will show you a config object exactly like the one below —
//    copy YOUR values in here
// 5. In the left sidebar go to Build > Authentication > Get Started >
//    enable the "Email/Password" sign-in method
// 6. In the left sidebar go to Build > Firestore Database > Create database
//    (start in "test mode" for now, lock it down later — see note in auth.js)
// ============================================================

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
