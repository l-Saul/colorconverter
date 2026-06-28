import type { Metadata, Viewport } from 'next'
import './globals.css'

const SITE_URL = 'https://l-saul.github.io/colorchroma/'
const TITLE = 'Chroma: Escolha e Converta Cores'
const DESCRIPTION =
    'Um estúdio de cores super divertido pra escolher suas cores favoritas e converter entre HEX e RGB num instante. Tem roda de cores ao vivo, colar esperto e cópia com um clique!'

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: TITLE,
        template: '%s · Chroma',
    },
    description: DESCRIPTION,
    applicationName: 'Chroma',
    authors: [{ name: 'Luis Henrique Engel Saul' }],
    creator: 'Luis Henrique Engel Saul',
    publisher: 'Luis Henrique Engel Saul',
    category: 'technology',
    keywords: [
        'Chroma',
        'Seletor de Cores',
        'Conversor de Cores',
        'Roda de Cores',
        'HEX para RGB',
        'RGB para HEX',
        'Código de cor HEX',
        'Código de cor RGB',
        'Desenvolvimento Web',
        'Ferramentas de Design',
    ],
    alternates: {
        canonical: '/',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: SITE_URL,
        siteName: 'Chroma',
        locale: 'pt_BR',
        type: 'website',
        // OG image is auto-detected from src/app/opengraph-image.tsx
    },
    twitter: {
        card: 'summary_large_image',
        title: TITLE,
        description: DESCRIPTION,
        creator: '@l-saul',
        // Twitter image is auto-detected from src/app/twitter-image / opengraph-image
    },
    // Favicon is auto-detected from src/app/icon.svg
}

export const viewport: Viewport = {
    themeColor: '#030712',
    colorScheme: 'dark',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-BR">
            <body className="bg-gray-950 text-white min-h-screen font-sans antialiased">
                {children}
            </body>
        </html>
    )
}
