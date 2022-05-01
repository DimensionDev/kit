export function getCookieValue(this: string | undefined, name: string) {
    const cookie = this ?? document.cookie
    const startOf = cookie.indexOf(`${name}=`) + name.length + 1
    const endOf = cookie.indexOf('; ', startOf)
    return decodeURIComponent(cookie.slice(startOf, endOf))
}
