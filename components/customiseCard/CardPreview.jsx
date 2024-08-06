const CardPreview = ({ values }) => {
  return (
    <div className="w-[380px] aspect-[0.644] border fixed">
      <div className="w-full h-full flex flex-col overflow-hidden rounded-[32px]" style={{ backgroundColor: values.bgColour }}> 

      </div>
    </div>
  )
}

export default CardPreview