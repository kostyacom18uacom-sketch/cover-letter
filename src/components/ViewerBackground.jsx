import React, { useEffect, useState, useRef } from 'react'
import MeshGradient from './MeshGradient.jsx'
import GhostWindow from './GhostWindow.jsx'

/**
 * ViewerBackground — динамічний фон ViewerPage.
 * Два шари: MeshGradient (завжди) + GhostWindows (тільки >= 1024px).
 *
 * Safe zone: центральна колонка 50vw ± 340px заборонена для ghost windows.
 * Mouse parallax: smoothed через rAF loop з lerp 0.06.
 *
 * Props:
 *   swipeDirection: 'left' | 'right' | null
 */
export default function ViewerBackground({ swipeDirection }) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
  const [isWide, setIsWide] = useState(false)
  const [positions, setPositions] = useState(null)
  const rafRef = useRef(null)
  const rawMouse = useRef({ x: 0, y: 0 })

  // Показуємо ghost windows тільки на широких екранах
  useEffect(() => {
    const check = () => setIsWide(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Рахуємо безпечні позиції для ghost windows
  useEffect(() => {
    if (!isWide) return

    const calc = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const centerX = vw / 2
      const safeHalfWidth = 340 // 50vw ± 340px = safe zone

      setPositions({
        // Window A: cover-letter.exe — ліва сторона, верхня
        windowA: {
          driftKeyframes: {
            x: [
              20,
              Math.max(20, centerX - safeHalfWidth - 180 - 20),
              40,
              20,
            ],
            y: [
              vh * 0.10,
              vh * 0.18,
              vh * 0.25,
              vh * 0.10,
            ],
          },
        },
        // Window B: match.exe — права сторона, середня
        windowB: {
          driftKeyframes: {
            x: [
              centerX + safeHalfWidth + 20,
              Math.min(vw - 140 - 20, centerX + safeHalfWidth + 80),
              centerX + safeHalfWidth + 40,
              centerX + safeHalfWidth + 20,
            ],
            y: [
              vh * 0.45,
              vh * 0.55,
              vh * 0.65,
              vh * 0.45,
            ],
          },
        },
        // Window C: kostya.exe — ліва сторона, нижня
        windowC: {
          driftKeyframes: {
            x: [
              30,
              Math.max(30, centerX - safeHalfWidth - 160 - 30),
              50,
              30,
            ],
            y: [
              vh * 0.60,
              vh * 0.68,
              vh * 0.75,
              vh * 0.60,
            ],
          },
        },
      })
    }

    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [isWide])

  // Mouse parallax — smoothed rAF loop з lerp для плавного відставання
  useEffect(() => {
    const onMouseMove = (e) => {
      rawMouse.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,  // -1 до +1
        y: (e.clientY / window.innerHeight - 0.5) * 2, // -1 до +1
      }
    }

    const tick = () => {
      setMouseOffset((prev) => {
        const dx = rawMouse.current.x - prev.x
        const dy = rawMouse.current.y - prev.y
        // Threshold щоб не ре-рендерити без потреби
        if (Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) return prev
        return {
          x: prev.x + dx * 0.06,
          y: prev.y + dy * 0.06,
        }
      })
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMouseMove)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Шар 1: Mesh Gradient blobs — завжди видимі */}
      <MeshGradient swipeDirection={swipeDirection} />

      {/* Шар 2: Ghost Windows — тільки на >= 1024px */}
      {isWide && positions && (
        <>
          <GhostWindow
            title="cover-letter.exe"
            width={180}
            height={100}
            driftKeyframes={positions.windowA.driftKeyframes}
            driftDuration={42}
            fadeDuration={28}
            mouseOffsetX={mouseOffset.x}
            mouseOffsetY={mouseOffset.y}
            parallaxFactor={0.04}
          />
          <GhostWindow
            title="match.exe"
            width={140}
            height={82}
            driftKeyframes={positions.windowB.driftKeyframes}
            driftDuration={55}
            fadeDuration={35}
            mouseOffsetX={mouseOffset.x}
            mouseOffsetY={mouseOffset.y}
            parallaxFactor={0.06}
          />
          <GhostWindow
            title="kostya.exe"
            width={162}
            height={90}
            driftKeyframes={positions.windowC.driftKeyframes}
            driftDuration={38}
            fadeDuration={22}
            mouseOffsetX={mouseOffset.x}
            mouseOffsetY={mouseOffset.y}
            parallaxFactor={0.03}
          />
        </>
      )}
    </>
  )
}
