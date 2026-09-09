'use client'

// FollowUpModal - Lightweight follow-up question shown as a mobile drawer /
// desktop dialog after a triggering option is selected on the parent question.
// Single tap selects and closes. Note: drawer/dialog content renders in a
// portal outside the funnel page tree, so it carries the funnel-theme class
// itself to stay in the funnel design system.

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/app/components/ui/drawer'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/app/components/ui/dialog'
import { useIsMobile } from '@/app/hooks/use-mobile'
import SurveyOption from './SurveyOption'
import type { FollowUpQuestion } from './types'

interface FollowUpModalProps {
  followUp: FollowUpQuestion
  open: boolean
  selectedValue?: string
  onSelect: (value: string) => void
  onClose: () => void
}

export default function FollowUpModal({
  followUp,
  open,
  selectedValue,
  onSelect,
  onClose
}: FollowUpModalProps) {
  const isMobile = useIsMobile()

  const content = (
    <div className="space-y-3 p-4">
      <div className="border-b pb-4 mb-1">
        <h3 className="text-lg font-semibold">{followUp.title}</h3>
        {followUp.description && (
          <p className="text-sm text-muted-foreground mt-1">{followUp.description}</p>
        )}
      </div>

      {followUp.options.map(option => (
        <SurveyOption
          key={option.id}
          option={option}
          isSelected={option.value === selectedValue}
          isMultiSelect={false}
          onClick={onSelect}
        />
      ))}
    </div>
  )

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
        <DrawerContent className="funnel-theme max-h-[85vh]">
          <DrawerHeader className="sr-only">
            <DrawerTitle>{followUp.title}</DrawerTitle>
            <DrawerDescription>{followUp.description ?? followUp.title}</DrawerDescription>
          </DrawerHeader>
          {content}
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="funnel-theme w-full max-w-md">
        <DialogHeader className="sr-only">
          <DialogTitle>{followUp.title}</DialogTitle>
          <DialogDescription>{followUp.description ?? followUp.title}</DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          {content}
        </div>
      </DialogContent>
    </Dialog>
  )
}
