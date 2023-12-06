import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {
    constructor(page: Page){
        super(page)
    }

    async formLayoutsPage(){
        await this.selectGroupMenuItem('Forms')
        //await this.page.getByText('Forms').click()
        await this.page.getByText('Form Layouts').click()
        await this.waitForNumberOfSeconds(1)
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