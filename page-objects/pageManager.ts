import { Page } from "@playwright/test";
import { NavigationPage } from "./navigationPage";
import { formLayoutsPage } from "./formLayoutsPage";
import { DatepickerPage } from "./datepickerPage";

export class PageManager{
    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly formLayoutsPage: formLayoutsPage
    private readonly datepickerPage: DatepickerPage

    constructor(page: Page){
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.datepickerPage = new DatepickerPage(this.page)
        this.formLayoutsPage = new formLayoutsPage(this.page)
    }

    navigateTo(){
        return this.navigationPage
    }

    onFormLayoutsPage(){
        return this.formLayoutsPage
    }

    onDatepickerPate(){
        return this.datepickerPage
    }
}