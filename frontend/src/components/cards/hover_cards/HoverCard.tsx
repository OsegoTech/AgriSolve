import { Button } from '@/components/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

interface IShopNavProps {
  children: React.ReactNode
  width: string
  body: React.ReactNode
}

export function HoverCardTemplate({ children, width, body }: IShopNavProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant='link'>{children}</Button>
      </HoverCardTrigger>

      <HoverCardContent className={width}>{body}</HoverCardContent>
    </HoverCard>
  )
}
