import { MainLayout } from '@/components/layout/MainLayout';
import type { ReactNode } from 'react';

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return <MainLayout>{children}</MainLayout>;
}
