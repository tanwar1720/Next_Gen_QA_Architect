import { expect, test } from '@fixtures/test';
import { TodoPage } from '@web-pages/todo.page';

test.describe('TodoMVC web journey', () => {
  test('creates, completes, filters, and clears todos', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.goto();
    await todoPage.addTodo('Design framework architecture');
    await todoPage.addTodo('Add Cucumber support');

    await expect(todoPage.todoItems).toHaveCount(2);
    await expect(todoPage.todoCount).toContainText('2 items left');

    await todoPage.completeTodo('Design framework architecture');
    await expect(todoPage.todoCount).toContainText('1 item left');

    await todoPage.completedFilter.click();
    await expect(todoPage.todoByName('Design framework architecture')).toBeVisible();
    await expect(todoPage.todoByName('Add Cucumber support')).toBeHidden();

    await todoPage.activeFilter.click();
    await expect(todoPage.todoByName('Add Cucumber support')).toBeVisible();
    await expect(todoPage.todoByName('Design framework architecture')).toBeHidden();

    await todoPage.completedFilter.click();
    await todoPage.clearCompleted();
    await expect(todoPage.todoItems).toHaveCount(0);
  });
});
