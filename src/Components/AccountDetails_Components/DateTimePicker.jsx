import { useState } from "react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button.jsx";
import { Calendar } from "@/components/ui/calendar.jsx";
import { Input } from "@/components/ui/input.jsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.jsx";

import { ChevronDownIcon } from "lucide-react"

function DateTimePicker({ value, onChange }) {
  const [open, setOpen] = useState(false)

  const selectedDate = value || new Date()

  const handleDateSelect = (date) => {
    if (!date) return

    const updated = new Date(selectedDate)
    updated.setFullYear(date.getFullYear())
    updated.setMonth(date.getMonth())
    updated.setDate(date.getDate())

    onChange(updated)
    setOpen(false)
  }

  const handleTimeChange = (e) => {
    const [hours, minutes] = e.target.value.split(":")
    const updated = new Date(selectedDate)
    updated.setHours(hours)
    updated.setMinutes(minutes)

    onChange(updated)
  }

  return (
    <div className="flex gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-between w-40">
            {format(selectedDate, "PPP")}
            <ChevronDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
          />
        </PopoverContent>
      </Popover>

      <Input
        type="time"
        value={format(selectedDate, "HH:mm")}
        onChange={handleTimeChange}
        className="w-32"
      />
    </div>
  )
}

export default DateTimePicker
