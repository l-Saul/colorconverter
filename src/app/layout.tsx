import type { Metadata } from 'next'
import './globals.css'

const BASE_PATH = '/colorconverter'

export const metadata: Metadata = {
    title: 'Color Converter',
    description:
        'Online tool to convert HEX colors to RGB quickly and accurately.',
    authors: [{ name: 'Luis Henrique Engel Saul' }],
    keywords: [
        'Color Converter',
        'HEX to RGB',
        'RGB to HEX',
        'Web Development',
        'Design',
    ],
    openGraph: {
        title: 'Color Converter',
        description:
            'Convert HEX to RGB and RGB to HEX instantly.',
        url: 'https://l-saul.github.io/colorconverter/',
        siteName: 'Color Converter',
        images: [`${BASE_PATH}/colorconverter1024x1024.png`],
        locale: 'en_US',
        type: 'website',
    },
    icons: {
        icon: [
            {
                url: `${BASE_PATH}/colorconverter32x32.png`,
                sizes: '32x32',
                type: 'image/png',
            },
            {
                url: `${BASE_PATH}/colorconverter512x512.png`,
                sizes: '512x512',
                type: 'image/png',
            },
        ],
        apple: [
            {
                url: `${BASE_PATH}/colorconverter180x180.png`,
                sizes: '180x180',
                type: 'image/png',
            },
        ],
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="bg-gray-900 text-white min-h-screen font-sans">
                {children}
            </body>
        </html>
    )
}
