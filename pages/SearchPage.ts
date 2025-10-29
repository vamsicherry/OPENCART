import {Page,Locator} from '@playwright/test';
import {ProductP} from  '../pages/Productp';

let productpage:ProductP;
export class SearchPage
{
  
    private readonly page:Page;
    private readonly searchBar:Locator;
    private readonly searchPageResult:Locator;


    constructor(page:Page)
    {
        this.page=page
        this.searchBar=page.locator('#content h1');
        this.searchPageResult=page.locator('h4 a');

    }
   
    //
    async isSearchResultPageExists():Promise<boolean>
    {
        try{
          const searcresult= await this.searchBar.textContent();

          return searcresult?.includes('Search -') ?? false;
        }catch(error)
        {
            return false
        }
    }
    async isSearchProduct(productsearchs:string):Promise<boolean>

    {
         try{
                const count= await this.searchPageResult.count();
                for(let i=0;i<count;i++)
                {
                 const produ=this.searchPageResult.nth(i);
                 const sp=await produ.textContent();
                 if(sp===productsearchs)
                 {
                     return true;
                 }
                }
         }catch(error)
         {
                console.log(`Error checking product existence: ${error}`);
         }

         return false;
    }
    
     async selectProduct(searchpp:string):Promise<ProductP | null>
     {
           try{
           const count=await this.searchPageResult.count();
           for(let i=0;i<count;i++)
            {
             const product = this.searchPageResult.nth(i);
             const  mproduct=await product.textContent();
             if(mproduct?.trim()===searchpp)
             {
                 await  product.click();
                 return  new ProductP(this.page);
             }
           }
           console.log(`Product not found: ${searchpp}`);
        }catch(error)
        {
            console.log(`Error selecting product: ${error}`);
        }
        return null;
        
     }


}