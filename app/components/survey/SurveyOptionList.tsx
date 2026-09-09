'use client'

// SurveyOptionList - Container for survey options with selection logic

import { SurveyQuestion } from './types'
import SurveyOption from './SurveyOption'

interface SurveyOptionListProps {
  question: SurveyQuestion
  selectedValues: string[]
  onSelectionChange: (values: string[]) => void
}

export default function SurveyOptionList({
  question,
  selectedValues,
  onSelectionChange
}: SurveyOptionListProps) {
  const handleOptionClick = (value: string) => {
    if (question.type === 'single-select') {
      onSelectionChange([value])
    } else {
      const newSelection = selectedValues.includes(value)
        ? selectedValues.filter(v => v !== value)
        : [...selectedValues, value]
      onSelectionChange(newSelection)
    }
  }

  return (
    <div className="space-y-3" role={question.type === 'multi-select' ? 'group' : 'radiogroup'}>
      {question.options.map((option) => (
        <SurveyOption
          key={option.id}
          option={option}
          isSelected={selectedValues.includes(option.value)}
          isMultiSelect={question.type === 'multi-select'}
          onClick={handleOptionClick}
        />
      ))}
    </div>
  )
}
