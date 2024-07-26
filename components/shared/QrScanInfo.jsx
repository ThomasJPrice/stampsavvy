'use client'

import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react";
import { StampCard } from ".";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";

const QrScanInfo = ({ data, setData }) => {
  if (data === 'No result') return

  var dataArray = data.split('/')
  var businessId = dataArray[0]
  var cardId = dataArray[1]

  const supabase = createClient()

  const [loyaltyData, setLoyaltyData] = useState(null);
  const [businessData, setBusinessData] = useState(null)
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: loyaltyData, error } = await supabase
          .from('loyaltyCards')
          .select()
          .match({ id: cardId, business: businessId })
          .single();

        const { data: businessData } = await supabase.from('business').select().match({ id: businessId }).single()

        setLoyaltyData(loyaltyData);
        setBusinessData(businessData)
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [cardId, businessId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data || !businessData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-2 mt-8">
      <p className="text-xl font-medium">Card Info:</p>

      <div className="flex flex-col gap-1">
        <p className="text-lg">{loyaltyData.customer_name}</p>
        <p>{loyaltyData.points}/{businessData.cardInfo.count} {businessData.cardInfo.unit}</p>

        <StampCard loyaltyData={loyaltyData} businessData={businessData} setData={setData} />
      </div>
    </div>
  )
}

export default QrScanInfo