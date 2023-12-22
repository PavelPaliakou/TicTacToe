import { Inter, Delicious_Handrawn } from 'next/font/google'
import './globals.css'

// const inter = Inter({ subsets: ['latin'] })
const delicious = Delicious_Handrawn({ 
  weight: '400', 
  subsets: ['latin'],
  variable: '--font-delicious' 
})

export const metadata = {
  title: 'Tic-Tac-Toe',
  description: 'Simple Tic Tac Toe app',
  author: 'Pavel Paliakou',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={delicious.className}>{children}</body>
    </html>
  )
}
