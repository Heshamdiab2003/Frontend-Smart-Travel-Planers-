import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UnsplashService {
  private readonly accessKey = environment.unsplashAccessKey;
  private readonly cache = new Map<string, string>();

  /**
   * Fetch the best photo URL for a destination from Unsplash.
   * Returns a fallback generic travel image if the API fails.
   */
  async getDestinationPhoto(destination: string): Promise<string> {
    const key = destination.toLowerCase().trim();

    // Return cached result if available
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }

    try {
      const query = encodeURIComponent(`${destination} city travel landmark`);
      const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=1&orientation=landscape&client_id=${this.accessKey}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Unsplash API error');

      const data = await response.json();
      const photo = data?.results?.[0];

      if (!photo) throw new Error('No results');

      // Trigger download event as required by Unsplash API guidelines
      this.triggerDownload(photo.links.download_location);

      const imageUrl = photo.urls.regular; // regular = ~1080px wide, good quality
      this.cache.set(key, imageUrl);
      return imageUrl;

    } catch {
      const fallback = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80';
      this.cache.set(key, fallback);
      return fallback;
    }
  }

  /** Required by Unsplash API guidelines when a photo is used */
  private triggerDownload(downloadLocation: string): void {
    fetch(`${downloadLocation}?client_id=${this.accessKey}`).catch(() => {});
  }
}