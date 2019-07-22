import {AppVeryFirstPage} from './app.po';
import { browser, logging } from 'protractor';

describe('App tests', () => {
  let page: AppVeryFirstPage;

  beforeEach(() => {
    page = new AppVeryFirstPage();
  });

  it('should display the app-book-details element', () => {
    page.navigateTo();
    expect(page.getBookDetailsElement()).toBeDefined();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
