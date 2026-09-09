'use client'

// SurveyOption - Individual option button following the survey design system

import { Check, Square, CheckSquare } from 'lucide-react'
import { SurveyOption as SurveyOptionType } from './types'

interface SurveyOptionProps {
  option: SurveyOptionType
  isSelected: boolean
  isMultiSelect: boolean
  onClick: (value: string) => void
}

export default function SurveyOption({
  option,
  isSelected,
  isMultiSelect,
  onClick
}: SurveyOptionProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(option.value)}
      className={`
        w-full min-h-[48px] px-4 py-3 rounded-lg border bg-white text-left transition-all
        flex items-center justify-between
        ${isSelected
          ? 'border-primary shadow-xs'
          : 'border-gray-200 hover:border-gray-300 shadow-xs hover:shadow-md'
        }
      `}
      aria-pressed={isSelected}
      role={isMultiSelect ? 'checkbox' : 'radio'}
    >
      <div className="flex items-center space-x-3 flex-1">
        {option.icon && (
          <div className="flex-shrink-0">
            {option.icon}
          </div>
        )}
        <div className="flex-1">
          <span className="font-medium text-foreground block">
            {option.label}
          </span>
          {option.description && (
            <span className="text-sm text-muted-foreground block mt-1">
              {option.description}
            </span>
          )}
        </div>
      </div>

      <div className="flex-shrink-0 ml-3">
        {isMultiSelect ? (
          isSelected ? (
            <CheckSquare className="w-5 h-5 text-primary" />
          ) : (
            <Square className="w-5 h-5 text-gray-400" />
          )
        ) : (
          isSelected && <Check className="w-5 h-5 text-primary" />
        )}
      </div>
    </button>
  )
}
