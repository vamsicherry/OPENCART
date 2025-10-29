import {Page,Locator} from '@playwright/test';

export class Register
{
    private readonly page:Page;
    private readonly firstName:Locator;
    private readonly lastName:Locator;
    private readonly email:Locator;
    private readonly telephone:Locator;
    private readonly password:Locator;
    private readonly confirmpassword:Locator;
    private readonly checkbox:Locator;
    private readonly continuepage:Locator;
    private readonly msgConfirmation:Locator;
   

    constructor(page:Page)
    {
         this.page=page;
        
         this.firstName=page.locator('#input-firstname');
         this.lastName=page.locator('#input-lastname');
         this.email=page.locator('#input-email');
         this.telephone=page.locator('#input-telephone');
         this.password=page.locator('#input-password');
         this.confirmpassword=page.locator('#input-confirm');
         this.checkbox=page.locator("input[name='agree']");
         this.continuepage=page.locator('input[value="Continue"]');
         //this.msgConfirmation =page.locator('h1: has-text("Your Account Has Been Created!")');
         this.msgConfirmation = page.locator("h1:has-text('Your Account Has Been Created!')");
    }

    async CreatRegisterPage(firstname:string,lastname:string,emai:string,telepho:string,pass:string,confpass:string):Promise<void>
    {
        
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname);
        await this.email.fill(emai);
        await this.telephone.fill(telepho);
        await this.password.fill(pass);
        await this.confirmpassword.fill(confpass);
        

    }
   /*  Excellent question, Vamsikrishna — this line is using the nullish coalescing operator (??) to ensure that your method always returns a valid string, even if textContent() returns null.

      break it down step by step: */

    async getConfirmMessage():Promise<string>{
         await this.msgConfirmation.waitFor({state:'visible',timeout:3000});
          return  await this.msgConfirmation.textContent() ?? '';
    }
    async clickCheckBox():Promise<void>
    {
        await this.checkbox.click();
        
    }

    async clickContinue():Promise<void>
    {
            await this.continuepage.click();
    }

}
