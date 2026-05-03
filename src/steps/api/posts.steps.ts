import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PostsApi, type PostPayload } from '@api/posts.api';
import type { BddWorld } from '@bdd/world';

Given('the posts API is available', async function (this: BddWorld) {
  await this.initApi();
});

When('I request the list of posts', async function (this: BddWorld) {
  if (!this.api) {
    throw new Error('API context was not initialized. Add the @api tag to this scenario.');
  }

  this.lastResponse = await new PostsApi(this.api).list();
});

When(
  'I create a post with title {string} and body {string}',
  async function (this: BddWorld, title: string, body: string) {
    if (!this.api) {
      throw new Error('API context was not initialized. Add the @api tag to this scenario.');
    }

    const payload: PostPayload = {
      title,
      body,
      userId: 1,
    };

    this.lastResponse = await new PostsApi(this.api).create(payload);
  },
);

Then('the response should be successful', async function (this: BddWorld) {
  expect(this.lastResponse, 'Expected a response from a previous API step').toBeDefined();
  await expect(this.lastResponse!).toBeOK();
});

Then('the response status should be {int}', async function (this: BddWorld, status: number) {
  expect(this.lastResponse, 'Expected a response from a previous API step').toBeDefined();
  expect(this.lastResponse!.status()).toBe(status);
});

Then('the response should include posts', async function (this: BddWorld) {
  expect(this.lastResponse, 'Expected a response from a previous API step').toBeDefined();
  const body = await this.lastResponse!.json();

  expect(body).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
      }),
    ]),
  );
});
