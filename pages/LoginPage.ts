import {Page,Locator} from '@playwright/test';

export class LoginPage
{
    private readonly page:Page;
    private readonly userName:Locator;
    private readonly password:Locator;
    private readonly txtErrorMessage:Locator;
    private readonly myaccountexist:Locator;
    private readonly clickLoging:Locator;
    constructor(page:Page)
    {
      this.page=page;
      this.userName=page.locator('#input-email');
      this.password=page.locator('#input-password');
      this.clickLoging=page.locator("input[value='Login']");
      this.txtErrorMessage=page.locator('.alert.alert-danger.alert-dismissible');
       this.myaccountexist=page.locator("h2:has-text('My Account')");
      


    }

    async enterUserNamePassword(uname:string,upas:string):Promise<void>
    {
         await this.userName.clear();
         await this.userName.fill(uname);
          await this.password.clear();
         await this.password.fill(upas);
    }

    async clickLoginPage():Promise<void>
    {
           await this.clickLoging.click();
    }


    async getLoginerroMessage():Promise<string | null>
    {
         return this.txtErrorMessage.textContent() ?? '';
    }
    
     async myAccountPage():Promise<string>
    {
          return await this.myaccountexist.textContent() ?? '';
    }





}