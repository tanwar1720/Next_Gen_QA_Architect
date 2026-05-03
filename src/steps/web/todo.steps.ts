import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { TodoPage } from '@web-pages/todo.page';
import type { BddWorld } from '@bdd/world';

function todoPageFor(world: BddWorld): TodoPage {
  if (!world.page) {
    throw new Error('Page was not initialized. Add the @web tag to this scenario.');
  }

  return new TodoPage(world.page);
}

Given('I open the TodoMVC app', async function (this: BddWorld) {
  await todoPageFor(this).goto();
});

When('I add these todos', async function (this: BddWorld, table: DataTable) {
  const todoPage = todoPageFor(this);

  for (const row of table.hashes()) {
    await todoPage.addTodo(row.title);
  }
});

When('I complete the todo {string}', async function (this: BddWorld, title: string) {
  await todoPageFor(this).completeTodo(title);
});

When('I filter completed todos', async function (this: BddWorld) {
  await todoPageFor(this).completedFilter.click();
});

When('I clear completed todos', async function (this: BddWorld) {
  await todoPageFor(this).clearCompleted();
});

Then('I should see {int} todos', async function (this: BddWorld, count: number) {
  await expect(todoPageFor(this).todoItems).toHaveCount(count);
});

Then('I should see {int} active todo remaining', async function (this: BddWorld, count: number) {
  const label = count === 1 ? '1 item left' : `${count} items left`;

  await expect(todoPageFor(this).todoCount).toContainText(label);
});

Then('I should see the todo {string}', async function (this: BddWorld, title: string) {
  await expect(todoPageFor(this).todoByName(title)).toBeVisible();
});

Then('I should not see the todo {string}', async function (this: BddWorld, title: string) {
  await expect(todoPageFor(this).todoByName(title)).toBeHidden();
});
