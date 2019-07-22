import {browser, by, element} from 'protractor';

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

  getAuthorOfFirstBookTableRow() {
    return element.all(by.css('app-book-overview table tr')).then((tableRows) => {
      if (tableRows.length > 1) {
        const firstBookRow = tableRows[1]; // tableRows[0] is the header row
        return firstBookRow.element((by.css('td'))).getText(); // the first <td> is the author
      }
    });
  }

  getBookDetailsElement() {
    return element(by.css('app-book-details'));
  }
}
