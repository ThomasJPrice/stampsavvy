import { createCanvas } from "canvas"

const DynamicImage = ({ cardData, businessData }) => {

  const width = 1032
  const height = 336
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = businessData.cardInfo.bgColour
  ctx.fillRect(0, 0, width, height)

  const cupWidth = 30;
  const cupHeight = 50;
  const gap = 10;
  const maxPoints = businessData.cardInfo.qty + 1;

  for (let i = 0; i < maxPoints; i++) {
    ctx.fillStyle = i < cardData.points ? '#ff9900' : '#cccccc';
    ctx.fillRect(i * (cupWidth + gap), height / 2 - cupHeight / 2, cupWidth, cupHeight);
  }

  const buffer = canvas.toDataURL()

  return (
    <div><img src={buffer} alt="" /></div>
  )
}

export default DynamicImage