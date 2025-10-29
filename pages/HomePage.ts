import {Page,Locator} from '@playwright/test';


export class HomePage
{
  private readonly page:Page;
  private readonly searchBox:Locator;
  private readonly searchButton:Locator;
  private readonly myAccount:Locator;
  private readonly Register:Locator;
  private readonly Login:Locator;

  constructor(page:Page)
  {
    this.page=page;
    this.searchBox=page.locator("input[type='text']");
    this.searchButton=page.locator(".input-group-btn");
    this.myAccount=page.locator('.caret');
    this.Register=page.locator("a:has-text('Register')");
    this.Login=page.locator("a:has-text('Login')").first();


  }

  async isHomePageExists():Promise<boolean>

  {
      let title:string=await this.page.title();
      if(title)
      {
        return true
      }else{
        return false
      }
  }

  async clickMyAccount():Promise<void>
  {
      try{
        await this.myAccount.click();
        
      }catch(error)
      {

        console.log(`exception occured while clicking myaccount ${error}`);
        throw error;
      }
        
  }

  async clickRegister():Promise<void>
  {
      try{
        await this.Register.click();
        
      }catch(error)
      {

        console.log(`exception occured while clicking register ${error}`);
        throw error;
      }
        
  }

  async clickLogin():Promise<void>
  {
      try{
        await this.Login.click();
        
      }catch(error)
      {

        console.log(`exception occured while clicking Login ${error}`);
        throw error;
      }
        
  }

  async clickSearchBox(sp:string)
  {
      await this.searchBox.fill(sp);
  }


  async clickSearch()
  {
     await this.searchButton.click();
  }


  

}