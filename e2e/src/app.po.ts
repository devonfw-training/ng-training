import { browser, by, element } from 'protractor';

export class AppVeryFirstPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  getBookOverviewElement() {
    return element(by.css('app-book-overview'));
  }

  getBookDetailsElement() {
    return element(by.css('app-book-details'));
  }
}
