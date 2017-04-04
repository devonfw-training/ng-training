import {browser, element, by} from 'protractor';

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

  getAuthorOfFirstBookTableRow() {
    return element.all(by.css('app-book-overview table tr')).then(function (tableRows) {
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
