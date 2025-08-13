'use client';

interface FooterSectionProps {
  companyName?: string;
  description?: string;
  links?: Array<{ label: string; url: string }>;
  socialLinks?: Array<{ platform: string; url: string }>;
  backgroundColor?: string;
  textColor?: string;
}

export function FooterSection({
  companyName = 'Your Company',
  description = 'Building amazing experiences since 2024',
  links = [
    { label: 'Privacy Policy', url: '#' },
    { label: 'Terms of Service', url: '#' },
    { label: 'Contact', url: '#' }
  ],
  socialLinks = [
    { platform: 'Facebook', url: '#' },
    { platform: 'Twitter', url: '#' },
    { platform: 'LinkedIn', url: '#' }
  ],
  backgroundColor = '#1f2937',
  textColor = '#ffffff'
}: FooterSectionProps) {
  return (
    <footer 
      className="py-8 md:py-12 px-4 md:px-6"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">{companyName}</h3>
            <p className="opacity-80 leading-relaxed text-sm md:text-base">{description}</p>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Quick Links</h4>
            <ul className="space-y-2">
              {links.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url} 
                    className="opacity-80 hover:opacity-100 transition-all duration-200 text-sm md:text-base hover:scale-105 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Follow Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  className="opacity-80 hover:opacity-100 transition-all duration-200 text-sm md:text-base hover:scale-110 inline-block"
                >
                  {social.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-6 md:pt-8 text-center opacity-60">
          <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} {companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}