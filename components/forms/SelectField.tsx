import { Label } from "../ui/label";

export default function SelectField({ name, label, placeholder, options, control, error, required = false }: SelectFieldProps) {
  return (
    <div className="space-y-2">
       <Label htmlFor={name} className="form-label">{label}</Label>
    </div>
  )
}
