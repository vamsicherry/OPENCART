import {Page,Locator} from '@playwright/test';
import { LogoutPage } from '../pages/LogoutPage';

export class MyAccountPage
{
     private readonly page:Page;
     private readonly myaccountexist:Locator;
     private readonly logoutpage:Locator;


     constructor(page:Page)
     {
        this.page=page;
        this.myaccountexist=page.locator("h2:has-text('My Account')");
        this.logoutpage=page.locator(".dropdown.open ul li a").last();
     }


     async myAccountPage():Promise<string>
    {
          return await this.myaccountexist.textContent() ?? '';
    }

    async clickLogoutPage():Promise<LogoutPage>
    {
           try{
           await this.logoutpage.click();
           return new LogoutPage(this.page);
           }catch(error)
           {
              console.log(`unable to click logout ${error}`)
              throw error;
           }
           
    }
}