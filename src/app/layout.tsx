import { Metadata } from "next"
export const metadata: Metadata = {
  title: 'FastSurvey',
  description: 'FastSurvey is a free survey tool that allows you to create and share surveys with ease.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
