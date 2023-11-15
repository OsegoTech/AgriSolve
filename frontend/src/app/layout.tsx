import './globals.css'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import localFont from 'next/font/local'
import { Toaster } from '@/components/ui/toaster'
import ReduxProvider from '@/store/redux_provider'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/providers/ThemeProvider'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const fontHeading = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
})

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
      <body
        className={cn(
          'font-sans antialiased',
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ReduxProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
