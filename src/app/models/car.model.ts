export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  imageUrl: string;
  description: string;
  specifications: {
    engine: string;
    transmission: string;
    mileage: string;
    fuelType: string;
  };
  rating: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
}

export interface Dealer {
  id: string;
  name: string;
  location: string;
  rating: number;
  cars: Car[];
}