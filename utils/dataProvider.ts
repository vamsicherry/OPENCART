import fs from 'fs';
import { parse } from 'csv-parse/sync';

export class DataProvider{

 static getTestDataFromJson(path:string)
 {
    let data:any=JSON.parse(fs.readFileSync(path,'utf-8'));
    return data;


 }

 static getTestDataFromCsv(path:string)
 {
    const filecontent:any=fs.readFileSync(path,'utf-8');
     const value:any=parse(filecontent,{columns:true,skip_empty_lines:true,trim:true})
     return value;

 }
}