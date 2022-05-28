import { type } from "os";

interface IHolidays {
    id?: number,
    date?:string,
    type?: string,
    day?:boolean|string ,
    description?:string,

}
export type { IHolidays };
