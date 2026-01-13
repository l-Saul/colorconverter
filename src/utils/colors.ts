// utils/colors.ts

export function isValidHex(hex: string): boolean {
    return /^#?[0-9A-Fa-f]{6}$/.test(hex.trim())
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const cleanHex = hex.replace('#', '')

    return {
        r: parseInt(cleanHex.substring(0, 2), 16),
        g: parseInt(cleanHex.substring(2, 4), 16),
        b: parseInt(cleanHex.substring(4, 6), 16),
    }
}

export function isValidRgb(r: number, g: number, b: number): boolean {
    return [r, g, b].every(
        v => !isNaN(v) && v >= 0 && v <= 255
    )
}

export function rgbToHex(r: number, g: number, b: number): string {
    return (
        '#' +
        r.toString(16).padStart(2, '0') +
        g.toString(16).padStart(2, '0') +
        b.toString(16).padStart(2, '0')
    ).toUpperCase()
}

export function getContrastTextColor(
    r: number,
    g: number,
    b: number
): 'black' | 'white' {
    return r * 0.299 + g * 0.587 + b * 0.114 > 150
        ? 'black'
        : 'white'
}
