import {test,expect} from '@playwright/test';


import {SearchPage} from '../pages/SearchPage';

import {TestConfig} from '../test.config';
import { HomePage } from '../pages/HomePage';
import { serialize } from 'v8';


let homep:HomePage;
let searchp:SearchPage;
test.beforeEach('before each',async({page})=>{
    
      await  page.goto(TestConfig.appUrl);
      homep= new HomePage(page);
      searchp= new SearchPage(page);
})

test.afterEach("after each",async({page})=>{

      await page.waitForTimeout(2000);
      await page.close();
})

test('Search product exists',{tag:['@master','@sanity']},async({page})=>{

    await  homep.clickSearchBox(TestConfig.productName);
    await homep.clickSearch();
      expect(await searchp.isSearchResultPageExists()).toBeTruthy();

     const hm=await searchp.isSearchProduct(TestConfig.productName)
     expect(hm).toBeTruthy();



})