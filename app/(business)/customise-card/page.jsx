import CustomiseCardForm from '@/components/shared/CustomiseCardForm';
import { getBusinessDetails } from '@/utils';

async function handleFormSave(formData) {
  'use server';

  console.log(formData);

  // Your server logic to handle form data goes here
  // For example, you might call updateCardInfo or updateGooglePassClass
}

const CustomiseCard = async ({ searchParams }) => {
  const businessData = await getBusinessDetails(searchParams.id);

  if (!businessData) return <div className="p-4">No business with that ID found.</div>;

  const cardInfo = businessData.cardInfo;

  return (
    <div className="px-4 max-w-[1200px] mx-auto mb-16">
      <h1 className="text-primary text-2xl font-semibold text-center py-8">Customise your Loyalty Card Campaign!</h1>
      <CustomiseCardForm cardInfo={cardInfo} onSave={handleFormSave} businessData={businessData} />
    </div>
  );
};

export default CustomiseCard;
