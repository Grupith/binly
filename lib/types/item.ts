export type Item = {
  id: string;
  name: string;
  status: "available" | "checked-out" | "used" | "broken";
  imageUrl?: string;
  mininumber: string;
  qty: number;
  tags: string[];
};
