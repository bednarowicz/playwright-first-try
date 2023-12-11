import { async } from "@angular/core/testing"
import {test} from "../test-options" // due to this line test implemented by us is used
import { NavigationPage } from "../page-objects/navigationPage"
import { formLayoutsPage } from "../page-objects/formLayoutsPage"
import { DatepickerPage } from "../page-objects/datepickerPage"
import { PageManager } from "../page-objects/pageManager"
import {faker} from '@faker-js/faker'

// test.beforeEach('before each bethod', async ({ page }) => {
//     await page.goto('/')
// })
test('parametrized methods', async({pageManager}) => {
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName}${faker.number.int(1000)}@test.com`

    // await pm.navigateTo().formLayoutsPage()
    await pageManager.onFormLayoutsPage().submitUsingTheGridForm(process.env.USERNAME, process.env.PASSWORD, 'Option 2')
    await pageManager.onFormLayoutsPage().submitInLIneFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false)
})