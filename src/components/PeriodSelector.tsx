import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

interface PeriodSelectorProps {
  value: 'day' | 'week' | 'month';
  onValueChange: (value: 'day' | 'week' | 'month') => void;
}

export function PeriodSelector({ value, onValueChange }: PeriodSelectorProps) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(val) => {
        if (val) onValueChange(val as 'day' | 'week' | 'month');
      }}
      className="border rounded-lg p-0.5 bg-muted/50 h-8"
    >
      <ToggleGroupItem
        value="day"
        aria-label="Day view"
        className="text-xs px-2.5 h-7 data-[state=on]:bg-background data-[state=on]:shadow-sm"
      >
        Day
      </ToggleGroupItem>
      <ToggleGroupItem
        value="week"
        aria-label="Week view"
        className="text-xs px-2.5 h-7 data-[state=on]:bg-background data-[state=on]:shadow-sm"
      >
        Week
      </ToggleGroupItem>
      <ToggleGroupItem
        value="month"
        aria-label="Month view"
        className="text-xs px-2.5 h-7 data-[state=on]:bg-background data-[state=on]:shadow-sm"
      >
        Month
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
