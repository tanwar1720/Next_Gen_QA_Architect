import { test as base } from '@playwright/test';
import { DocsHomePage } from '@pages/docs-home.page';
import { PostsApi } from '@api/posts.api';

type TestFixtures = {
  docsHomePage: DocsHomePage;
  postsApi: PostsApi;
};

export const test = base.extend<TestFixtures>({
  docsHomePage: async ({ page }, use) => {
    await use(new DocsHomePage(page));
  },
  postsApi: async ({ request }, use) => {
    await use(new PostsApi(request));
  },
});

export { expect } from '@playwright/test';
