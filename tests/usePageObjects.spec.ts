import { async } from "@angular/core/testing"
import test from "@playwright/test"
import { NavigationPage } from "../page-objects/navigationPage"
import { formLayoutsPage } from "../page-objects/formLayoutsPage"

test.beforeEach('before each bethod', async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

test('navigate to form page', async ({page}) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datePickerPage()
    await navigateTo.smartTabPage()
    await navigateTo.toastrPage()
    await navigateTo.toolTipPage()
})

test('parametrized methods', async({page}) => {
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new formLayoutsPage(page)

    await navigateTo.formLayoutsPage()
    await onFormLayoutsPage.submitUsingTheGridForm('test@com', "welcome", 'Option 2')
    await onFormLayoutsPage.submitInLIneFormWithNameEmailAndCheckbox('John smith', "test hohn", false)
})