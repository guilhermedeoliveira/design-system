import { Interpolation } from 'emotion'
import React, { CSSProperties, useCallback, useMemo } from 'react'

import { Theme, useStyles } from '../../styles'
import { getUserLocale } from '../../util/locale'

import { createMonthMatrix } from './util'

export interface MonthViewProps {
  /**
   * The current visible date.
   * Only the month and year of this date is used to know which month to render, so the day doesn't matter.
   */
  visibleDate: Date

  onDayClick?(day: Date): void
  onDayHover?(day: Date): void
  renderDay?(day: Date): React.ReactNode
  renderWeekName?(firstWeekDay: Date): React.ReactNode
  createDayStyles?(day: Date, props: MonthViewProps): Interpolation
  isDaySelected?(day: Date): boolean
}

export function MonthView(props: MonthViewProps) {
  const { visibleDate, renderDay, renderWeekName, createDayStyles, onDayClick, onDayHover } = props
  const { classes, css } = useStyles(createStyles)

  const month = useMemo(() => createMonthMatrix(visibleDate), [visibleDate])
  const handleDayClick = useCallback((day: Date) => () => onDayClick(day), [onDayClick])
  const handleDayHover = useCallback((day: Date) => () => onDayHover(day), [onDayHover])

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          {month[0].map((day, d) => (
            <th key={d}>{renderWeekName(day)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {month.map((week, w) => (
          <tr key={w}>
            {week.map((day, d) => (
              <td key={d} data-date={day.toISOString().slice(0, 10)}>
                <span
                  className={css(classes.day, createDayStyles(day, props))}
                  onClick={handleDayClick(day)}
                  onMouseOver={handleDayHover(day)}
                  role='button'
                  aria-selected={props.isDaySelected && props.isDaySelected(day)}
                >
                  {renderDay(day)}
                </span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

MonthView.defaultProps = {
  onDayClick: () => null,
  onDayHover: () => null,
  renderDay: day => {
    const dayFormatter = new Intl.DateTimeFormat(getUserLocale(), { day: '2-digit' })
    return dayFormatter.format(day)
  },
  renderWeekName: firstWeekDay => {
    const weekFormatter = new Intl.DateTimeFormat(getUserLocale(), { weekday: 'narrow' })
    return weekFormatter.format(firstWeekDay)
  },
  createDayStyles: () => null,
} as Partial<MonthViewProps>

export const createStyles = (theme: Theme) => ({
  table: {
    borderCollapse: 'collapse',
    textAlign: 'center',
    lineHeight: '1.5rem',
    width: '100%',

    th: {
      width: '2rem',
      padding: '0.25rem 0',
    },
  } as CSSProperties,
  day: {
    width: '2rem',
    padding: '0.25rem 0',
    display: 'inline-block',
    borderRadius: '50%',

    ':hover': {
      cursor: 'pointer',
      background: theme.pallete.surface.background,
    },
  } as CSSProperties,
  active: {
    background: theme.pallete.primary.main,
    color: theme.pallete.surface.main,
  } as CSSProperties,
})
