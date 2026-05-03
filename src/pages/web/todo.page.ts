import type { Locator, Page } from '@playwright/test';
import { selectors } from '@utils/selectors';

export class TodoPage {
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;
  readonly activeFilter: Locator;
  readonly completedFilter: Locator;
  readonly todoCount: Locator;
  readonly clearCompletedButton: Locator;
  private readonly $: ReturnType<typeof selectors>;

  constructor(private readonly page: Page) {
    this.$ = selectors(page);
    this.newTodoInput = this.$.byPlaceholder('What needs to be done?');
    this.todoItems = this.$.byTestId('todo-item');
    this.activeFilter = this.$.byRole('link', { name: 'Active' });
    this.completedFilter = this.$.byRole('link', { name: 'Completed' });
    this.todoCount = this.$.byTestId('todo-count');
    this.clearCompletedButton = this.$.byRole('button', { name: 'Clear completed' });
  }

  async goto(): Promise<void> {
    await this.page.goto('https://demo.playwright.dev/todomvc');
  }

  async addTodo(name: string): Promise<void> {
    await this.newTodoInput.fill(name);
    await this.newTodoInput.press('Enter');
  }

  async completeTodo(name: string): Promise<void> {
    await this.todoByName(name).getByRole('checkbox').check();
  }

  async clearCompleted(): Promise<void> {
    await this.clearCompletedButton.click();
  }

  todoByName(name: string): Locator {
    return this.$.withText(this.todoItems, name);
  }
}
