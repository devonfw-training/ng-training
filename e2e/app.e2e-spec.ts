import {AppVeryFirstPage} from './app.po';

describe('cli-test-ng4 App', () => {
  let page: AppVeryFirstPage;

  beforeEach(() => {
    page = new AppVeryFirstPage();
  });

  it('should display the app-book-overview and the app-book-details elements', () => {
    page.navigateTo();
    expect(page.getBookOverviewElement()).toBeDefined();
    expect(page.getBookDetailsElement()).toBeDefined();
  });
});
