'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  MessageSquare,
  Bell,
  LogOut,
  Settings,
  Search,
  Lightbulb,
  Loader2,
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
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Hub Overview' },
  { href: '/dashboard/ideator', icon: Lightbulb, label: 'Gig Ideator' },
  { href: '/dashboard/profile', icon: User, label: 'Identity' },
  { href: '/dashboard/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/dashboard/notifications', icon: Bell, label: 'Alerts' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <SidebarProvider>
      <Sidebar side="left" collapsible="icon" className="border-r">
        <SidebarHeader className="h-16 flex items-center px-4">
          <Logo />
        </SidebarHeader>
        <SidebarContent className="py-4">
          <SidebarMenu className="px-2 space-y-1">
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  className="rounded-lg"
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4 border-t">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleSignOut} className="text-muted-foreground w-full">
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-8">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden" />
            <div className="hidden md:flex items-center gap-2 text-[10px] font-bold text-muted-foreground bg-secondary px-2.5 py-1 rounded-full uppercase tracking-widest border">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Intelligence Sync Active
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-secondary rounded-full px-4 py-1.5 border w-64">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input 
                placeholder="Search hub..." 
                className="bg-transparent border-none outline-none text-xs ml-2 w-full"
              />
            </div>
            <TooltipProvider>
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
            </TooltipProvider>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full border p-0 overflow-hidden"
                >
                  <Avatar className="h-full w-full">
                    {user?.photoURL ? (
                      <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />
                    ) : (
                      <AvatarFallback className="bg-indigo-600 text-white text-[10px] font-bold">
                        {user?.displayName?.charAt(0) || <User className="h-4 w-4" />}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2">
                <DropdownMenuLabel className="font-normal">
                  <p className="font-bold">{user?.displayName || 'User'}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 p-6 sm:p-10">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}