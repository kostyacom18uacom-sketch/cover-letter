import React, { useEffect, useRef, useState } from "react"

export default function CruxCursor({
    size = 36,
    thickness = 3,
    color = "linear-gradient(149deg, #7D5CAD 25.96%, #2A2D65 92.23%)",
    gapSize = 6,
    hoverRotation = 45,
    hoverOpacity = 1,
    hoverSize = 1.2,
    hoverColor = "#838DFF",
    animationDuration = 200,
    endRadius = 0,
    hideOnMobile = true,
    opacity = 1
}) {
    const outerRef = useRef(null) 
    const innerRef = useRef(null) 
    const [mounted, setMounted] = useState(false)

    const mouse = useRef({ x: 0, y: 0 })
    const state = useRef({ hidden: true, linkHovered: false })
    const rafId = useRef()
    const propsRef = useRef({ size, opacity, hoverOpacity, hoverRotation, hoverSize, hoverColor, color, animationDuration, hideOnMobile })

    useEffect(() => {
        propsRef.current = { size, opacity, hoverOpacity, hoverRotation, hoverSize, hoverColor, color, animationDuration, hideOnMobile }
    }, [size, opacity, hoverOpacity, hoverRotation, hoverSize, hoverColor, color, animationDuration, hideOnMobile])

    useEffect(() => setMounted(true), [])

    useEffect(() => {
        if (!mounted) return

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
        if (isMobile && propsRef.current.hideOnMobile) return

        const outer = outerRef.current
        const inner = innerRef.current
        if (!outer || !inner) return

        // Hide native cursor
        document.body.style.cursor = "none"
        const styleEl = document.createElement("style")
        styleEl.innerHTML = `*, *::before, *::after { cursor: none !important; }`
        document.head.appendChild(styleEl)

        let prevHidden = true
        let prevLinkHovered = false

        const tick = () => {
            const {
                size,
                opacity,
                hoverOpacity,
                hoverRotation,
                hoverSize,
                animationDuration,
            } = propsRef.current
            const { hidden, linkHovered } = state.current

            outer.style.transform = `translate(${mouse.current.x - size / 2}px, ${mouse.current.y - size / 2}px)`
            
            // Safety check: if we think we're hovering but the element is gone
            if (linkHovered) {
                const el = document.elementFromPoint(mouse.current.x, mouse.current.y);
                if (!el || !el.closest('a, button, [role="button"]')) {
                    state.current.linkHovered = false;
                }
            }

            if (hidden !== prevHidden || linkHovered !== prevLinkHovered) {
                inner.style.transition = `transform ${animationDuration}ms ease, opacity ${animationDuration}ms ease`
                const rotation = linkHovered ? hoverRotation : 0
                const scale = linkHovered ? hoverSize : 1
                inner.style.transform = `rotate(${rotation}deg) scale(${scale})`
                inner.style.opacity = String(
                    hidden ? 0 : linkHovered ? hoverOpacity : opacity
                )
                
                const targetColor = linkHovered ? propsRef.current.hoverColor : propsRef.current.color
                Array.from(inner.children).forEach(child => {
                    child.style.transition = `background ${animationDuration}ms ease`
                    child.style.background = targetColor
                })

                prevHidden = hidden
                prevLinkHovered = linkHovered
            }

            rafId.current = requestAnimationFrame(tick)
        }

        inner.style.transition = `transform ${animationDuration}ms ease, opacity ${animationDuration}ms ease`
        inner.style.transform = `rotate(0deg) scale(1)`
        inner.style.opacity = "0"

        rafId.current = requestAnimationFrame(tick)

        const onMouseMove = (e) => {
            mouse.current.x = e.clientX
            mouse.current.y = e.clientY
            if (state.current.hidden) {
                state.current.hidden = false
            }
        }

        const onMouseLeave = () => {
            state.current.hidden = true
        }
        const onMouseEnter = () => {
            state.current.hidden = false
        }

        document.addEventListener("mousemove", onMouseMove)
        document.addEventListener("mouseleave", onMouseLeave)
        document.addEventListener("mouseenter", onMouseEnter)

        const updateLinkHover = () => {
            document
                .querySelectorAll(
                    'a, button, [role="button"]'
                )
                .forEach((element) => {
                    element.addEventListener("mouseenter", () => {
                        state.current.linkHovered = true
                    })
                    element.addEventListener("mouseleave", () => {
                        state.current.linkHovered = false
                    })
                })
        }

        updateLinkHover()
        const observer = new MutationObserver(updateLinkHover)
        observer.observe(document.body, { childList: true, subtree: true })

        return () => {
            if (rafId.current) cancelAnimationFrame(rafId.current)
            document.removeEventListener("mousemove", onMouseMove)
            document.removeEventListener("mouseleave", onMouseLeave)
            document.removeEventListener("mouseenter", onMouseEnter)
            observer.disconnect()
            document.body.style.cursor = "auto"
            styleEl.remove()
        }
    }, [mounted, hideOnMobile, animationDuration])

    if (!mounted || typeof window === "undefined") return null
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if (isMobile && hideOnMobile) return null

    const halfGap = gapSize / 2
    const r = `${endRadius}px`

    return (
        <div
            ref={outerRef}
            style={{
                position: "fixed",
                left: 0,
                top: 0,
                width: `${size}px`,
                height: `${size}px`,
                transform: "translate(-999px, -999px)",
                pointerEvents: "none",
                zIndex: 10000,
                willChange: "transform",
            }}
        >
            <div
                ref={innerRef}
                style={{
                    position: "absolute",
                    inset: 0,
                    transform: "rotate(0deg) scale(1)",
                    opacity: 0,
                    willChange: "transform, opacity",
                }}
            >
                {/* Horizontal bar - left */}
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: 0,
                        width: `calc(50% - ${halfGap}px)`,
                        height: `${thickness}px`,
                        background: color,
                        transform: "translateY(-50%)",
                        borderRadius: `${r} 0 0 ${r}`,
                    }}
                />
                {/* Horizontal bar - right */}
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        right: 0,
                        width: `calc(50% - ${halfGap}px)`,
                        height: `${thickness}px`,
                        background: color,
                        transform: "translateY(-50%)",
                        borderRadius: `0 ${r} ${r} 0`,
                    }}
                />
                {/* Vertical bar - top */}
                <div
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: 0,
                        height: `calc(50% - ${halfGap}px)`,
                        width: `${thickness}px`,
                        background: color,
                        transform: "translateX(-50%)",
                        borderRadius: `${r} ${r} 0 0`,
                    }}
                />
                {/* Vertical bar - bottom */}
                <div
                    style={{
                        position: "absolute",
                        left: "50%",
                        bottom: 0,
                        height: `calc(50% - ${halfGap}px)`,
                        width: `${thickness}px`,
                        background: color,
                        transform: "translateX(-50%)",
                        borderRadius: `0 0 ${r} ${r}`,
                    }}
                />
            </div>
        </div>
    )
}
