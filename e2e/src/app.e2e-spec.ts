import { CliTestNg4Page } from './app.po';

describe('cli-test-ng4 App', () => {
  let page: CliTestNg4Page;

  beforeEach(() => {
    page = new CliTestNg4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Hello World!');
  });
});
