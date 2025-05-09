// lib/firebase/workspaces.ts
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";

export interface Workspace {
  id: string;
  name: string;
  // add other fields you expect like `plan`, `members`, etc.
}

export async function getUserWorkspaces(uid: string) {
  const q = query(
    collection(db, "workspaces"),
    where("members", "array-contains", uid)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
