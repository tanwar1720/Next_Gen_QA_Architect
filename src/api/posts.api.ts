import type { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiClient } from './api-client';

export type PostPayload = {
  title: string;
  body: string;
  userId: number;
};

export class PostsApi extends ApiClient {
  constructor(request: APIRequestContext) {
    super(request);
  }

  list(): Promise<APIResponse> {
    return this.get('/posts');
  }

  create(payload: PostPayload): Promise<APIResponse> {
    return this.post('/posts', payload);
  }
}
