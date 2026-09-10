// ProgressBar - Slim filled bar showing progress through a fixed-order flow.
// `current` is 1-based (e.g. 2 of 4).

interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = total > 0 ? Math.min(100, (current / total) * 100) : 0

  return (
    <div className="mb-4">
      <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
