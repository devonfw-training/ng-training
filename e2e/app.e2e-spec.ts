import {AppVeryFirstPage} from './app.po';

describe('cli-test-ng4 App', () => {
  let page: AppVeryFirstPage;

  beforeEach(() => {
    page = new AppVeryFirstPage();
  });

  it('should display the book overview dialog with book elements', () => {
    page.navigateTo();
    expect(page.getBookOverviewElement().isPresent()).toBe(true);

    page.getAuthorOfFirstBookTableRow().then(function (author) {
      expect(author).toBe('John Example');
    });

    expect(page.getBookDetailsElement().isPresent()).toBe(false);
  });
});
