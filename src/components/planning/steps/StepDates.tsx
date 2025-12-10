import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

interface StepDatesProps {
  value: { start: Date | null; end: Date | null };
  onChange: (value: { start: Date | null; end: Date | null }) => void;
}

const StepDates = ({ value, onChange }: StepDatesProps) => {
  return (
    <div className="text-center">
      <h1 className="mb-3 font-display text-4xl font-bold text-foreground md:text-5xl">
        When are you traveling?
      </h1>
      <p className="mb-10 text-lg text-muted-foreground">
        Select your travel dates (optional - skip if flexible)
      </p>

      <div className="mx-auto flex max-w-xl flex-col gap-4 sm:flex-row">
        {/* Start Date */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex h-16 flex-1 items-center gap-3 rounded-2xl border-2 border-border bg-card px-5 text-left transition-colors hover:border-coral/50">
              <CalendarIcon className="h-6 w-6 text-teal" />
              <div>
                <div className="text-xs text-muted-foreground">Start Date</div>
                <div className="font-medium text-foreground">
                  {value.start ? format(value.start, "MMM d, yyyy") : "Select date"}
                </div>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value.start || undefined}
              onSelect={(date) => onChange({ ...value, start: date || null })}
              disabled={(date) => date < new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* End Date */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex h-16 flex-1 items-center gap-3 rounded-2xl border-2 border-border bg-card px-5 text-left transition-colors hover:border-coral/50">
              <CalendarIcon className="h-6 w-6 text-teal" />
              <div>
                <div className="text-xs text-muted-foreground">End Date</div>
                <div className="font-medium text-foreground">
                  {value.end ? format(value.end, "MMM d, yyyy") : "Select date"}
                </div>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value.end || undefined}
              onSelect={(date) => onChange({ ...value, end: date || null })}
              disabled={(date) => date < (value.start || new Date())}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {value.start && value.end && (
        <p className="mt-6 text-teal">
          {Math.ceil((value.end.getTime() - value.start.getTime()) / (1000 * 60 * 60 * 24))} days trip
        </p>
      )}
    </div>
  );
};

export default StepDates;
