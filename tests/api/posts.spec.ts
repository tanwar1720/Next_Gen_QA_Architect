import { expect, test } from '@fixtures/test';
import { uniqueName } from '@utils/test-data';

test.describe('Posts API smoke', () => {
  test('lists posts', async ({ postsApi }) => {
    const response = await postsApi.list();

    expect(response.ok()).toBeTruthy();
    expect(await response.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
        }),
      ]),
    );
  });

  test('creates a post', async ({ postsApi }) => {
    const response = await postsApi.create({
      title: uniqueName('framework'),
      body: 'Created from the next-gen QA framework smoke test.',
      userId: 1,
    });

    expect(response.status()).toBe(201);
    await expect(response).toBeOK();
  });
});
