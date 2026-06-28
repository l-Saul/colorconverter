'use client'

import { useEffect, useState } from 'react'
import ColorWheel from '@/components/ColorWheel'
import {
    isValidHex,
    hexToRgb,
    isValidRgb,
    rgbToHex,
    hsvToRgb,
    rgbToHsv,
    randomHsv,
    clamp,
    type Hsv,
} from '@/components/colors'

const SURPRISE_LABELS = [
    '🎲 Me surpreenda!',
    '✨ Cor mágica!',
    '🎰 Joga os dados',
    '🪄 Abracadabra',
    '🌈 Quero outra',
    '🚀 Rumo ao desconhecido',
    '🍀 Tô com sorte',
]

function CopyButton({ value }: { value: string }) {
    const [copied, setCopied] = useState(false)

    async function copy() {
        try {
            await navigator.clipboard.writeText(value)
            setCopied(true)
            setTimeout(() => setCopied(false), 1200)
        } catch {
            /* clipboard unavailable */
        }
    }

    return (
        <button
            onClick={copy}
            className="rounded-md bg-white/10 px-3 py-1 text-xs font-medium text-white transition hover:bg-white/20"
        >
            {copied ? 'Copiado!' : 'Copiar'}
        </button>
    )
}

function Card({
    title,
    icon,
    accent,
    children,
}: {
    title: string
    icon: string
    accent: string
    children: React.ReactNode
}) {
    return (
        <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07] hover:shadow-2xl">
            <h2
                className={`mb-5 flex items-center gap-2 text-lg font-extrabold tracking-tight ${accent}`}
            >
                <span className="text-xl transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12">
                    {icon}
                </span>
                {title}
            </h2>
            {children}
        </div>
    )
}

export default function Home() {
    // --- Color picker (wheel) state ---
    const [hsv, setHsv] = useState<Hsv>({ h: 200, s: 80, v: 90 })
    const [surpriseLabel, setSurpriseLabel] = useState(SURPRISE_LABELS[0])
    // History of the last 5 generated colors, newest first.
    const [history, setHistory] = useState<string[]>([])
    const pickerRgb = hsvToRgb(hsv)
    const pickerHex = rgbToHex(pickerRgb.r, pickerRgb.g, pickerRgb.b)

    // Add a hex to the front of the history, de-duped and capped at 5.
    function pushHistory(newHex: string) {
        setHistory(prev =>
            [newHex, ...prev.filter(c => c !== newHex)].slice(0, 5)
        )
    }

    // Start on a fresh random color every visit. This runs after mount on
    // purpose: randomizing during render would mismatch the prerendered
    // (static export) HTML during hydration.
    useEffect(() => {
        const next = randomHsv()
        const rgb = hsvToRgb(next)
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHsv(next)
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHistory([rgbToHex(rgb.r, rgb.g, rgb.b)])
    }, [])

    function randomize() {
        const next = randomHsv()
        const rgb = hsvToRgb(next)
        setHsv(next)
        pushHistory(rgbToHex(rgb.r, rgb.g, rgb.b))
        setSurpriseLabel(
            SURPRISE_LABELS[
                Math.floor(Math.random() * SURPRISE_LABELS.length)
            ]
        )
    }

    function handleNativePicker(hex: string) {
        setHsv(rgbToHsv(hexToRgb(hex)))
    }

    function applyHistoryColor(hex: string) {
        setHsv(rgbToHsv(hexToRgb(hex)))
    }

    // --- HEX -> RGB converter (live) ---
    const [hex, setHex] = useState('')
    const hexValid = isValidHex(hex)
    const hexToRgbResult = hexValid ? hexToRgb(hex) : null

    // --- RGB -> HEX converter (live) ---
    const [rgb, setRgb] = useState({ r: '', g: '', b: '' })
    const rgbNums = {
        r: Number(rgb.r),
        g: Number(rgb.g),
        b: Number(rgb.b),
    }
    const rgbFilled = rgb.r !== '' && rgb.g !== '' && rgb.b !== ''
    const rgbValid =
        rgbFilled && isValidRgb(rgbNums.r, rgbNums.g, rgbNums.b)
    const rgbToHexResult = rgbValid
        ? rgbToHex(rgbNums.r, rgbNums.g, rgbNums.b)
        : null

    // Allow pasting a whole color like "255, 0, 128" or "rgb(255 0 128)"
    // into any field and auto-split it across R, G and B.
    function handleRgbPaste(
        e: React.ClipboardEvent<HTMLInputElement>,
        field: 'r' | 'g' | 'b'
    ) {
        const text = e.clipboardData.getData('text')
        const nums = text.match(/\d+/g)

        if (nums && nums.length >= 3) {
            e.preventDefault()
            const [r, g, b] = nums
            setRgb({ r, g, b })
        } else if (nums && nums.length === 1) {
            // Single number: just drop it into the focused field.
            e.preventDefault()
            setRgb({ ...rgb, [field]: nums[0] })
        }
        // Otherwise let the browser handle the paste normally.
    }

    return (
        <main className="relative min-h-screen overflow-hidden bg-gray-950 px-4 py-12 text-white">
            {/* Ambient background that reacts to the picked color */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div
                    className="animate-float-slow absolute -top-32 -left-24 h-96 w-96 rounded-full opacity-30 blur-3xl transition-colors duration-700"
                    style={{ backgroundColor: pickerHex }}
                />
                <div
                    className="animate-float-slow absolute top-1/3 -right-24 h-96 w-96 rounded-full opacity-20 blur-3xl transition-colors duration-700"
                    style={{
                        backgroundColor: pickerHex,
                        animationDelay: '-6s',
                    }}
                />
                <div className="absolute inset-0 bg-gray-950/40" />
            </div>

            <div className="mx-auto flex max-w-5xl flex-col gap-8">
                <header className="animate-fade-in-up text-center">
                    <h1 className="animate-gradient bg-linear-to-r from-pink-400 via-teal-300 to-indigo-400 bg-clip-text text-5xl font-black tracking-tight text-transparent sm:text-6xl">
                        Chroma
                    </h1>
                    <p className="mt-3 text-gray-400">
                        Seu estúdio de cores favorito! Escolha, converta e copie com um clique.
                    </p>
                </header>

                {/* COLOR PICKER */}
                <div
                    className="animate-fade-in-up"
                    style={{ animationDelay: '0.05s' }}
                >
                    <Card
                        title="Seletor de Cores"
                        icon="🎨"
                        accent="text-pink-400"
                    >
                        <div className="grid items-center gap-8 md:grid-cols-2">
                            <ColorWheel hsv={hsv} onChange={setHsv} />

                            <div className="flex flex-col gap-4">
                                <div
                                    key={pickerHex}
                                    className="animate-pop flex h-28 items-center justify-center rounded-xl shadow-lg ring-1 ring-white/10"
                                    style={{
                                        backgroundColor: pickerHex,
                                        color:
                                            pickerRgb.r * 0.299 +
                                                pickerRgb.g * 0.587 +
                                                pickerRgb.b * 0.114 >
                                            150
                                                ? '#000'
                                                : '#fff',
                                    }}
                                >
                                    <span className="text-xl font-bold tracking-wider">
                                        {pickerHex}
                                    </span>
                                </div>

                                <button
                                    onClick={randomize}
                                    className="group w-full rounded-xl bg-linear-to-r from-pink-500 via-fuchsia-500 to-indigo-500 px-4 py-3 text-base font-bold text-white shadow-lg transition-all duration-200 hover:scale-[1.03] hover:shadow-pink-500/30 active:scale-95"
                                >
                                    <span className="inline-block transition-transform duration-300 group-hover:-rotate-12">
                                        {surpriseLabel}
                                    </span>
                                </button>

                                <ReadoutRow label="HEX" value={pickerHex} />
                                <ReadoutRow
                                    label="RGB"
                                    value={`rgb(${pickerRgb.r}, ${pickerRgb.g}, ${pickerRgb.b})`}
                                />

                                <label className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-sm font-medium text-gray-400">
                                    Seletor nativo
                                    <input
                                        type="color"
                                        value={pickerHex}
                                        onChange={e =>
                                            handleNativePicker(e.target.value)
                                        }
                                        className="h-8 w-12 cursor-pointer rounded bg-transparent"
                                    />
                                </label>

                                {history.length > 0 && (
                                    <div>
                                        <p className="mb-2 text-sm font-medium text-gray-400">
                                            Últimas cores
                                        </p>
                                        <div className="flex gap-2">
                                            {history.map(c => (
                                                <button
                                                    key={c}
                                                    onClick={() =>
                                                        applyHistoryColor(c)
                                                    }
                                                    title={`Usar ${c}`}
                                                    style={{
                                                        backgroundColor: c,
                                                    }}
                                                    className="h-9 flex-1 cursor-pointer rounded-lg ring-1 ring-white/15 transition-transform duration-150 hover:scale-110 hover:ring-white/40"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>

                {/* CONVERTERS */}
                <div
                    className="animate-fade-in-up grid gap-8 md:grid-cols-2"
                    style={{ animationDelay: '0.1s' }}
                >
                    {/* HEX -> RGB */}
                    <Card title="HEX para RGB" icon="🔁" accent="text-teal-400">
                        <label className="mb-2 block text-sm font-medium text-gray-400">
                            Código HEX
                        </label>
                        <input
                            value={hex}
                            onChange={e => setHex(e.target.value)}
                            placeholder="#FFFFFF"
                            className="w-full rounded-lg border border-white/10 bg-white/5 p-3 font-mono text-lg outline-none transition focus:border-teal-400 focus:bg-white/10"
                        />

                        <Result
                            empty={hex.trim() === ''}
                            valid={hexValid}
                            invalidText="Código HEX inválido."
                            bg={
                                hexToRgbResult
                                    ? rgbToHex(
                                          hexToRgbResult.r,
                                          hexToRgbResult.g,
                                          hexToRgbResult.b
                                      )
                                    : undefined
                            }
                            rgb={hexToRgbResult ?? undefined}
                            value={
                                hexToRgbResult
                                    ? `rgb(${hexToRgbResult.r}, ${hexToRgbResult.g}, ${hexToRgbResult.b})`
                                    : ''
                            }
                        />
                    </Card>

                    {/* RGB -> HEX */}
                    <Card title="RGB para HEX" icon="🔂" accent="text-indigo-400">
                        <label className="mb-2 flex items-center justify-between text-sm font-medium text-gray-400">
                            <span>Valores RGB</span>
                            <span className="text-xs text-gray-500">
                                dica: cole “255, 0, 128”
                            </span>
                        </label>
                        <div className="grid grid-cols-3 gap-3">
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
                                    onPaste={e => handleRgbPaste(e, c)}
                                    className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-center font-mono text-lg outline-none transition focus:border-indigo-400 focus:bg-white/10"
                                />
                            ))}
                        </div>

                        <Result
                            empty={!rgbFilled}
                            valid={rgbValid}
                            invalidText="Valores RGB inválidos (0–255)."
                            bg={rgbToHexResult ?? undefined}
                            rgb={
                                rgbValid
                                    ? {
                                          r: clamp(rgbNums.r, 0, 255),
                                          g: clamp(rgbNums.g, 0, 255),
                                          b: clamp(rgbNums.b, 0, 255),
                                      }
                                    : undefined
                            }
                            value={rgbToHexResult ?? ''}
                        />
                    </Card>
                </div>
            </div>

            <footer className="animate-fade-in-up mt-12 text-center">
                <p className="text-sm text-gray-500">
                    Desenvolvido por{' '}
                    <a
                        href="https://luishsaul.com.br"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-gray-300 underline decoration-gray-600 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
                    >
                        Luis Henrique Engel Saul
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="h-3.5 w-3.5"
                        >
                            <path d="M7 17 17 7" />
                            <path d="M7 7h10v10" />
                        </svg>
                    </a>
                </p>
            </footer>
        </main>
    )
}

function ReadoutRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 transition-colors hover:bg-white/10">
            <span className="text-xs font-semibold text-gray-400">{label}</span>
            <span className="font-mono text-sm">{value}</span>
            <CopyButton value={value} />
        </div>
    )
}

function Result({
    empty,
    valid,
    invalidText,
    bg,
    rgb,
    value,
}: {
    empty: boolean
    valid: boolean
    invalidText: string
    bg?: string
    rgb?: { r: number; g: number; b: number }
    value: string
}) {
    const textColor =
        rgb && rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114 > 150
            ? '#000'
            : '#fff'

    return (
        <div
            className="mt-4 flex min-h-22 items-center justify-center gap-3 rounded-xl px-4 text-center text-lg ring-1 ring-white/10 transition"
            style={{
                backgroundColor: valid ? bg : 'transparent',
                color: valid ? textColor : '#9ca3af',
            }}
        >
            {empty ? (
                <span>O resultado aparecerá aqui.</span>
            ) : !valid ? (
                <span>{invalidText}</span>
            ) : (
                <>
                    <span className="font-mono">{value}</span>
                    <CopyButton value={value} />
                </>
            )}
        </div>
    )
}
