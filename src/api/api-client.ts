import type { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {
  constructor(protected readonly request: APIRequestContext) {}

  protected async get(path: string): Promise<APIResponse> {
    return this.request.get(path);
  }

  protected async post<TBody extends Record<string, unknown>>(
    path: string,
    body: TBody,
  ): Promise<APIResponse> {
    return this.request.post(path, { data: body });
  }
}
