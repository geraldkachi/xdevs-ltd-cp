'use client'
import { useId } from 'react'
import ReactSelect, { type StylesConfig, type GroupBase } from 'react-select'

export type Opt = { value: string; label: string }
type Props = {
  options: (string | Opt)[]
  name?: string                 // adds a hidden input so it works inside <form> + FormData
  value?: string                // controlled
  defaultValue?: string         // uncontrolled
  onChange?: (value: string) => void
  placeholder?: string
  searchable?: boolean
  compact?: boolean             // smaller, for tables / toolbars
  required?: boolean
  ariaLabel?: string
}

const toOpt = (o: string | Opt): Opt => (typeof o === 'string' ? { value: o, label: o } : o)

// Square, bordered styling that follows the site's light/dark CSS variables
const styles = (compact: boolean): StylesConfig<Opt, false, GroupBase<Opt>> => ({
  control: (b, s) => ({
    ...b,
    minHeight: compact ? 38 : 52,
    borderRadius: 0,
    background: 'transparent',
    borderColor: s.isFocused ? 'var(--fg)' : 'var(--border-col)',
    boxShadow: 'none',
    cursor: 'pointer',
    ':hover': { borderColor: 'var(--fg)' },
  }),
  valueContainer: (b) => ({ ...b, padding: compact ? '0 10px' : '0 14px' }),
  singleValue: (b) => ({
    ...b, color: 'var(--fg)', fontFamily: 'var(--font-space)',
    fontSize: compact ? 11 : 15, fontWeight: compact ? 700 : 400,
    textTransform: compact ? 'uppercase' : 'none', letterSpacing: compact ? '0.1em' : 0,
  }),
  input: (b) => ({ ...b, color: 'var(--fg)', fontFamily: 'var(--font-space)' }),
  placeholder: (b) => ({ ...b, color: 'var(--fg-3)', fontFamily: 'var(--font-space)', fontSize: compact ? 12 : 15 }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (b, s) => ({ ...b, color: 'var(--fg-3)', padding: compact ? 6 : 10, transform: s.selectProps.menuIsOpen ? 'rotate(180deg)' : undefined, transition: 'transform .15s', ':hover': { color: 'var(--fg)' } }),
  menu: (b) => ({ ...b, borderRadius: 0, marginTop: 0, background: 'var(--bg)', border: '1px solid var(--border-col)', boxShadow: '0 16px 40px rgba(0,0,0,.18)', overflow: 'hidden' }),
  menuList: (b) => ({ ...b, padding: 0 }),
  menuPortal: (b) => ({ ...b, zIndex: 80 }),
  option: (b, s) => ({
    ...b,
    cursor: 'pointer',
    padding: compact ? '10px 12px' : '13px 16px',
    fontFamily: 'var(--font-space)',
    fontSize: compact ? 11 : 13,
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    borderBottom: '1px solid var(--border-col)',
    background: s.isSelected ? 'var(--fg)' : s.isFocused ? 'var(--bg-2)' : 'transparent',
    color: s.isSelected ? 'var(--bg)' : 'var(--fg-2)',
    ':active': { background: 'var(--bg-3)' },
  }),
})

export default function Select({ options, name, value, defaultValue, onChange, placeholder = 'Select…', searchable = false, compact = false, required, ariaLabel }: Props) {
  const id = useId()
  const opts = options.map(toOpt)
  const find = (v?: string) => (v === undefined ? undefined : opts.find((o) => o.value === v) ?? null)
  return (
    <ReactSelect<Opt, false>
      instanceId={id}
      inputId={`${id}-input`}
      name={name}
      options={opts}
      value={value !== undefined ? find(value) : undefined}
      defaultValue={defaultValue !== undefined ? find(defaultValue) : undefined}
      onChange={(o) => o && onChange?.(o.value)}
      placeholder={placeholder}
      isSearchable={searchable}
      required={required}
      aria-label={ariaLabel}
      styles={styles(compact)}
      menuPortalTarget={typeof document !== 'undefined' ? document.body : undefined}
      menuPlacement="auto"
    />
  )
}
