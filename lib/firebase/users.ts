import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase";

// 1. Check if user doc exists
export async function checkUserExists(uid: string) {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);
  return docSnap.exists();
}

// 2. Create user doc if it doesn't exist
export async function createUserIfNotExists(user: {
  uid: string;
  name: string;
  email: string;
}) {
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    name: user.name,
    email: user.email,
    workspaces: "", // or [] if you'll change this to array later
    role: "owner",
    plan: "free",
  });
}

// 3. Get the user's workspace field
export async function getUserWorkspace(uid: string) {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    return docSnap.data().workspaces;
  }
  return null;
}
