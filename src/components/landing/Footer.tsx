import { Compass, Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  const links = {
    Explore: ["Destinations", "Travel Guides", "Hidden Gems", "Blog"],
    Company: ["About Us", "Careers", "Press", "Contact"],
    Support: ["Help Center", "Safety", "Terms of Service", "Privacy Policy"],
  };

  const socials = [
    { icon: Instagram, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Facebook, href: "#" },
    { icon: Youtube, href: "#" },
  ];

  return (
    <footer className="border-t border-border bg-cream-dark">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-coral">
                <Compass className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                Wanderlust
              </span>
            </a>
            <p className="mb-6 max-w-sm text-muted-foreground">
              Your AI-powered travel companion. Discover, plan, and experience the
              world like never before.
            </p>
            <div className="flex gap-4">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-coral hover:text-primary-foreground"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="mb-4 font-semibold text-foreground">{title}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-muted-foreground transition-colors hover:text-coral"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2024 Wanderlust. All rights reserved.
          </p>
          <p className="mt-2 text-sm text-muted-foreground md:mt-0">
            Made with ❤️ for travelers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
