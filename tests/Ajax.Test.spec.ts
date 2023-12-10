import test, { expect } from "@playwright/test";

test.beforeEach('before each test', async ({ page }, testInfo) => {
    await page.goto(process.env.URL)
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000)
})

test('auto waiting', async ({page}) => {
    const successButton = page.locator('.bg-success')

    // await successButton.click()

    //const text = await successButton.textContent()
    // await successButton.waitFor({state: 'attached'})
    // const text = await successButton.allTextContents()

    // expect(text).toContain("Data loaded with AJAX get request.")

    await expect(successButton).toHaveText("Data loaded with AJAX get request.", {timeout: 16000})
})

test('alternative waits', async ({page}) => {
    const successButton = page.locator('.bg-success')

    //__ wait for element
    //await page.waitForSelector('.bg-success')

    //__ wait for particular reponse
    //await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //wait for network calls to be comnpleted NOT RECOMMENDED
    await page.waitForLoadState('networkidle', {timeout: 16000})

    const text = await successButton.allTextContents()
    expect(text[0]).toContain("Data loaded with AJAX get request.")
})

test('timeouts', async ({page}) => {
    test.slow()
    //test.setTimeout(10000)
    const successButton = page.locator('.bg-success')
    //await successButton.click({timeout:15000})
    await successButton.click({timeout:16000})
})