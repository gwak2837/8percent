import type { Metadata } from 'next'

import localFont from 'next/font/local'

import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
})

export const metadata: Metadata = {
  title: '(테스트) 8퍼센트 - 합리적 금융의 기준, 온투업 1호 금융기관',
  description: '중금리대출과 투자로 금융의 선순환을 만들다. 온투업 1호 금융기관, 8퍼센트',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.className} ${geistSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
