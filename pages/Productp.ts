import {Page,Locator} from '@playwright/test';
import { TestConfig } from '../test.config';
export class ProductP{

     private readonly quanitiy:Locator;
     private readonly addtoproduct:Locator;
     private readonly  productaddedmessage:Locator;
     private readonly page:Page;
     private readonly btnitems:Locator;
      private readonly productaddcart:Locator;


     constructor(page:Page)
     {
         this.page=page;
         this.quanitiy=page.locator('#input-quantity')
         this.addtoproduct=page.locator('#button-cart').first();
         this.productaddedmessage=page.locator('.alert.alert-success.alert-dismissible');
         this.btnitems=page.locator('#cart').first();
         this.productaddcart=page.locator('strong:has-text("View Cart")');


     }

     async selectQuantity(qu:string)
     {
          await this.quanitiy.clear();
          await this.quanitiy.fill(qu);

     }

     async addCurrentProduct()
     {
          await this.addtoproduct.waitFor({state:'visible',timeout:5000})
          await  this.addtoproduct.click();
     }


     async checkProductconfirmMessage():Promise<boolean>
     {
          await this.productaddedmessage.waitFor({state:'visible',timeout:5000})
          const prod= await this.productaddedmessage.textContent();
          
          return prod?.trim().includes('Success: You have added MacBook') ?? false;
     }

     async clickToViewCart()
     {
            await this.btnitems.click();
            await this.productaddcart.click();
     }



}