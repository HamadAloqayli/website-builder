'use client';

interface ContentSectionProps {
  title?: string;
  content?: string;
  image?: string;
  imagePosition?: 'left' | 'right';
  backgroundColor?: string;
}

export function ContentSection({
  title = 'About Our Services',
  content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  image = 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600',
  imagePosition = 'left',
  backgroundColor = '#ffffff'
}: ContentSectionProps) {
  return (
    <section 
      className="py-12 md:py-16 px-4 md:px-6"
      style={{ backgroundColor }}
    >
      <div className="max-w-7xl mx-auto">
        <div className={`flex flex-col lg:flex-row items-center gap-8 md:gap-12 ${
          imagePosition === 'right' ? 'lg:flex-row-reverse' : ''
        }`}>
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 gradient-text">
              {title}
            </h2>
            <div className="prose max-w-none text-slate-700 leading-relaxed">
              {content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-base md:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          
          <div className="flex-1">
            <img 
              src={image} 
              alt={title}
              className="w-full h-auto rounded-2xl shadow-modern hover:shadow-modern-lg transition-all duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}