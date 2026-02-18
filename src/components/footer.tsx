import Link from 'next/link';
import { Twitter, Linkedin, Facebook, Send, Command } from 'lucide-react';
import Logo from './logo';
import { Button } from './ui/button';
import { Input } from './ui/input';

const footerLinks = {
  platform: [
    { label: 'Talent Network', href: '/dashboard' },
    { label: 'Post a Gig', href: '#' },
    { label: 'AI Ideator', href: '#' },
    { label: 'Skill Verification', href: '#' },
  ],
  company: [
    { label: 'Our Mission', href: '#' },
    { label: 'Intelligence Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  legal: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Compliance', href: '#' },
  ],
};

const socialLinks = [
  { icon: <Twitter className="h-4 w-4" />, href: '#', 'aria-label': 'Twitter' },
  { icon: <Linkedin className="h-4 w-4" />, href: '#', 'aria-label': 'LinkedIn' },
  { icon: <Facebook className="h-4 w-4" />, href: '#', 'aria-label': 'Facebook' },
];

export default function Footer() {
  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-12">
          <div className="col-span-2 md:col-span-4 space-y-6">
            <Logo />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              The intelligent hub for the next generation of global talent. We use neural matching to connect elite freelancers with visionary companies.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  aria-label={link['aria-label']}
                  className="p-2 rounded-full bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Platform</h3>
            <ul className="mt-6 space-y-4">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Company</h3>
            <ul className="mt-6 space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="col-span-2 md:col-span-4 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Newsletter</h3>
            <p className="text-sm text-muted-foreground">Get the latest AI matching insights and high-value project alerts.</p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Email address"
                className="rounded-full bg-secondary border-none focus-visible:ring-1 focus-visible:ring-primary"
              />
              <Button
                type="submit"
                size="icon"
                className="rounded-full shrink-0 shadow-lg shadow-primary/20"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} TalentLink AI. All rights reserved.</p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}