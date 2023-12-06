import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class DatepickerPage extends HelperBase{
    private readonly page: Page


    constructor(page: Page){
        super(page)
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {
        const calendarInput = this.page.getByPlaceholder('Form Picker')
        await calendarInput.click()
        const dateToAssert = await this.selectDateInTheCalendar(numberOfDaysFromToday)
        await expect(calendarInput).toHaveValue(dateToAssert)

    }
    async selectDatepickerWithRangeFromTOday(startDateFromToday: number, endDateFromToday: number){
        const calendarInput = this.page.getByPlaceholder('Range Picker')
        await calendarInput.click()
        const dateToAssertStart = await this.selectDateInTheCalendar(startDateFromToday)
        const dateToAssertEnd = await this.selectDateInTheCalendar(endDateFromToday)
        const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`
        await expect(calendarInput).toHaveValue(dateToAssert)

    }

    private async selectDateInTheCalendar(numberOfDaysFromToday: number){
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday)
        const expectedDate = date.getDate().toString()
        const expectedMonthShot = date.toLocaleString('En-US', { month: 'short' })
        const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' })
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`

        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expecpectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`

        while (!calendarMonthAndYear.includes(expecpectedMonthAndYear)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }
        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, { exact: true }).click()
        return dateToAssert
    }
}