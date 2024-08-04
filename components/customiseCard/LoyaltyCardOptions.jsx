import { Input } from "../ui/input"
import { Label } from "../ui/label"

const CustomInput = ({ data }) => {
  console.log(data);
  
  <div>
    <Label>{data.label}</Label>
    <Input type={data.type} placeholder={data.placeholder} />
  </div>
}

const inputs = [
  {
    name: 'campaign_name',
    label: 'Campaign Name',
    type: 'text',
    placeholder: 'Buy X, Get Y'
  },
  {
    name: 'unit',
    label: 'Unit',
    type: 'text',
    placeholder: 'Beans, Cups, Cuts'
  },
  {
    name: 'reward',
    label: 'Reward',
    type: 'text',
    placeholder: 'Free Coffee, 50% Off'
  },
  {
    name: 'qty',
    label: 'Quantity',
    type: 'number',
    placeholder: ''
  },
]

const LoyaltyCardOptions = ({ formData, setFormData }) => {
  return (
    <div>
      {inputs.map((item, index) => (
        <CustomInput data={item} key={item+index} />
      ))}
    </div>
  )
}

export default LoyaltyCardOptions