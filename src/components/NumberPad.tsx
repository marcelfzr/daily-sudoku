type NumberPadProps = {
  disabled: boolean
  onInput: (digit: number) => void
}

export function NumberPad({ disabled, onInput }: NumberPadProps) {
  return (
    <div className="number-pad" aria-label="Number input">
      {Array.from({ length: 9 }, (_, index) => index + 1).map((digit) => (
        <button
          key={digit}
          type="button"
          className="number-key"
          onClick={() => onInput(digit)}
          disabled={disabled}
        >
          {digit}
        </button>
      ))}
    </div>
  )
}
