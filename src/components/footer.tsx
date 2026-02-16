import Link from 'next/link';
import { Twitter, Linkedin, Facebook, Send } from 'lucide-react';
import Logo from './logo';
import { Button } from './ui/button';
import { Input } from './ui/input';

const footerLinks = {
  platform: [
    { label: 'Find a Job', href: '/dashboard' },
    { label: 'Post a Job', href: '#' },
    { label: 'How it Works', href: '#' },
    { label: 'Why Outlier', href: '#' },
  ],
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact Us', href: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Trust & Safety', href: '#' },
  ],
};

const socialLinks = [
  { icon: <Twitter />, href: '#', 'aria-label': 'Twitter' },
  { icon: <Linkedin />, href: '#', 'aria-label': 'LinkedIn' },
  { icon: <Facebook />, href: '#', 'aria-label': 'Facebook' },
];

export default function Footer() {
  return (
    <footer className="bg-sidebar-background text-sidebar-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-sidebar-foreground/70 max-w-xs">
              AI-powered matching for the world's top freelance talent.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  aria-label={link['aria-label']}
                  className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-sidebar-primary tracking-wider">
              Platform
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sidebar-primary tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold text-sidebar-primary tracking-wider">
              Stay up to date
            </h3>
            <p className="mt-4 text-sm text-sidebar-foreground/70">
              Join our newsletter for the latest job opportunities and news.
            </p>
            <form className="mt-4 flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-sidebar-border border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50 focus-visible:ring-sidebar-ring"
              />
              <Button
                type="submit"
                size="icon"
                variant="default"
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-sidebar-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-sidebar-foreground/50">
          <p>
            &copy; {new Date().getFullYear()} Freelance Outlier. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
