import data from '@/data'
import { ComponentPropsWithoutRef } from 'react'

type GameImgProps = {
  gameId: string
} & ComponentPropsWithoutRef<'img'>

export default function GameImg({ gameId, ...props }: GameImgProps) {
  const url = `${data.cdn_assets_url}/images/games/tiles/${gameId}.jpg`
  return <img loading="lazy" src={url} width={64} height={64} {...props} alt={props.alt ?? `Game: ${gameId}`} />
}
