import Link from 'next/link';
import { Twitter, Linkedin, Github, Send } from 'lucide-react';
import Logo from './logo';
import { Button } from './ui/button';
import { Input } from './ui/input';

const footerLinks = {
  platform: [
    { label: 'Talent Network', href: '/dashboard' },
    { label: 'Post a Gig', href: '#' },
    { label: 'AI Ideator', href: '#' },
    { label: 'Skill Check', href: '#' },
  ],
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-12">
          <div className="md:col-span-2 lg:col-span-2 space-y-6">
            <Logo />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              The intelligent hub for high-performance talent. Bridging the gap between elite experts and visionary projects through neural matching.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="p-2 rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-4 w-4" />
              </Link>
            </div>
          </div>
          
          <div className="lg:col-start-4">
            <h3 className="text-sm font-bold uppercase tracking-wider">Platform</h3>
            <ul className="mt-6 space-y-4">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider">Company</h3>
            <ul className="mt-6 space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-2 lg:col-span-2 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">Receive the latest AI matching insights and high-value project alerts.</p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Email address"
                className="rounded-full bg-secondary border-none"
              />
              <Button type="submit" size="icon" className="rounded-full shrink-0">
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} TalentLink AI. Built for the future of work.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Cookie Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}