import { BlockPicker } from "react-color";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";

const ColourPicker = ({ title, value, handleChange }) => {
  const handleChangeComplete = (color) => {
    console.log(color);

    value = color.hex
    

    // if (title === 'Main Colour') {
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     fgColour: color.hex, // Update the specific color value in formData
    //   }));
    // } else {
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     bgColour: color.hex, // Update the specific color value in formData
    //   }));
    // }
  };

  return (
    <div className="flex-1 whitespace-nowrap">
      <Label>{title}</Label>
      
      <div className="mt-1">
        <Popover>
          <PopoverTrigger className="flex gap-2 items-center border border-input px-3 py-2 text-sm focus-visible:ring-1 focus-visible:ring-ring rounded-md w-full">
            <div className="w-5 h-5 rounded-md" style={{ backgroundColor: value }}></div>
            <span>{value}</span>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 border-none">
            <BlockPicker
              color={value}
              onChangeComplete={handleChange}
              triangle="top"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default ColourPicker;
