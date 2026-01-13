'use client'

import { useState } from 'react'
import {
    isValidHex,
    hexToRgb,
    isValidRgb,
    rgbToHex,
    getContrastTextColor,
} from '@/utils/colors'

export default function Home() {
    const [hex, setHex] = useState('')
    const [hexResult, setHexResult] = useState('Result will appear here.')
    const [hexBg, setHexBg] = useState('transparent')
    const [hexColor, setHexColor] = useState('#d1d5db')

    const [rgb, setRgb] = useState({ r: '', g: '', b: '' })
    const [rgbResult, setRgbResult] = useState('Result will appear here.')
    const [rgbBg, setRgbBg] = useState('transparent')
    const [rgbColor, setRgbColor] = useState('#d1d5db')

    function handleHexToRgb() {
        if (!isValidHex(hex)) {
            setHexResult('Invalid HEX code.')
            setHexBg('transparent')
            setHexColor('#d1d5db')
            return
        }

        const { r, g, b } = hexToRgb(hex)

        setHexResult(`RGB(${r}, ${g}, ${b})`)
        setHexBg(`rgb(${r}, ${g}, ${b})`)
        setHexColor(getContrastTextColor(r, g, b))
    }

    function handleRgbToHex() {
        const r = Number(rgb.r)
        const g = Number(rgb.g)
        const b = Number(rgb.b)

        if (!isValidRgb(r, g, b)) {
            setRgbResult('Invalid RGB values.')
            setRgbBg('transparent')
            setRgbColor('#d1d5db')
            return
        }

        setRgbResult(rgbToHex(r, g, b))
        setRgbBg(`rgb(${r}, ${g}, ${b})`)
        setRgbColor(getContrastTextColor(r, g, b))
    }

    return (
        <main className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">

                {/* HEX TO RGB */}
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold mb-6 text-center text-teal-400">
                        HEX to RGB
                    </h2>

                    <label className="block text-gray-400 mb-2">
                        HEX Code:
                    </label>

                    <input
                        value={hex}
                        onChange={e => setHex(e.target.value)}
                        placeholder="#FFFFFF"
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md mb-4 text-lg"
                    />

                    <button
                        onClick={handleHexToRgb}
                        className="w-full bg-teal-500 hover:bg-teal-600 font-bold py-3 rounded-md mb-4"
                    >
                        Convert
                    </button>

                    <div
                        className="p-6 rounded-md min-h-[100px] flex items-center justify-center text-lg text-center"
                        style={{ backgroundColor: hexBg, color: hexColor }}
                    >
                        {hexResult}
                    </div>
                </div>

                {/* RGB TO HEX */}
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold mb-6 text-center text-indigo-400">
                        RGB to HEX
                    </h2>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                        {(['r', 'g', 'b'] as const).map(c => (
                            <input
                                key={c}
                                type="number"
                                min={0}
                                max={255}
                                placeholder={c.toUpperCase()}
                                value={rgb[c]}
                                onChange={e =>
                                    setRgb({ ...rgb, [c]: e.target.value })
                                }
                                className="p-3 bg-gray-700 border border-gray-600 rounded-md text-lg"
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleRgbToHex}
                        className="w-full bg-indigo-500 hover:bg-indigo-600 font-bold py-3 rounded-md mb-4"
                    >
                        Convert
                    </button>

                    <div
                        className="p-6 rounded-md min-h-[100px] flex items-center justify-center text-lg text-center"
                        style={{ backgroundColor: rgbBg, color: rgbColor }}
                    >
                        {rgbResult}
                    </div>
                </div>
            </div>

            <footer className="w-full text-center p-4">
                <p className="text-sm text-gray-500">
                    © 2025 Created by Luis Henrique Engel Saul.
                </p>
            </footer>
        </main>
    )
}
