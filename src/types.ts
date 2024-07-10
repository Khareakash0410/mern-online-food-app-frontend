
export type User = {
    _id: string;
    email: string;
    name: string;
    phone: number;
    addressLine1: string;
    city: string;
    country: string;
};

export type MenuItem = {
    _id: string;
    name: string;
    price: number;
};

export type Restaurant = {
    _id: string;
    user: string;
    restaurantName: string;
    city: string;
    country: string;
    delieveryPrice: number;
    estimatedDelieveryTime: number;
    cuisines: string[];
    menuItems: MenuItem[];
    imageUrl: string;
    lastUpdated: string;
};

export type OrderStatus = 
 | "placed"
 | "paid" 
 | "inProgress" 
 | "outForDelievery" 
 | "delievered";

export type Order = {
   _id: string;
   restaurant: Restaurant;
   user: User;
   cartItems: {
     menuItemId: string;
     name: string;
     quantity: string;
   }[];
   delieveryDetails: {
     name: string;
     phone: number;
     addressLine1: string;
     city: string;
     email: string;
   };
   totalAmount: number;
   status: OrderStatus;
   createdAt: string;
   restaurantId: string;
};


export type RestaurantSearchResponse = {
    data: Restaurant[];
    pagination: {
        total: number;
        page: number;
        pages: number;
    };
};