'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  MessageSquare,
  Bell,
  LogOut,
  Settings,
  Search,
} from 'lucide-react';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import Logo from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { freelancerProfile } from '@/lib/data';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { href: '/dashboard/profile', icon: User, label: 'My Identity' },
  { href: '/dashboard/messages', icon: MessageSquare, label: 'Secure Inbox' },
  { href: '/dashboard/notifications', icon: Bell, label: 'Intel Feed' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar side="left" variant="sidebar" collapsible="icon" className="border-r">
        <SidebarHeader className="h-16 flex items-center px-4 border-b">
          <Logo />
        </SidebarHeader>
        <SidebarContent className="py-6">
          <SidebarMenu className="px-2 space-y-1">
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  className="rounded-lg font-medium"
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4 border-t">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="text-muted-foreground hover:text-destructive transition-colors">
                <Link href="/">
                  <LogOut />
                  <span>Exit Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-8">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden" />
            <div className="hidden md:flex items-center gap-2 text-xs font-bold text-muted-foreground bg-muted px-3 py-1 rounded-full uppercase tracking-tighter">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Live AI Matchmaking Active
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-muted rounded-full px-3 py-1.5 border w-64 group focus-within:ring-1 focus-within:ring-primary transition-all">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input 
                placeholder="Search global intel..." 
                className="bg-transparent border-none outline-none text-xs ml-2 w-full placeholder:text-muted-foreground/60"
              />
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild className="rounded-full h-9 w-9">
                  <Link href="/dashboard/notifications">
                    <Bell className="h-4 w-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Alerts</p>
              </TooltipContent>
            </Tooltip>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full overflow-hidden border p-0"
                >
                  <Avatar className="h-full w-full">
                    <AvatarImage src={freelancerProfile.avatarUrl} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl">
                <DropdownMenuLabel className="font-normal p-4">
                  <p className="font-bold text-sm">{freelancerProfile.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{freelancerProfile.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/dashboard/profile" className="flex items-center w-full">
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer text-destructive focus:text-destructive">
                   <Link href="/" className="flex items-center w-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                   </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 p-6 sm:p-10 bg-background/50">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}