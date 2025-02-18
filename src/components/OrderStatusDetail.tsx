import { Order } from "@/types";
import { Separator } from "./ui/separator";

type Props = {
  order: Order;
}

const OrderStatusDetail = ({ order }: Props) => {
  
    return (
        <div className="space-y-5">
          <div className="flex flex-col">
             <span className="font-bold">
                  Delievering to:
             </span>
             <span >
                 {order.delieveryDetails.name}
             </span>
             <span>{order.delieveryDetails.phone}</span>
             <span>{order.delieveryDetails.addressLine1}, {order.delieveryDetails.city}</span>
          </div>

          <div className="flex flex-col">
                <span className="font-bold">Your Order</span>
                   <ul>
                    { order.cartItems.map((item) => (
                           <li>
                              {item.name} x {item.quantity}
                           </li>
                        ))}
                    </ul>
                
          </div>

          <Separator />
          <div className="flex flex-col">
                  <span className="font-bold">
                       Total
                  </span>
                  <span>
                    ₹{(order.totalAmount / 100).toFixed(2)}
                  </span>
          </div>
        </div>
    );
};

export default OrderStatusDetail;