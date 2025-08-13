# Website Builder

A modern, drag-and-drop website builder built with Next.js, React, and TypeScript. Create beautiful, responsive websites with an intuitive visual editor.

![Website Builder](https://img.shields.io/badge/Next.js-13.5.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- **🎨 Visual Drag & Drop Editor** - Intuitive interface for building websites
- **📱 Responsive Design** - All sections are mobile-friendly by default
- **🎯 Pre-built Sections** - Header, Hero, Content, Gallery, and Footer sections
- **⚙️ Real-time Property Editor** - Customize colors, text, images, and more
- **🔄 Live Preview** - See changes instantly as you build
- **📦 Section Library** - Drag and drop pre-designed sections
- **🎨 Modern UI Components** - Built with Radix UI and Tailwind CSS
- **💾 Export/Import** - Save and load website configurations
- **🔧 TypeScript** - Full type safety and better development experience

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd website-builder
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the website builder in action.

## 🏗️ Project Structure

```
website-builder/
├── app/                          # Next.js app directory
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # React components
│   ├── ui/                      # Reusable UI components (shadcn/ui)
│   └── website-builder/         # Website builder specific components
│       ├── builder-header.tsx   # Builder header component
│       ├── builder-layout.tsx   # Main builder layout
│       ├── preview-area.tsx     # Live preview area
│       ├── property-editor.tsx  # Section property editor
│       ├── section-library.tsx  # Section library panel
│       ├── section-renderer.tsx # Section rendering logic
│       ├── website-builder.tsx  # Main builder component
│       └── sections/            # Individual section components
│           ├── content-section.tsx
│           ├── footer-section.tsx
│           ├── gallery-section.tsx
│           ├── header-section.tsx
│           └── hero-section.tsx
├── contexts/                    # React contexts
│   └── website-builder-context.tsx  # Main builder state management
├── hooks/                       # Custom React hooks
│   └── use-toast.ts            # Toast notification hook
├── lib/                         # Utility libraries
│   └── utils.ts                # Common utilities
├── types/                       # TypeScript type definitions
│   └── website-builder.ts      # Builder-specific types
└── configuration files...
```

## 🎯 Available Sections

### 1. Header Section

- Customizable logo and navigation
- Background and text color options
- Responsive navigation menu

### 2. Hero Section

- Eye-catching hero banners
- Customizable title, subtitle, and call-to-action
- Background image with overlay options
- Text alignment controls

### 3. Content Section

- Rich text content areas
- Image placement (left/right)
- Background color customization
- Flexible layout options

### 4. Gallery Section

- Image grid layouts
- Configurable columns and spacing
- Lightbox functionality
- Responsive image display

### 5. Footer Section

- Company information
- Social media links
- Navigation links
- Customizable styling

## 🛠️ Usage

### Building a Website

1. **Add Sections**: Drag sections from the library panel to the preview area
2. **Customize Properties**: Select any section to edit its properties in the property editor
3. **Reorder Sections**: Drag and drop sections to reorder them
4. **Preview**: See your changes in real-time in the preview area
5. **Export**: Save your website configuration for later use

### Key Features

- **Drag & Drop**: Intuitive section management
- **Real-time Editing**: Instant preview of changes
- **Property Controls**: Comprehensive customization options
- **Responsive Design**: All sections work on mobile and desktop
- **Export/Import**: Save and load website configurations

## 🎨 Customization

### Adding New Sections

1. Create a new section component in `components/website-builder/sections/`
2. Add the section type to the `Section` interface in `types/website-builder.ts`
3. Update the `getDefaultProperties` function in the context
4. Add the section to the section library

### Styling

The project uses Tailwind CSS for styling. You can customize:

- Colors in `tailwind.config.ts`
- Global styles in `app/globals.css`
- Component-specific styles in individual components

## 📦 Dependencies

### Core Dependencies

- **Next.js 13.5.1** - React framework
- **React 18.2.0** - UI library
- **TypeScript 5.2.2** - Type safety
- **Tailwind CSS 3.3.3** - Utility-first CSS framework

### UI Components

- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Class Variance Authority** - Component variant management

### Drag & Drop

- **@hello-pangea/dnd** - Drag and drop functionality

### Forms & Validation

- **React Hook Form** - Form management
- **Zod** - Schema validation
- **@hookform/resolvers** - Form validation resolvers

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```
