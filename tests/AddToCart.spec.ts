import {test,expect} from '@playwright/test';


import {SearchPage} from '../pages/SearchPage';

import {TestConfig} from '../test.config';
import { HomePage } from '../pages/HomePage';
import { ProductP } from '../pages/Productp';


let homep:HomePage;
let searchp:SearchPage;
let productP:ProductP;
test.beforeEach('before each',async({page})=>{
    
      await  page.goto(TestConfig.appUrl);
      homep= new HomePage(page);
      searchp= new SearchPage(page);
      productP= new ProductP(page);
})

test.afterEach("after each",async({page})=>{

      await page.waitForTimeout(2000);
      await page.close();
})


test('Search product exists and add to cart',{tag:['@master','@sanity']},async({page})=>{

    await  homep.clickSearchBox(TestConfig.productName);
    await homep.clickSearch();
      expect(await searchp.isSearchResultPageExists()).toBeTruthy();

     const hm=await searchp.isSearchProduct(TestConfig.productName)
     expect(hm).toBeTruthy();

     if(await searchp.isSearchProduct(TestConfig.productName))
     {

        await  searchp.selectProduct(TestConfig.productName);
        await  productP.selectQuantity(TestConfig.productQuantity)
        await  productP.addCurrentProduct();
        expect(await productP.checkProductconfirmMessage()).toBeTruthy();

        await productP.clickToViewCart();


     }



})