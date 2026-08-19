/**
 * TerminalWindow.tsx
 * Interactive animated terminal that displays `whoami`, `stack`, and `status`
 * commands in sequence with a typewriter effect.
 *
 * Validates: Requirements 3.2
 */

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './TerminalWindow.css'

// ─── Data: terminal sequence ─────────────────────────────────────────────────

export interface TerminalCommand {
  command: string
  output: string[]
}

export const TERMINAL_COMMANDS: TerminalCommand[] = [
  {
    command: 'whoami',
    output: [
      'Gerardo Ojeda Riascos',
      'Software Developer Jr.',
      'Mobile · Web · Backend · AI',
    ],
  },
  {
    command: 'stack',
    output: [
      'Flutter · React · Node.js · TypeScript',
      'Supabase · PostgreSQL · FastAPI',
      'AI Tools: Kiro · Cursor · Copilot',
    ],
  },
  {
    command: 'status',
    output: [
      '> Open to opportunities',
      '> Building: Marketplace de Servicios',
      '> Learning: Cloud Architecture',
    ],
  },
]

// ─── Typewriter logic helpers ─────────────────────────────────────────────────

/** How fast each character is typed (ms per character) */
const CHAR_INTERVAL_MS = 45

/** Pause after a command finishes typing before showing output (ms) */
const PAUSE_AFTER_CMD_MS = 350

/** Pause after output is shown before starting next command (ms) */
const PAUSE_AFTER_OUTPUT_MS = 900

// ─── Types ────────────────────────────────────────────────────────────────────

interface DisplayedLine {
  /** 'cmd' = prompt + command, 'out' = output line */
  type: 'cmd' | 'out'
  /** Full text of this line (for output lines this is fixed) */
  text: string
  /** For 'cmd' lines: how many characters of `text` are currently visible */
  visibleChars?: number
  /** Whether the line is fully revealed */
  done: boolean
}

// ─── Hook: useTerminalAnimation ───────────────────────────────────────────────

function useTerminalAnimation(commands: TerminalCommand[]) {
  const [lines, setLines] = useState<DisplayedLine[]>([])
  const [cursorVisible, setCursorVisible] = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Blinking cursor (separate from animation state)
  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 530)
    return () => clearInterval(blink)
  }, [])

  // Main typewriter sequencer
  useEffect(() => {
    let cmdIndex = 0
    let charIndex = 0
    let phase: 'typing' | 'pause-cmd' | 'output' | 'pause-output' = 'typing'
    let outputLineIndex = 0

    function schedule(fn: () => void, delay: number) {
      timerRef.current = setTimeout(fn, delay)
    }

    function tick() {
      if (cmdIndex >= commands.length) return

      const currentCmd = commands[cmdIndex]

      if (phase === 'typing') {
        charIndex++

        setLines((prev) => {
          const next = [...prev]
          // Either update the last 'cmd' line or push a new one
          const lastIdx = next.length - 1
          if (lastIdx >= 0 && next[lastIdx].type === 'cmd' && !next[lastIdx].done) {
            next[lastIdx] = {
              ...next[lastIdx],
              text: currentCmd.command,
              visibleChars: charIndex,
              done: charIndex >= currentCmd.command.length,
            }
          } else {
            next.push({
              type: 'cmd',
              text: currentCmd.command,
              visibleChars: charIndex,
              done: charIndex >= currentCmd.command.length,
            })
          }
          return next
        })

        if (charIndex < currentCmd.command.length) {
          schedule(tick, CHAR_INTERVAL_MS)
        } else {
          phase = 'pause-cmd'
          schedule(tick, PAUSE_AFTER_CMD_MS)
        }
      } else if (phase === 'pause-cmd') {
        phase = 'output'
        outputLineIndex = 0
        schedule(tick, 0)
      } else if (phase === 'output') {
        if (outputLineIndex < currentCmd.output.length) {
          const lineText = currentCmd.output[outputLineIndex]
          setLines((prev) => [
            ...prev,
            { type: 'out', text: lineText, done: true },
          ])
          outputLineIndex++
          schedule(tick, CHAR_INTERVAL_MS * 4)
        } else {
          phase = 'pause-output'
          schedule(tick, PAUSE_AFTER_OUTPUT_MS)
        }
      } else if (phase === 'pause-output') {
        // Advance to next command
        cmdIndex++
        charIndex = 0
        phase = 'typing'
        if (cmdIndex < commands.length) {
          schedule(tick, 0)
        }
      }
    }

    // Kick off with a short initial delay
    schedule(tick, 600)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { lines, cursorVisible }
}

// ─── Component ────────────────────────────────────────────────────────────────

interface TerminalWindowProps {
  /** Override commands for testing or customization */
  commands?: TerminalCommand[]
  /** Additional class names */
  className?: string
}

export function TerminalWindow({
  commands = TERMINAL_COMMANDS,
  className = '',
}: TerminalWindowProps) {
  const { lines, cursorVisible } = useTerminalAnimation(commands)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom as new lines appear
  useEffect(() => {
    if (bottomRef.current && typeof bottomRef.current.scrollIntoView === 'function') {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [lines])

  // The last cmd line is the one actively being typed (if not yet done)
  const lastLineIdx = lines.length - 1
  const isLastLineCmdInProgress =
    lastLineIdx >= 0 &&
    lines[lastLineIdx].type === 'cmd' &&
    !lines[lastLineIdx].done

  return (
    <motion.div
      className={`terminal-window glass-card glass-card--accent ${className}`}
      role="region"
      aria-label="Interactive terminal"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
    >
      {/* ── Title bar ─────────────────────────────────────────────────── */}
      <div className="terminal-window__titlebar" aria-hidden="true">
        <span className="terminal-window__dot terminal-window__dot--red" />
        <span className="terminal-window__dot terminal-window__dot--yellow" />
        <span className="terminal-window__dot terminal-window__dot--green" />
        <span className="terminal-window__title">gerardo@portfolio:~</span>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div className="terminal-window__body" role="log" aria-live="polite" aria-label="Terminal output">
        <AnimatePresence initial={false}>
          {lines.map((line, idx) => {
            const isActiveCmd = line.type === 'cmd' && idx === lastLineIdx && !line.done
            const showCursor = isActiveCmd && cursorVisible

            return (
              <motion.div
                key={idx}
                className={`terminal-window__line terminal-window__line--${line.type}`}
                initial={line.type === 'out' ? { opacity: 0, x: -6 } : undefined}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
              >
                {line.type === 'cmd' && (
                  <span className="terminal-window__prompt" aria-hidden="true">
                    <span className="terminal-window__prompt-user">gerardo</span>
                    <span className="terminal-window__prompt-sep">@</span>
                    <span className="terminal-window__prompt-host">portfolio</span>
                    <span className="terminal-window__prompt-sep">:~$ </span>
                  </span>
                )}

                <span className="terminal-window__text">
                  {line.type === 'cmd'
                    ? (line.text ?? '').slice(0, line.visibleChars ?? 0)
                    : line.text}
                </span>

                {showCursor && (
                  <span className="terminal-window__cursor" aria-hidden="true">
                    ▌
                  </span>
                )}

                {/* Idle cursor after last output line */}
                {idx === lastLineIdx &&
                  !isLastLineCmdInProgress &&
                  line.type === 'out' &&
                  cursorVisible && (
                    <span className="terminal-window__cursor" aria-hidden="true">
                      ▌
                    </span>
                  )}
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Scroll anchor */}
        <div ref={bottomRef} />
      </div>
    </motion.div>
  )
}

export default TerminalWindow
