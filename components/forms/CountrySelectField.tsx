import React, { useMemo, useState } from "react";
import { Label } from "../ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import countryList from "react-select-country-list";
import "flag-icons/css/flag-icons.min.css";

type CountrySelectProps = {
  name: string;
  label: string;
  placeholder?: string;
  error?: { message?: string };
  required?: boolean;
  disabled?: boolean;
};

export default function CountrySelectField({
  name,
  label,
  placeholder = "Select country",
  error,
  required = false,
  disabled = false,
}: CountrySelectProps) {
  const countries = useMemo(() => countryList().getData(), []);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<{ label: string; value: string } | null>(null);

  const filtered = useMemo(() => {
    if (!search) return countries;
    return countries.filter((c) =>
      c.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, countries]);

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label} 
      </Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-between text-left font-normal",
              !selected && "text-muted-foreground",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {selected ? (
              <span className="flex items-center gap-2">
                <span className={`fi fi-${selected.value.toLowerCase()}`} />
                {selected.label}
              </span>
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className={cn(
            "w-[300px] p-2 rounded-lg border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
            "dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
          )}
        >
          <input
            placeholder="Search country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={cn(
              "w-full mb-2 rounded-md border border-input bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
              "dark:border-neutral-700 dark:bg-neutral-800 dark:focus:ring-neutral-500"
            )}
          />

          <div className="max-h-60 overflow-y-auto">
            {filtered.map((country) => (
              <button
                key={country.value}
                type="button"
                onClick={() => {
                  setSelected(country);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  selected?.value === country.value && "bg-accent text-accent-foreground"
                )}
              >
                <span className={`fi fi-${country.value.toLowerCase()}`} />
                {country.label}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {error?.message && (
        <p className="text-sm text-destructive">{error.message}</p>
      )}
    </div>
  );
}
