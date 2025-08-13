'use client';

interface GallerySectionProps {
  title?: string;
  images?: string[];
  columns?: number;
  spacing?: number;
}

export function GallerySection({
  title = 'Our Gallery',
  images = [
    'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg?auto=compress&cs=tinysrgb&w=400'
  ],
  columns = 4,
  spacing = 16
}: GallerySectionProps) {
  const getGridCols = (cols: number) => {
    switch (cols) {
      case 2: return 'grid-cols-1 md:grid-cols-2';
      case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      case 5: return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5';
      case 6: return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6';
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
    }
  };

  return (
    <section className="py-12 md:py-16 px-4 md:px-6 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 gradient-text">
          {title}
        </h2>
        
        <div 
          className={`grid ${getGridCols(columns)}`}
          style={{ gap: `${spacing}px` }}
        >
          {images.map((image, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-2xl shadow-modern hover:shadow-modern-lg transition-all duration-300"
            >
              <img 
                src={image} 
                alt={`Gallery image ${index + 1}`}
                className="w-full h-48 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}