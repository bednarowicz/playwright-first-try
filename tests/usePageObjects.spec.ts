import { async } from "@angular/core/testing"
import test from "@playwright/test"
import { NavigationPage } from "../page-objects/navigationPage"
import { formLayoutsPage } from "../page-objects/formLayoutsPage"
import { DatepickerPage } from "../page-objects/datepickerPage"
import { PageManager } from "../page-objects/pageManager"
import {faker} from '@faker-js/faker'

test.beforeEach('before each bethod', async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

test('navigate to form page', async ({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTabPage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().toolTipPage()
})

test('parametrized methods', async({page}) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName}${faker.number.int(1000)}@test.com`

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridForm('test@com', "welcome", 'Option 2')
    await pm.onFormLayoutsPage().submitInLIneFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false)

    // await pm.navigateTo().datePickerPage()

    // await pm.onDatepickerPate().selectCommonDatePickerDateFromToday(30)
    // await pm.onDatepickerPate().selectDatepickerWithRangeFromTOday(6, 15)
})