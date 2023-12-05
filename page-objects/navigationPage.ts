import { Locator, Page } from "@playwright/test";

export class NavigationPage {
    readonly page: Page


    constructor(page: Page){
        this.page = page
    }

    async formLayoutsPage(){
        await this.selectGroupMenuItem('Forms')
        //await this.page.getByText('Forms').click()
        await this.page.getByText('Form Layouts').click()
    }

    async datePickerPage(){
        await this.selectGroupMenuItem('Forms')
        //await this.page.getByText('Forms').click()
        await this.page.getByText('Datepicker').click()
    }

    async smartTabPage(){
        await this.selectGroupMenuItem('Tables & Data')
       // await this.page.getByText('Tables & Data').click()
        await this.page.getByText('Smart Table').click()
    }

    async toastrPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
       // await this.page.getByText('Modal & Overlays').click()
        await this.page.getByText('Toastr').click()
    }

    async toolTipPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
       // await this.page.getByText('Modal & Overlays').click()
        await this.page.getByText('Tooltip').click()
    }

    private async selectGroupMenuItem(groupItemTitle: string){
        const selectGroupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await selectGroupMenuItem.getAttribute('aria-expanded')
        if(expandedState == 'false'){
            await selectGroupMenuItem.click()
        }
    }
}