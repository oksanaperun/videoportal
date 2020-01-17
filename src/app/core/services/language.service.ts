import { Injectable } from '@angular/core';

@Injectable()
export class LanguageService {

  getLanguage(): string {
    return localStorage.getItem('language') || 'en';
  }

  setLanguage(id: string) {
    localStorage.setItem('language', id);
  }
}
