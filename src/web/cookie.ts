export function getCookieValue(this: string | undefined, name: string) {
    const cookie = this ?? document.cookie
    const start = cookie.indexOf(`${name}=`)
    if (start === -1) return
    let end: number | undefined = cookie.indexOf('; ', start)
    if (end === -1) end = undefined
    return decodeURIComponent(cookie.slice(start + name.length + 1, end))
}
