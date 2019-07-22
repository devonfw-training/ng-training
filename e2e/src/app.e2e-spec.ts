import {AppVeryFirstPage} from './app.po';
import {browser, logging} from 'protractor';

describe('App tests', () => {
  let page: AppVeryFirstPage;

  beforeEach(() => {
    page = new AppVeryFirstPage();
  });

  it('should display the book overview dialog with book elements', () => {
    page.navigateTo();
    expect(page.getBookOverviewElement().isPresent()).toBe(true);

    page.getAuthorOfFirstBookTableRow().then(author => {
      expect(author).toBe('Douglas Crockford');
    });

    expect(page.getBookDetailsElement().isPresent()).toBe(false);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
