import admin from "firebase-admin";

const firebaseAdminConfig = {
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"), // 🔥 Corrige les sauts de ligne
  }),
};

// Initialiser Firebase Admin si ce n'est pas déjà fait
if (!admin.apps.length) {
  admin.initializeApp(firebaseAdminConfig);
}

export { admin as firebaseAdmin };
