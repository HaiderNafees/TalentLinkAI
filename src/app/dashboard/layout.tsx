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
  Menu,
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
  { href: '/dashboard', icon: LayoutDashboard, label: 'Professional Hub' },
  { href: '/dashboard/ideator', icon: Lightbulb, label: 'Gig Ideator' },
  { href: '/dashboard/profile', icon: User, label: 'My Identity' },
  { href: '/dashboard/messages', icon: MessageSquare, label: 'Messaging' },
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
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Logo />
          <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
        </div>
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
      <Sidebar side="left" collapsible="icon" className="border-r bg-card shadow-sm">
        <SidebarHeader className="h-20 flex items-center px-6">
          <Logo />
        </SidebarHeader>
        <SidebarContent className="px-4 py-6">
          <SidebarMenu className="space-y-2">
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  className="rounded-xl px-4 h-11 transition-all duration-200"
                >
                  <Link href={item.href}>
                    <item.icon className={`h-5 w-5 ${pathname === item.href ? 'text-indigo-600' : 'text-muted-foreground'}`} />
                    <span className="font-semibold">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4 border-t bg-muted/20">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                onClick={handleSignOut} 
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-xl h-11 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-semibold">Sign Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="bg-background">
        <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b bg-background/95 backdrop-blur-md px-6 lg:px-10">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="lg:hidden" />
            <div className="hidden lg:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/50">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-700">
                Network Sync Active
              </span>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="hidden md:flex items-center bg-secondary/50 rounded-2xl px-4 h-11 border border-border w-80 focus-within:border-indigo-500/50 transition-all">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input 
                placeholder="Search resources..." 
                className="bg-transparent border-none outline-none text-sm ml-3 w-full placeholder:text-muted-foreground/60"
              />
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" asChild className="rounded-2xl h-11 w-11 bg-secondary/50 border hover:bg-secondary">
                    <Link href="/dashboard/notifications">
                      <Bell className="h-5 w-5" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>System Notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-11 w-11 rounded-2xl border bg-secondary/30 p-0 overflow-hidden hover:bg-secondary transition-all"
                >
                  <Avatar className="h-full w-full rounded-2xl">
                    {user?.photoURL ? (
                      <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />
                    ) : (
                      <AvatarFallback className="bg-indigo-600 text-white font-bold text-sm">
                        {user?.displayName?.charAt(0) || <User className="h-5 w-5" />}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 mt-3 rounded-2xl p-2 shadow-2xl border-indigo-100/20">
                <DropdownMenuLabel className="px-3 py-3">
                  <div className="flex flex-col gap-0.5">
                    <p className="font-extrabold text-sm">{user?.displayName || 'Active Member'}</p>
                    <p className="text-[11px] text-muted-foreground truncate font-medium">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="rounded-xl h-10">
                  <Link href="/dashboard/profile" className="flex items-center">
                    <User className="mr-3 h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold text-sm">Identity Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl h-10">
                  <Settings className="mr-3 h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold text-sm">Security & Access</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="rounded-xl h-10 text-destructive focus:bg-destructive/5 focus:text-destructive">
                  <LogOut className="mr-3 h-4 w-4" />
                  <span className="font-bold text-sm">Terminate Session</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-12 overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
