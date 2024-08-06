import { ColourPicker, FileUpload } from ".";
import { Input } from "../ui/input";

const BrandingOptions = ({ values, handleChange }) => {
  return (
    <div>
      {/* Colour pickers */}
      <div className="flex gap-2 flex-wrap">
        <Input type="color" name="fgColour" id="fgColour" value={values.fgColour} onChange={handleChange} />
        {/* <ColourPicker
          title="Main Colour"
          value={values.bgColour}
          handleChange={handleChange}
          formData={formData}
          setFormData={setFormData}
        /> */}
        {/* <ColourPicker
          title="Background Colour"
          value={formData.bgColour}
          formData={formData}
          setFormData={setFormData}
        /> */}
      </div>

      {/* <FileUpload formData={formData} setFormData={setFormData} /> */}
    </div>
  );
};

export default BrandingOptions;
