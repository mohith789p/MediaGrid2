import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../../key.json";

const app =
  getApps().length === 0
    ? initializeApp({
        credential: cert(
          serviceAccount as import("firebase-admin/app").ServiceAccount
        ),
      })
    : getApps()[0];

export const adminDb = getFirestore(app);
