import { async, waitForAsync } from '@angular/core/testing'
import { expect, test } from '@playwright/test'

// test.beforeAll('before all', async ({page})=>{

// })
test.beforeEach('before each test', async ({ page }) => {
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locator tutorial', async ({page}) => {
    //by tag name
    await page.locator('input').first().click()

    // byid
    page.locator('#inputEmail1')

    //by class
    page.locator('.nb-transition')

    //by attribute
    page.locator('[placeholder="Email"]')

    //by full class value
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine different selectors
    page.locator('input[placeholder="Email"][nbinput]')

    //by xpath - DO NOT RECOMMENDER
    page.locator('//*[@inputEmail1]')

    //by partial text match
    page.locator(':text{"Using"}')

    //by exact text match
    page.locator(':text-is("Using the Grid")')
})

// test.describe('test suite1', () => {
//     test.beforeEach('before each test', async ({ page }) => {
//         await page.getByText('Forms').click()
//     })

//     test('The first test.', async ({ page }) => {
//         await page.getByText('Form Layouts').click()
//     })

//     test('Navigate to date picker', async ({ page }) => {
//         await page.getByText('Datepicker').click()
//     })
// })

// test.describe('test suite2', () => {
//     test.beforeEach('before each test', async ({ page }) => {
//         await page.getByText('Charts').click()
//     })

//     test('The first test.', async ({ page }) => {
//         await page.getByText('Form Layouts').click()
//     })

//     test('Navigate to date picker', async ({ page }) => {
//         await page.getByText('Datepicker').click()
//     })
// }) 

test('User locators', async ({page}) => {
    await page.getByRole('textbox', {name: "Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()

    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder("Jane Doe").click()

    await page.getByText('Using the Grid').click()

    //await page.getByTestId('').click()

    await page.getByTitle('IoT Dashboard').click()
})

test('Child elements', async ({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 1")').click()
    await page.locator('nb-card').getByRole('button', {name:"Sign in"}).first().click()
    await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('Locating parent element', async ({page}) =>{
    await page.locator('nb-card',{hasText: 'Using the grid'}).getByRole('textbox', {name: 'email'}).click()
    await page.locator('nb-card',{has: page.locator('#inputEmail')}).getByRole('textbox', {name: 'Email'}).click()
    await page.locator('nb-card').filter({hasText:"Basic form"}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: 'Password'}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name: "Email"}).click()

    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: 'Email'}).click()
})

test('Reusing locators', async ({page}) => {

    const basicForm = page.locator('nb-card').filter({hasText:"Basic form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})

    await emailField.fill("Email")
    await basicForm.getByRole('textbox', {name: "Password"}).fill("Password")
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue("Email")
})

test('extracting values', async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText:"Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain("Option 1")

    //attribute & input vale
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')

    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com') 
})

test('assertions', async ({page}) => {
    const basicFormButton = page.locator('nb-card').filter({hasText:"Basic form"}).locator('button')

    //General assertions
    const value = 5
    expect(value).toEqual(5)

    const text = await basicFormButton.textContent()
    expect(text).toEqual('Submit')

    //Locator assertion
    await expect(basicFormButton).toHaveText('Submit')

    //Soft Assertion
    await expect.soft(basicFormButton).toHaveText("Submit")
    await basicFormButton.click()
})