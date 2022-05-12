export function getCookieValue(name: string, cookie = document.cookie): string | undefined {
    const start = cookie.indexOf(`${name}=`)
    if (start === -1) return
    let end: number | undefined = cookie.indexOf('; ', start)
    if (end === -1) end = undefined
    return decodeURIComponent(cookie.slice(start + name.length + 1, end))
}
