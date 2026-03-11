import { useRef, useEffect, useCallback, useState } from 'react'

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 400
const GRAVITY = 0.28
const FLAP_FORCE = -4.2
const DINO_SIZE = 30
const CLOUD_WIDTH = 60
const CLOUD_GAP = 130
const CLOUD_SPEED_INITIAL = 2.5
const GROUND_HEIGHT = 50

interface Cloud {
  x: number
  gapY: number
  passed: boolean
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
}

function drawPixelDino(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  flapUp: boolean
) {
  const s = size / 10
  ctx.fillStyle = '#535353'

  const body = [
    [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
    [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1],
    [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2],
    [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3],
    [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4],
    [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5],
    [1, 6], [2, 6], [3, 6], [4, 6], [5, 6],
    [2, 7], [3, 7], [4, 7],
    [2, 8], [3, 8],
    [2, 9], [3, 9],
  ]

  ctx.fillStyle = 'white'
  ctx.fillRect(x + 6 * s, y + 1 * s, s, s)

  ctx.fillStyle = '#535353'
  body.forEach(([px, py]) => {
    ctx.fillRect(x + px * s, y + py * s, s, s)
  })

  ctx.fillStyle = 'white'
  ctx.fillRect(x + 7 * s, y + 1 * s, s, s)

  if (flapUp) {
    ctx.fillStyle = '#535353'
    ctx.fillRect(x - 1 * s, y + 3 * s, s, s)
    ctx.fillRect(x - 2 * s, y + 2 * s, s, s)
    ctx.fillRect(x - 2 * s, y + 4 * s, s, s)
  } else {
    ctx.fillStyle = '#535353'
    ctx.fillRect(x - 1 * s, y + 5 * s, s, s)
    ctx.fillRect(x - 2 * s, y + 6 * s, s, s)
    ctx.fillRect(x - 2 * s, y + 4 * s, s, s)
  }
}

function drawPixelCloud(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  fromTop: boolean
) {
  const px = 4
  ctx.fillStyle = '#a0a0a0'

  if (fromTop) {
    ctx.fillRect(x + 8, y, width - 16, height)
    ctx.fillRect(x + 4, y, width - 8, height - 4)
    ctx.fillRect(x, y, width, height - 12)

    for (let i = x; i < x + width; i += px) {
      const offset = Math.abs(((i - x) % 20) - 10)
      ctx.fillRect(i, y + height - 12 + offset, px, px)
    }

    ctx.fillStyle = '#8a8a8a'
    for (let i = x + 4; i < x + width - 4; i += px * 3) {
      ctx.fillRect(i, y + 4, px, px)
      ctx.fillRect(i + px, y + 12, px, px)
    }
  } else {
    ctx.fillRect(x + 8, y, width - 16, height)
    ctx.fillRect(x + 4, y + 4, width - 8, height - 4)
    ctx.fillRect(x, y + 12, width, height - 12)

    for (let i = x; i < x + width; i += px) {
      const offset = Math.abs(((i - x) % 20) - 10)
      ctx.fillRect(i, y + 8 - offset, px, px)
    }

    ctx.fillStyle = '#8a8a8a'
    for (let i = x + 4; i < x + width - 4; i += px * 3) {
      ctx.fillRect(i, y + height - 8, px, px)
      ctx.fillRect(i + px, y + height - 16, px, px)
    }
  }
}

function drawPixelPterodactyl(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  frame: number
) {
  const s = 3
  ctx.fillStyle = '#535353'

  const body = [
    [4, 3], [5, 3], [6, 3], [7, 3], [8, 3],
    [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4],
    [2, 5], [3, 5], [4, 5], [5, 5], [6, 5],
    [4, 6], [5, 6],
  ]
  body.forEach(([px, py]) => ctx.fillRect(x + px * s, y + py * s, s, s))

  if (frame % 2 === 0) {
    const wingUp = [
      [5, 2], [6, 2], [5, 1], [6, 1], [6, 0], [7, 0],
    ]
    wingUp.forEach(([px, py]) => ctx.fillRect(x + px * s, y + py * s, s, s))
  } else {
    const wingDown = [
      [5, 5], [6, 5], [5, 6], [6, 6], [6, 7], [7, 7],
    ]
    wingDown.forEach(([px, py]) => ctx.fillRect(x + px * s, y + py * s, s, s))
  }
}

function drawGround(
  ctx: CanvasRenderingContext2D,
  offset: number,
  canvasWidth: number,
  groundY: number
) {
  ctx.fillStyle = '#535353'
  ctx.fillRect(0, groundY, canvasWidth, 2)

  const px = 4
  for (let i = -offset % 24; i < canvasWidth; i += 24) {
    ctx.fillRect(i, groundY + 6, px * 2, px)
  }
  for (let i = -offset % 36 + 12; i < canvasWidth; i += 36) {
    ctx.fillRect(i, groundY + 14, px, px)
  }
  for (let i = -offset % 18 + 6; i < canvasWidth; i += 18) {
    ctx.fillRect(i, groundY + 10, px, 2)
  }
}

export default function DinoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'dead'>('idle')
  const [score, setScore] = useState(0)
  const [hiScore, setHiScore] = useState(0)

  const gameRef = useRef({
    dinoY: CANVAS_HEIGHT / 2,
    dinoVelocity: 0,
    clouds: [] as Cloud[],
    particles: [] as Particle[],
    bgBirds: [
      { x: 500, y: 60, speed: 1.2 },
      { x: 250, y: 140, speed: 0.8 },
      { x: 700, y: 40, speed: 1.5 },
    ],
    groundOffset: 0,
    frameCount: 0,
    score: 0,
    cloudSpeed: CLOUD_SPEED_INITIAL,
    flapTimer: 0,
    animFrame: 0,
  })

  const resetGame = useCallback(() => {
    const g = gameRef.current
    g.dinoY = CANVAS_HEIGHT / 2
    g.dinoVelocity = 0
    g.clouds = []
    g.particles = []
    g.groundOffset = 0
    g.frameCount = 0
    g.score = 0
    g.cloudSpeed = CLOUD_SPEED_INITIAL
    g.flapTimer = 0
    g.animFrame = 0
    setScore(0)
  }, [])

  const flap = useCallback(() => {
    if (gameState === 'idle') {
      resetGame()
      setGameState('playing')
      gameRef.current.dinoVelocity = FLAP_FORCE
      gameRef.current.flapTimer = 14
      return
    }
    if (gameState === 'playing') {
      gameRef.current.dinoVelocity = FLAP_FORCE
      gameRef.current.flapTimer = 14
    }
  }, [gameState, resetGame])

  const handleRestart = useCallback(() => {
    resetGame()
    setGameState('playing')
    gameRef.current.dinoVelocity = FLAP_FORCE
    gameRef.current.flapTimer = 14
  }, [resetGame])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault()
        if (gameState !== 'dead') {
          flap()
        }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [flap, gameState])

  useEffect(() => {
    if (gameState !== 'playing') return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    const groundY = CANVAS_HEIGHT - GROUND_HEIGHT

    const loop = () => {
      const g = gameRef.current
      g.frameCount++
      if (g.frameCount % 6 === 0) g.animFrame++

      const floatFactor = g.flapTimer > 0 ? 0.4 : 1.0
      g.dinoVelocity += GRAVITY * floatFactor
      g.dinoY += g.dinoVelocity
      if (g.flapTimer > 0) g.flapTimer--

      g.cloudSpeed = CLOUD_SPEED_INITIAL + g.score * 0.02
      g.groundOffset += g.cloudSpeed

      if (
        g.clouds.length === 0 ||
        g.clouds[g.clouds.length - 1].x < CANVAS_WIDTH - 220
      ) {
        const minGapY = 80
        const maxGapY = groundY - CLOUD_GAP - 40
        const gapY = minGapY + Math.random() * (maxGapY - minGapY)
        g.clouds.push({ x: CANVAS_WIDTH + 20, gapY, passed: false })
      }

      g.clouds.forEach((cloud) => {
        cloud.x -= g.cloudSpeed
      })
      g.clouds = g.clouds.filter((c) => c.x > -CLOUD_WIDTH - 20)

      const dinoX = 100
      const dinoTop = g.dinoY
      const dinoBottom = g.dinoY + DINO_SIZE
      const dinoLeft = dinoX + 4
      const dinoRight = dinoX + DINO_SIZE - 4

      let dead = false
      if (dinoTop < 0 || dinoBottom > groundY) {
        dead = true
      }

      g.clouds.forEach((cloud) => {
        const cloudLeft = cloud.x
        const cloudRight = cloud.x + CLOUD_WIDTH
        const gapTop = cloud.gapY
        const gapBottom = cloud.gapY + CLOUD_GAP

        if (dinoRight > cloudLeft + 6 && dinoLeft < cloudRight - 6) {
          if (dinoTop + 4 < gapTop || dinoBottom - 4 > gapBottom) {
            dead = true
          }
        }

        if (!cloud.passed && cloud.x + CLOUD_WIDTH < dinoX) {
          cloud.passed = true
          g.score++
          setScore(g.score)
        }
      })

      if (dead) {
        for (let i = 0; i < 12; i++) {
          g.particles.push({
            x: dinoX + DINO_SIZE / 2,
            y: g.dinoY + DINO_SIZE / 2,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6,
            life: 30 + Math.random() * 20,
          })
        }
        setHiScore((prev) => Math.max(prev, g.score))
        setGameState('dead')
        return
      }

      g.bgBirds.forEach((bird) => {
        bird.x -= bird.speed
        if (bird.x < -40) {
          bird.x = CANVAS_WIDTH + 40 + Math.random() * 200
          bird.y = 30 + Math.random() * 120
        }
      })

      // --- RENDER ---
      ctx.fillStyle = '#f7f7f7'
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

      g.bgBirds.forEach((bird) => {
        drawPixelPterodactyl(ctx, bird.x, bird.y, g.animFrame)
      })

      g.clouds.forEach((cloud) => {
        drawPixelCloud(ctx, cloud.x, 0, CLOUD_WIDTH, cloud.gapY, true)
        drawPixelCloud(
          ctx,
          cloud.x,
          cloud.gapY + CLOUD_GAP,
          CLOUD_WIDTH,
          groundY - cloud.gapY - CLOUD_GAP,
          false
        )
      })

      drawGround(ctx, g.groundOffset, CANVAS_WIDTH, groundY)

      const flapUp = g.flapTimer > 0 || g.dinoVelocity < -1
      drawPixelDino(ctx, dinoX, g.dinoY, DINO_SIZE, flapUp)

      ctx.fillStyle = '#535353'
      ctx.font = '700 16px "Courier New", monospace'
      ctx.textAlign = 'right'
      const miles = String(g.score).padStart(6, '0')
      const hi = String(
        Math.max(g.score, (() => { let h = 0; try { h = parseInt(localStorage.getItem('dino-hi') || '0') } catch {} return h })())
      ).padStart(6, '0')
      ctx.fillText(`HI ${hi}  ${miles}`, CANVAS_WIDTH - 20, 30)

      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [gameState])

  useEffect(() => {
    if (gameState !== 'dead') return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const g = gameRef.current
    const groundY = CANVAS_HEIGHT - GROUND_HEIGHT

    let raf: number
    let ticks = 0

    const deathLoop = () => {
      ticks++

      ctx.fillStyle = '#f7f7f7'
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

      g.bgBirds.forEach((bird) => {
        drawPixelPterodactyl(ctx, bird.x, bird.y, Math.floor(ticks / 6))
      })

      g.clouds.forEach((cloud) => {
        drawPixelCloud(ctx, cloud.x, 0, CLOUD_WIDTH, cloud.gapY, true)
        drawPixelCloud(
          ctx,
          cloud.x,
          cloud.gapY + CLOUD_GAP,
          CLOUD_WIDTH,
          groundY - cloud.gapY - CLOUD_GAP,
          false
        )
      })

      drawGround(ctx, g.groundOffset, CANVAS_WIDTH, groundY)

      g.particles = g.particles
        .map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.2,
          life: p.life - 1,
        }))
        .filter((p) => p.life > 0)

      g.particles.forEach((p) => {
        ctx.fillStyle = `rgba(83,83,83,${p.life / 50})`
        ctx.fillRect(p.x, p.y, 4, 4)
      })

      ctx.fillStyle = '#535353'
      ctx.font = '700 16px "Courier New", monospace'
      ctx.textAlign = 'right'
      const miles = String(g.score).padStart(6, '0')
      const hi = String(Math.max(g.score, hiScore)).padStart(6, '0')
      ctx.fillText(`HI ${hi}  ${miles}`, CANVAS_WIDTH - 20, 30)

      if (g.particles.length > 0) {
        raf = requestAnimationFrame(deathLoop)
      }
    }

    raf = requestAnimationFrame(deathLoop)
    return () => cancelAnimationFrame(raf)
  }, [gameState, hiScore])

  useEffect(() => {
    if (gameState !== 'idle') return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const groundY = CANVAS_HEIGHT - GROUND_HEIGHT
    const g = gameRef.current
    let raf: number
    let ticks = 0

    const idleLoop = () => {
      ticks++
      ctx.fillStyle = '#f7f7f7'
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

      g.bgBirds.forEach((bird) => {
        bird.x -= bird.speed * 0.3
        if (bird.x < -40) {
          bird.x = CANVAS_WIDTH + 40
          bird.y = 30 + Math.random() * 120
        }
        drawPixelPterodactyl(ctx, bird.x, bird.y, Math.floor(ticks / 10))
      })

      g.groundOffset += 0.5
      drawGround(ctx, g.groundOffset, CANVAS_WIDTH, groundY)

      const bobY = CANVAS_HEIGHT / 2 + Math.sin(ticks * 0.05) * 8
      drawPixelDino(ctx, 100, bobY, DINO_SIZE, Math.floor(ticks / 8) % 2 === 0)

      ctx.fillStyle = '#535353'
      ctx.font = '700 16px "Courier New", monospace'
      ctx.textAlign = 'right'
      const hi = String(hiScore).padStart(6, '0')
      ctx.fillText(`HI ${hi}  000000`, CANVAS_WIDTH - 20, 30)

      raf = requestAnimationFrame(idleLoop)
    }

    raf = requestAnimationFrame(idleLoop)
    return () => cancelAnimationFrame(raf)
  }, [gameState, hiScore])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dino-hi')
      if (saved) setHiScore(parseInt(saved))
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('dino-hi', String(hiScore))
    } catch {}
  }, [hiScore])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#e8e8e8',
        fontFamily: '"Courier New", monospace',
        userSelect: 'none',
      }}
    >
      <div style={{ position: 'relative' }}>
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onClick={() => {
            if (gameState !== 'dead') flap()
          }}
          style={{
            display: 'block',
            border: '2px solid #535353',
            cursor: 'pointer',
            imageRendering: 'pixelated',
            backgroundColor: '#f7f7f7',
          }}
        />

        {gameState === 'idle' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                color: '#535353',
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: 4,
              }}
            >
              DINO FLAP
            </div>
            <div style={{ color: '#888', fontSize: 14 }}>
              PRESS SPACE OR CLICK TO START
            </div>
          </div>
        )}

        {gameState === 'dead' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              backgroundColor: 'rgba(247,247,247,0.85)',
            }}
          >
            <div
              style={{
                color: '#535353',
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: 4,
              }}
            >
              GAME OVER
            </div>
            <div style={{ color: '#535353', fontSize: 18, fontWeight: 700 }}>
              {String(score).padStart(6, '0')} MILES
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleRestart()
              }}
              style={{
                marginTop: 8,
                padding: '10px 32px',
                fontSize: 16,
                fontWeight: 700,
                fontFamily: '"Courier New", monospace',
                letterSpacing: 2,
                color: '#f7f7f7',
                backgroundColor: '#535353',
                border: '3px solid #535353',
                cursor: 'pointer',
                imageRendering: 'pixelated',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f7f7f7'
                e.currentTarget.style.color = '#535353'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#535353'
                e.currentTarget.style.color = '#f7f7f7'
              }}
            >
              RESTART
            </button>
            <div style={{ color: '#888', fontSize: 12 }}>
              CLICK RESTART TO PLAY AGAIN
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
