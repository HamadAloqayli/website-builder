import { WebsiteBuilder } from '@/components/website-builder/website-builder';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <WebsiteBuilder />
    </div>
  );
}