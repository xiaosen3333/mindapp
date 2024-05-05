import { useContext } from "react";
import React from "react";


export interface Record {
    img:string,
    description1:string,
    description2:string,
    date:string,
}
export const RecordsContext = React.createContext<Record[]>([]);


