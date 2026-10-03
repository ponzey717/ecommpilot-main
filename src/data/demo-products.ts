export type DemoProduct = {
  slug: string;
  name: string;
  category: string;
  market: "US" | "UK" | "AU";
  supplier: string;
  choice: boolean;
  rating: number;
  sales30d: number;
  margin: number;
  delivery: string;
  targetPrice: string;
  image: string;
};

export const demoProducts: DemoProduct[] = [
  {
    slug: "wireless-over-ear-headphones",
    name: "Wireless over-ear headphones",
    category: "Electronics",
    market: "US",
    supplier: "AliExpress",
    choice: true,
    rating: 4.8,
    sales30d: 428,
    margin: 38,
    delivery: "7–12 days",
    targetPrice: "$34.99",
    image: "/demo/headphones.svg",
  },
  {
    slug: "compact-portable-speaker",
    name: "Compact portable speaker",
    category: "Electronics",
    market: "UK",
    supplier: "AliExpress",
    choice: true,
    rating: 4.7,
    sales30d: 316,
    margin: 27,
    delivery: "8–14 days",
    targetPrice: "£27.99",
    image: "/demo/speaker.svg",
  },
  {
    slug: "adjustable-desktop-phone-stand",
    name: "Adjustable desktop phone stand",
    category: "Office & accessories",
    market: "AU",
    supplier: "AliExpress",
    choice: true,
    rating: 4.9,
    sales30d: 582,
    margin: 52,
    delivery: "7–10 days",
    targetPrice: "A$24.99",
    image: "/demo/phone-stand.svg",
  },
];
