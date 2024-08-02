import { ColourPicker } from ".";

const BrandingOptions = ({ formData, setFormData }) => {
  return (
    <div>
      {/* Colour pickers */}
      <div className="flex gap-2 flex-wrap">
        <ColourPicker
          title="Main Colour"
          value={formData.fgColour}
          formData={formData}
          setFormData={setFormData}
        />
        <ColourPicker
          title="Background Colour"
          value={formData.bgColour}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
};

export default BrandingOptions;
