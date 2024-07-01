import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";

const formScehma = z.object({


    restaurantName: z.string({
        required_error: "Restaurant name is required",
    }),

    city: z.string({
        required_error: "City is required",
    }),

    country: z.string({
        required_error: "Country is required",
    }),

    delieveryPrice: z.coerce.number({
        required_error: "Delievery price is required",
        invalid_type_error: "must be a valid number",
    }),

    estimatedDelieveryTime: z.coerce.number({
        required_error: "Estimated delievery time is required",
        invalid_type_error: "must be a valid number",
    }),

    cuisines: z.array(z.string()).nonempty({
        message: "Please select at least one item",
    }),

    menuItems: z.array(
        z.object({
            name: z.string().min(1, "name is required"),
            price: z.coerce.number().min(1, "price is required"),
             })
        ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),
}).refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
});

type RestaurantFormData = z.infer<typeof formScehma>


type Props = {
  restaurant?: Restaurant;
  onSave: ( restaurantFormData: FormData ) => void;
  isLoading: boolean;
}

const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {

    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formScehma),
        defaultValues: {
            cuisines: [],
            menuItems: [{ name: "", price: 0 }],
        },
    });

    useEffect(() => {
           if (!restaurant) {
            return ;
           }

           const delieveryPriceFormatted = parseInt(
            (restaurant.delieveryPrice / 100).toFixed(2)
           );

           const menuItemFormatted = restaurant.menuItems.map((item) => ({
              ...item,
              price: parseInt((item.price / 100).toFixed(2)),
           }));

           const updatedRestaurant = {
            ...restaurant,
            delieveryPrice: delieveryPriceFormatted,
            menuItems: menuItemFormatted,
           };

           form.reset(updatedRestaurant);
}, [form, restaurant]);

    const onSubmit = (formDataJson: RestaurantFormData) => {
       const formData = new FormData();

       formData.append("restaurantName", formDataJson.restaurantName);

       formData.append("city", formDataJson.city);

       formData.append("country", formDataJson.country);

       formData.append("delieveryPrice", (formDataJson.delieveryPrice * 100).toString());

       formData.append("estimatedDelieveryTime", formDataJson.estimatedDelieveryTime.toString());

       formDataJson.cuisines.forEach((cuisine, index) => {
         formData.append(`cuisines[${index}]`, cuisine);
       });

       formDataJson.menuItems.forEach((menuItem, index) => {
          formData.append(`menuItems[${index}][name]`, menuItem.name);
          formData.append(`menuItems[${index}][price]`, (menuItem.price * 100).toString());
       });

       if (formDataJson.imageFile) {
        formData.append(`imageFile`, formDataJson.imageFile);
       }
       

       onSave(formData);
    };



   return(
      <Form {...form}>
             
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 bg-gray-50 p-10 rounded-lg"
            >
                  <DetailsSection />

                  <Separator />

                  <CuisinesSection />

                  <Separator />

                  <MenuSection />

                  <Separator />

                  <ImageSection />

                  {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}

            </form>

      </Form>
   )

};

export default ManageRestaurantForm;