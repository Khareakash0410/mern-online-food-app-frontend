import { useCreateCheckoutSession } from "@/api/OrderApi";
import { useGetRestaurant } from "@/api/RestaurantApi";
import CheckoutButton from "@/components/CheckoutButton";
import MenuItemBook from "@/components/MenuItemBook";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { MenuItem } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  const { createCheckoutSession, isLoading: isCheckoutLoading } = useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
       const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
       return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (menuItem: MenuItem) => {
      setCartItems((prevCartItems) => {
        //   check item in cart already

         const existingCartItem = prevCartItems.find((cartItem) => cartItem._id === menuItem._id)

        // if alreadyin cart then update quantity

        let updatedCartItems;

        if (existingCartItem) {
            updatedCartItems = prevCartItems.map((cartItem) => cartItem._id === menuItem._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
        }

        // if not in cart then add to cart
          else {
            updatedCartItems = [
                ...prevCartItems, {
                    _id: menuItem._id,
                    name: menuItem.name,
                    price: menuItem.price,
                    quantity: 1,
                },
            ];
          }

          sessionStorage.setItem(
            `cartItems-${restaurantId}`,
            JSON.stringify(updatedCartItems)
          );

             return updatedCartItems;

      });
  };

  const removeFromCart = (cartItem: CartItem) => {
      setCartItems((prevCartItems) => {
        const updatedCartItems = prevCartItems.filter(
            (item) => cartItem._id !== item._id
        );

        sessionStorage.setItem(
          `cartItems-${restaurantId}`,
          JSON.stringify(updatedCartItems)
        );

        return updatedCartItems;
      });
  };

  const onCheckout = async (userFormData: UserFormData) => {
    if (!restaurant) {
      return;
    }   

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      delieveryDetails: {
        name: userFormData.name,
        phone: userFormData.phone,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
    };
    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  };

  if (isLoading || !restaurant) {
    return "Loading...";
  }

  return (
    <div className="flex flex-col gap-10">
           <AspectRatio ratio={16 / 5}>
                     <img src={restaurant.imageUrl} 
                            className="w-full rounded-md h-full object-cover" alt=""
                      />
           </AspectRatio>

           <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
                <div className="flex flex-col gap-4">
                       <RestaurantInfo restaurant={restaurant} />
                       <span className="font-bold text-2xl tracking-tight">Menu</span>
                       {restaurant.menuItems.map((menuItem) => (
                            <MenuItemBook 
                                 menuItem={menuItem} 
                                 addToCart={() => addToCart(menuItem)}
                            />
                       ))}
                </div>


                <div>
                    <Card>
                        <OrderSummary 
                             restaurant={restaurant} 
                             cartItems={cartItems} 
                             removeFromCart={removeFromCart}
                        />

                        <CardFooter>
                            <CheckoutButton 
                                disabled={cartItems.length === 0}
                                 onCheckout={onCheckout}
                                 isLoading={isCheckoutLoading}
                            />
                        </CardFooter>
                    </Card>

                    

                </div>
           </div>
    </div>
  );

};

export default DetailPage;