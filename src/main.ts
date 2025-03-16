import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarListComponent } from './app/components/car-list/car-list.component';
import { CarDetailsComponent } from './app/components/car-details/car-details.component';
import { WishlistComponent } from './app/components/wishlist/wishlist.component';
import { ThemeService } from './app/services/theme.service';
import { WishlistService } from './app/services/wishlist.service';

const routes: Routes = [
  { path: '', component: CarListComponent },
  { path: 'cars/:id', component: CarDetailsComponent },
  { path: 'wishlist', component: WishlistComponent }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CarListComponent],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <header class="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
        <nav class="container mx-auto px-4 py-4">
          <div class="flex justify-between items-center">
            <a routerLink="/" class="flex items-center space-x-2">
              <i class="fas fa-car text-blue-600 text-2xl"></i>
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">CarShowcase</h1>
            </a>
            <div class="flex items-center space-x-4">
              <button class="btn-secondary" routerLink="/wishlist">
                <i class="fas fa-heart mr-2"></i>
                <span class="hidden sm:inline">Wishlist</span>
                @if (wishlistCount > 0) {
                  <span class="ml-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {{ wishlistCount }}
                  </span>
                }
              </button>
              <button 
                class="btn-secondary flex items-center" 
                (click)="toggleDarkMode()"
                [attr.aria-label]="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
              >
                <i class="fas" [class]="isDarkMode ? 'fa-sun' : 'fa-moon'" class="text-xl"></i>
                <span class="ml-2 hidden sm:inline">{{ isDarkMode ? 'Light' : 'Dark' }}</span>
              </button>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
      <footer class="bg-white dark:bg-gray-800 mt-12 py-8">
        <div class="container mx-auto px-4">
          <p class="text-center text-gray-600 dark:text-gray-400">
            © {{ currentYear }} CarShowcase. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  `
})
export class App {
  isDarkMode = false;
  currentYear = new Date().getFullYear();
  wishlistCount = 0;

  constructor(
    private themeService: ThemeService,
    private wishlistService: WishlistService
  ) {
    this.themeService.darkMode$.subscribe(
      isDark => this.isDarkMode = isDark
    );

    this.wishlistService.getWishlist().subscribe(
      items => this.wishlistCount = items.length
    );
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }
}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes)
  ]
}).catch(err => console.error(err));