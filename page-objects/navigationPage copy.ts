import { Locator, Page } from "@playwright/test";

export class NavigationPage {
    readonly page: Page
    readonly fromLayoutsMenuItem: Locator
    readonly datePickerMenuItem: Locator
    readonly smarTableMenuItem: Locator
    readonly toastrMenuItem: Locator
    readonly tooltipMenuItem: Locator
    
    constructor(page: Page){
        this.page = page
        this.fromLayoutsMenuItem = page.getByText('Form Layouts')
        this.datePickerMenuItem = page.getByText('Datepicker')
        this.smarTableMenuItem = page.getByText('Smart Table')
        this.toastrMenuItem = page.getByText('Toastr')
        this.tooltipMenuItem = page.getByText('Tooltip')
    }

    async formLayoutsPage(){
        await this.selectGroupMenuItem('Forms')
        //await this.page.getByText('Forms').click()
        await this.fromLayoutsMenuItem.click()
    }

    async datePickerPage(){
        await this.selectGroupMenuItem('Forms')
        //await this.page.getByText('Forms').click()
        await this.datePickerMenuItem.click()
    }

    async smartTabPage(){
        await this.selectGroupMenuItem('Tables & Data')
       // await this.page.getByText('Tables & Data').click()
        await this.smarTableMenuItem.click()
    }

    async toastrPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
       // await this.page.getByText('Modal & Overlays').click()
        await this.toastrMenuItem.click()
    }

    async toolTipPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
       // await this.page.getByText('Modal & Overlays').click()
        await this.tooltipMenuItem.click()
    }

    private async selectGroupMenuItem(groupItemTitle: string){
        const selectGroupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await selectGroupMenuItem.getAttribute('aria-expanded')
        if(expandedState == 'false'){
            await selectGroupMenuItem.click()
        }
    }
}