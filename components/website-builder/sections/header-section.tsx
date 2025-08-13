'use client';

interface HeaderSectionProps {
  title?: string;
  navigation?: string[];
  logo?: string;
  backgroundColor?: string;
  textColor?: string;
}

export function HeaderSection({ 
  title = 'Your Website',
  navigation = ['Home', 'About', 'Services', 'Contact'],
  logo = 'https://via.placeholder.com/120x40/3B82F6/FFFFFF?text=LOGO',
  backgroundColor = '#ffffff',
  textColor = '#1f2937'
}: HeaderSectionProps) {
  return (
    <header 
      className="px-4 md:px-6 py-4 shadow-modern backdrop-blur-sm"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-8 md:h-10 rounded-lg shadow-sm" />
          <h1 className="text-lg md:text-xl font-bold">{title}</h1>
        </div>
        
        <nav className="hidden lg:flex items-center space-x-6">
          {navigation.map((item, index) => (
            <a 
              key={index} 
              href="#" 
              className="hover:opacity-75 transition-all duration-200 font-medium hover:scale-105"
            >
              {item}
            </a>
          ))}
        </nav>
        
        <button className="lg:hidden p-2 rounded-lg hover:bg-black/5 transition-colors duration-200">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}