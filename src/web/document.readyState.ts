import { unreachable } from '../index.js'

export function waitDocumentReadyState(target: DocumentReadyState) {
    if (ok(target)) return Promise.resolve()
    return new Promise<void>((resolve) => {
        const callback = () => {
            if (ok(target)) {
                resolve()
                document.removeEventListener('readystatechange', callback)
            }
        }
        document.addEventListener('readystatechange', callback, { passive: true })
    })
}

function ok(target: DocumentReadyState, current: DocumentReadyState = document.readyState) {
    return score(target) <= score(current)
}
function score(x: DocumentReadyState) {
    if (x === 'loading') return 0
    if (x === 'interactive') return 1
    if (x === 'complete') return 2
    unreachable(x)
}
