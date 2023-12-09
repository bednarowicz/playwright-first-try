import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class formLayoutsPage extends HelperBase {
    //private readonly page: Page
    readonly page: Page
    private readonly usingTheGridForm: Locator
    private readonly inLineForm: Locator


    constructor(page: Page){
        super(page)
        this.usingTheGridForm = page.locator('nb-card', { hasText: "Using the Grid"})
        this.inLineForm = page.locator('nb-card', {hasText: "Inline form"})
    }

    async submitUsingTheGridForm(email: string, password: string, optionText: string){
        //const usingTheGridForm = this.page.locator('nb-card', { hasText: "Using the Grid"})
        await this.usingTheGridForm.getByRole('textbox', {name: 'Email'}).fill(email)
        await this.usingTheGridForm.getByRole('textbox', {name: 'Password'}).fill(password)
        await this.usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true})
        await this.usingTheGridForm.getByRole('button').click()
    }
    /**
     * This method provides inline header with user data
     * @param name 
     * @param email 
     * @param rememberMe 
     */
    async submitInLIneFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean){
        //const inLineForm = page.locator('nb-card', {hasText: "Inline form"})
        await this.inLineForm.getByRole('textbox', {name: 'Jane Doe'}).fill(name)
        await this.inLineForm.getByRole('textbox', {name: 'Email'}).fill(email)
        if(rememberMe){
        await this.inLineForm.getByRole('checkbox').check({force: true})
        }
        await this.inLineForm.getByRole('button').click()
    }
}