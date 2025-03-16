import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistItems = new BehaviorSubject<Car[]>([]);
  wishlistItems$ = this.wishlistItems.asObservable();

  constructor() {
    // Load wishlist from localStorage on initialization
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      this.wishlistItems.next(JSON.parse(savedWishlist));
    }
  }

  getWishlist(): Observable<Car[]> {
    return this.wishlistItems$;
  }

  addToWishlist(car: Car): void {
    const currentWishlist = this.wishlistItems.value;
    if (!this.isInWishlist(car)) {
      const newWishlist = [...currentWishlist, car];
      this.wishlistItems.next(newWishlist);
      this.saveToLocalStorage(newWishlist);
    }
  }

  removeFromWishlist(carId: string): void {
    const currentWishlist = this.wishlistItems.value;
    const newWishlist = currentWishlist.filter(car => car.id !== carId);
    this.wishlistItems.next(newWishlist);
    this.saveToLocalStorage(newWishlist);
  }

  isInWishlist(car: Car): boolean {
    return this.wishlistItems.value.some(item => item.id === car.id);
  }

  private saveToLocalStorage(wishlist: Car[]): void {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }
} 