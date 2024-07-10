import { OrderStatus } from "@/types";

type OrderStatusInfo = {
    label: string;
    value: OrderStatus;
    progressValue: number;
};


export const ORDER_STATUS: OrderStatusInfo[] =  [
    {  label: "Placed", value: "placed", progressValue: 0 }, 
    {
        label: "Awaiting Restaurant Confirmation", value: "paid", progressValue: 25,
    },
    {  label: "In Progress", value: "inProgress", progressValue: 50 }, 
    {  label: "Out for Delievery", value: "outForDelievery", progressValue: 75 }, 
    {  label: "Delievered", value: "delievered", progressValue: 100 }, 

];