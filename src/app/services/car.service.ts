import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private mockCars: Car[] = [
    {
      id: '1',
      make: 'Rolls-Royce',
      model: 'Ghost',
      year: 2024,
      price: 375000,
      imageUrl: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4',
      description: 'The epitome of luxury and sophistication, the Rolls-Royce Ghost combines timeless elegance with modern technology. Features include a 6.75L V12 engine, handcrafted interior, and the iconic Spirit of Ecstasy ornament.',
      specifications: {
        engine: '6.75L V12 Twin-Turbo',
        transmission: '8-Speed Automatic',
        mileage: '14/20 mpg',
        fuelType: 'Premium Gasoline'
      },
      rating: 4.9,
      reviews: []
    },
    {
      id: '2',
      make: 'Toyota',
      model: 'RAV4',
      year: 2024,
      price: 32000,
      imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb',
      description: 'The Toyota RAV4 is a versatile compact SUV that offers excellent fuel efficiency, advanced safety features, and reliable performance. Perfect for both city driving and weekend adventures.',
      specifications: {
        engine: '2.5L 4-Cylinder',
        transmission: '8-Speed Automatic',
        mileage: '27/35 mpg',
        fuelType: 'Regular Gasoline'
      },
      rating: 4.7,
      reviews: []
    },
    {
      id: '3',
      make: 'Ford',
      model: 'F-150',
      year: 2024,
      price: 45000,
      imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888',
      description: 'The Ford F-150, part of the legendary F-Series, continues to set the standard for pickup trucks. Features best-in-class towing capacity, innovative technology, and rugged durability.',
      specifications: {
        engine: '3.5L EcoBoost V6',
        transmission: '10-Speed Automatic',
        mileage: '20/24 mpg',
        fuelType: 'Regular Gasoline'
      },
      rating: 4.8,
      reviews: []
    }
  ];

  getCars(): Observable<Car[]> {
    return of(this.mockCars);
  }

  getCarById(id: string): Observable<Car | undefined> {
    return of(this.mockCars.find(car => car.id === id));
  }
}