import { async } from "@angular/core/testing"
import test from "@playwright/test"
import { NavigationPage } from "../page-objects/navigationPage"
import { formLayoutsPage } from "../page-objects/formLayoutsPage"
import { DatepickerPage } from "../page-objects/datepickerPage"
import { PageManager } from "../page-objects/pageManager"
import {faker} from '@faker-js/faker'

test.beforeEach('before each bethod @beforeEach', async ({ page }) => {
    await page.goto('/')
})

test('navigate to form page @smoke @regression', async ({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTabPage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().toolTipPage()
})

test('parametrized methods @smoke', async({page}) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName}${faker.number.int(1000)}@test.com`

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridForm(process.env.USERNAME, process.env.PASSWORD, 'Option 2')
    await page.screenshot({path: 'screenshots/formsLayoutsPage.png'})
    const buffer = await page.screenshot()
    console.log(buffer.toString('base64'))
    await pm.onFormLayoutsPage().submitInLIneFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false)
    await page.locator('nb-card', {hasText: "Inline form"}).screenshot({path: 'screenshots/formsLayoutsPage2.png'})
    // await pm.navigateTo().datePickerPage()

    // await pm.onDatepickerPate().selectCommonDatePickerDateFromToday(30)
    // await pm.onDatepickerPate().selectDatepickerWithRangeFromTOday(6, 15)
})