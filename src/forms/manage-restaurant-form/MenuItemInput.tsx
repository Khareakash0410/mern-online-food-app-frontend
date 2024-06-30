import { FormField, FormItem } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

type Props = {
   index: number,
   removeMenuItem: () => void;
};

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
  const { control } = useFormContext();
  return (
    <div className="flex flex-row items-end gap-2">
        <FormField 
              control={control}
               name={`menuItems.${index}.name`}
               render={({field}) => 
                  <FormItem>

                  </FormItem> }
               />
    </div>
  )
};

export default MenuItemInput;