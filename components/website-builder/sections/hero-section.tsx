'use client';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonUrl?: string;
  backgroundImage?: string;
  overlayOpacity?: number;
  textAlign?: 'left' | 'center' | 'right';
}

export function HeroSection({
  title = 'Welcome to Our Amazing Website',
  subtitle = 'Discover incredible features and services that will transform your experience',
  buttonText = 'Get Started',
  buttonUrl = '#',
  backgroundImage = 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200',
  overlayOpacity = 0.4,
  textAlign = 'center'
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />
      
      {/* Content */}
      <div className={`relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-white text-${textAlign}`}>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
        <a 
          href={buttonUrl}
          className="inline-block gradient-primary text-white font-semibold py-3 px-6 md:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-modern hover:shadow-modern-lg"
        >
          {buttonText}
        </a>
      </div>
    </section>
  );
}