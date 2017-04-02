import { browser, element, by } from 'protractor';

export class AppVeryFirstPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getBookOverviewElement() {
    return element(by.css('app-book-overview'));
  }

  getBookDetailsElement() {
    return element(by.css('app-book-details'));
  }
}
