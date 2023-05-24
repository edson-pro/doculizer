interface Car {
  id: string;
  name: string;
  slug: string;
  description: string;
  images: {
    url: string;
    alt: string;
  }[];
  properties: string[];
  created_at: string;
  litters: string;
  brand: string;
  model: string;
  transmission: string;
  seats: string;
  criteria: string;
  engine: string;
  year: string;
  doors: number;
  features: string[];
  price: number;
  electric_type: string;
  rent_period: string;
  currency: string;
  fuel_type: string;
}

export default Car;
