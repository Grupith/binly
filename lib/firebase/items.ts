import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  doc,
  getDoc,
  getDocs,
  DocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/app/firebase";
import { Item } from "@/lib/types/item";

// Fetch items from workspace collection
export async function getItemsPaginated(
  workspaceId: string,
  pageSize: number,
  lastDoc?: DocumentSnapshot
) {
  let q = query(
    collection(db, "workspaces", workspaceId, "items"),
    orderBy("createdAt", "desc"),
    limit(pageSize)
  );

  if (lastDoc) {
    q = query(q, startAfter(lastDoc));
  }

  const snapshot = await getDocs(q);

  const items: Item[] = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      description: data.description,
      sku: data.sku,
      status: data.status,
      imageUrl: data.imageUrl,
      mininumber: data.mininumber,
      qty: data.qty,
      tags: data.tags,
      unit: data.unit ?? "pcs",
      locationId: data.locationId,
      locationName: data.locationName,
    };
  });

  return {
    items,
    lastVisible: snapshot.docs[snapshot.docs.length - 1],
  };
}
// Fetch a single item by ID
export async function getItemById(
  workspaceId: string,
  itemId: string
): Promise<Item> {
  const docRef = doc(db, "workspaces", workspaceId, "items", itemId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) throw new Error("Item not found");

  return { id: snap.id, ...snap.data() } as Item;
}
