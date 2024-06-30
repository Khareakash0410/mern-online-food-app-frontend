import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";

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
             })),
    imageFile: z.instanceof(File, { message: "image is required" }),
});

type restaurantFormData = z.infer<typeof formScehma>


type Props = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
}

const ManageRestaurantForm = ({ onSave, isLoading }: Props) => {

    const form = useForm<restaurantFormData>({
        resolver: zodResolver(formScehma),
        defaultValues: {
            cuisines: [],
            menuItems: [{ name: "", price: 0 }],
        },
    });

    const onSubmit = (formDataJson: restaurantFormData) => {
        //   convert form data json into form data object
    }

   return(
      <Form {...form}>
             
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 bg-gray-50 p-10 rounded-lg"
            >
                  <DetailsSection />

            </form>

      </Form>
   )

};

export default ManageRestaurantForm;