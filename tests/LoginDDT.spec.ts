import {test,expect} from '@playwright/test';

import {HomePage} from   '../pages/HomePage';
import {Register} from   '../pages/RegisterPage';
import {TestConfig} from  '../test.config';
import {RandomDataUtil} from '../utils/randomDataGenerator';
import {DataProvider} from  '../utils/dataProvider';
import { LoginPage } from '../pages/LoginPage';
import { log } from 'console';
import {MyAccountPage} from   '../pages/MyAccountPage';

const jsonpath='testdata/logindata.json'
const  JsonTestdata= DataProvider.getTestDataFromJson(jsonpath);



for(const data of JsonTestdata)
{

   test(`Logging Test with Json Data ${data.testName}`,{tag:['@datadriven']},async ({page})=>{
     await page.goto(TestConfig.appUrl);
     const homep=new HomePage(page);
     await homep.clickMyAccount();
     await homep.clickLogin();
     const loginp= new LoginPage(page);
     await loginp.enterUserNamePassword(data.email,data.password);
     await loginp.clickLoginPage();

     if(data.expected.toLowerCase()==='success')
     {
         const accp= new MyAccountPage(page);
         const mpage=await accp.myAccountPage();
         expect(mpage).toBeTruthy();
     }else{
       const val=await   loginp.getLoginerroMessage();
        expect(val).toBe('Warning: No match for E-Mail Address and/or Password.')
     }

   })

}


const csvpath='testdata/logindat.csv'
const  csvdatadriven= DataProvider.getTestDataFromCsv(csvpath);



for(const data of csvdatadriven)
{

   test(`Logging Test with csv Data ${data.testName}`,{tag:['@datadriven']},async ({page})=>{
     await page.goto(TestConfig.appUrl);
     const homep=new HomePage(page);
     await homep.clickMyAccount();
     await homep.clickLogin();
     const loginp= new LoginPage(page);
     await loginp.enterUserNamePassword(data.email,data.password);
     await loginp.clickLoginPage();

     if(data.expected.toLowerCase()==='success')
     {
         const accp= new MyAccountPage(page);
         const mpage=await accp.myAccountPage();
         expect(mpage).toBeTruthy();
     }else{
       const val=await   loginp.getLoginerroMessage();
        expect(val).toBe('Warning: No match for E-Mail Address and/or Password.')
     }

   })

}