import React, { useMemo, useState } from "react";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
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
  value?: string;
  onChange?: (value: string) => void;
};

export default function CountrySelectField({
  name,
  label,
  placeholder = "Select country",
  error,
  required = false,
  disabled = false,
  value,
  onChange,
}: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const countries = useMemo(() => countryList().getData(), []);

  const filtered = useMemo(() => {
    if (!search) return countries;
    return countries.filter((c) =>
      c.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, countries]);

  const selected = countries.find((c) => c.value === value);

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-between text-left font-normal",
              !value && "text-muted-foreground",
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
          <div className="mb-2">
            <input
              placeholder="Search country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={cn(
                "w-full rounded-md border border-input bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                "dark:border-neutral-700 dark:bg-neutral-800 dark:focus:ring-neutral-500"
              )}
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filtered.map((country) => (
              <button
                key={country.value}
                type="button"
                onClick={() => {
                  onChange?.(country.value);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  value === country.value && "bg-accent text-accent-foreground",
                  "dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
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