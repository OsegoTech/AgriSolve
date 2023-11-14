import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import ReduxProvider from '@/store/redux_provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Leaf',
  description: 'Agri solutions simplified',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ReduxProvider>
        {children}
        <Toaster />
        </ReduxProvider>
      </body>
    </html>
  )
}
