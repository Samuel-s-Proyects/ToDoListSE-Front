import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { SeoData } from '../models/seo-data.model';

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(
    private readonly titleService: Title,
    private readonly metaService: Meta,
  ) {}

  update(data: SeoData): void {
    this.titleService.setTitle(`${data.title} | Atom Chat`);

    if (data.description) {
      this.metaService.updateTag({ name: 'description', content: data.description });
    }

    if (data.canonical) {
      this.updateCanonical(data.canonical);
    }
  }

  private updateCanonical(url: string): void {
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
