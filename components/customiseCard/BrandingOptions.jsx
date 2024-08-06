import { ColourPicker, FileUpload } from ".";
import { Input } from "../ui/input";

const BrandingOptions = () => {
  return (
    <div>
      {/* Colour pickers */}
      <div className="flex gap-2 flex-wrap">
        <ColourPicker
          title="Main Colour"
          name='fgColour'
        />
        <ColourPicker
          title="Background Colour"
          name='bgColour'
        />
      </div>

      <FileUpload name='logo' />
    </div>
  );
};

export default BrandingOptions;
