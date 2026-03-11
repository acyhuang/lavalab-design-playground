import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { LayoutDashboard, Inbox, Settings } from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: false },
  { icon: Inbox, label: 'Inbox', active: false },
  { icon: Settings, label: 'Settings', active: true },
]

export function Sidebar() {
  return (
    <div className="flex flex-col h-screen w-14 border-r bg-background py-3 items-center gap-2 shrink-0">
      {/* Logo */}
      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mb-2">
        <span className="text-primary-foreground text-xs font-bold">L</span>
      </div>

      <Separator className="w-8" />

      {/* Nav items */}
      <nav className="flex flex-col gap-1 flex-1 mt-1">
        {navItems.map(({ icon: Icon, label, active }) => (
          <Tooltip key={label}>
            <TooltipTrigger asChild>
              <Button
                variant={active ? 'secondary' : 'ghost'}
                size="icon"
                className="w-9 h-9"
              >
                <Icon className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">{label}</TooltipContent>
          </Tooltip>
        ))}
      </nav>

      {/* User avatar */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar className="w-8 h-8 cursor-pointer">
            <AvatarImage src="" alt="Jane Doe" />
            <AvatarFallback className="text-xs">JD</AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent side="right">Jane Doe</TooltipContent>
      </Tooltip>
    </div>
  )
}
