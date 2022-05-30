/// <reference types="user-agent-data-types" />

export function formatFileSize(input = 0, si = isMacPlatform(), fractionDigits = 1) {
    if (input === 0 || Number.isNaN(input)) {
        return '0 B'
    }
    const units = ['', 'K', 'M', 'G', 'T', 'P']
    const base = si ? 1000 : 0x400
    const n = Math.min(Math.floor(Math.log(input) / Math.log(base)), units.length - 1)
    const value = input / Math.pow(base, n)
    const formatted = n === 0 ? value : value.toFixed(fractionDigits)
    return `${formatted} ${units[n]}${si ? '' : 'i'}B`
}

/** @internal */
function isMacPlatform() {
    try {
        return /^Mac/.test(navigator.userAgentData?.platform ?? navigator.platform)
    } catch {
        return false
    }
}
