import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { LanguageService } from './core/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private translateService: TranslateService,
    private languageService: LanguageService,
  ) {
    this.initTranslation();
  }

  initTranslation() {
    const language = this.languageService.getLanguage();

    this.translateService.setDefaultLang('en');
    this.translateService.use(language);
  }
}
