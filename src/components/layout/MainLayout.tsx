import { Header } from './Header';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-slate-900 focus:px-4 focus:py-2 focus:rounded focus:shadow-lg focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
