export type Item = {
  id: string;
  name: string;
  description?: string;
  status: "available" | "checked-out" | "used" | "broken" | "archived";
  imageUrl?: string;
  mininumber: string;
  sku: string;
  qty: number;
  unit: string;
  tags: string[];
  locationId?: string;
  locationName?: string;
};
