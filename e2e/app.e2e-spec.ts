import { AppVeryFirstPage } from './app.po';

describe('cli-test-ng4 App', () => {
  let page: AppVeryFirstPage;

  beforeEach(() => {
    page = new AppVeryFirstPage();
  });

  it('should display the app-book-details element', () => {
    page.navigateTo();
    expect(page.getBookDetailsElement()).toBeDefined();
  });
});
