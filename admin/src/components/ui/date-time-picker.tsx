import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';

interface DateTimePickerProps {
  value?: Date | null;
  onChange: (date: Date | null) => void;
  label?: string;
  placeholder?: string;
  minDate?: Date;
  disabled?: boolean;
}

export function DateTimePicker({
  value,
  onChange,
  label,
  placeholder = 'Selecione data e hora',
  minDate,
  disabled = false,
}: DateTimePickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');

  // Sincronizar com o valor externo
  useEffect(() => {
    if (value) {
      const date = new Date(value);
      // Formato: YYYY-MM-DD
      const dateStr = date.toISOString().split('T')[0];
      // Formato: HH:MM
      const timeStr = date.toTimeString().slice(0, 5);
      setDateValue(dateStr);
      setTimeValue(timeStr);
    } else {
      setDateValue('');
      setTimeValue('');
    }
  }, [value]);

  const handleDateChange = (newDate: string) => {
    setDateValue(newDate);
    if (newDate && timeValue) {
      const combined = new Date(`${newDate}T${timeValue}`);
      onChange(combined);
    } else if (!newDate) {
      onChange(null);
    }
  };

  const handleTimeChange = (newTime: string) => {
    setTimeValue(newTime);
    if (dateValue && newTime) {
      const combined = new Date(`${dateValue}T${newTime}`);
      onChange(combined);
    }
  };

  const handleClear = () => {
    setDateValue('');
    setTimeValue('');
    onChange(null);
    setShowPicker(false);
  };

  const formatDisplayValue = () => {
    if (!value) return placeholder;
    const date = new Date(value);
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(date);
  };

  const getMinDateString = () => {
    if (!minDate) return undefined;
    return minDate.toISOString().split('T')[0];
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}

      <div className="relative">
        <Button
          type="button"
          variant="outline"
          className="w-full justify-start text-left font-normal"
          onClick={() => setShowPicker(!showPicker)}
          disabled={disabled}
        >
          <Calendar className="mr-2 h-4 w-4" />
          <span className={value ? '' : 'text-muted-foreground'}>
            {formatDisplayValue()}
          </span>
        </Button>

        {showPicker && (
          <div className="absolute z-50 mt-2 w-full rounded-md border bg-popover p-4 shadow-md">
            <div className="space-y-4">
              <div>
                <Label htmlFor="date-input" className="text-sm">
                  Data
                </Label>
                <Input
                  id="date-input"
                  type="date"
                  value={dateValue}
                  onChange={(e) => handleDateChange(e.target.value)}
                  min={getMinDateString()}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="time-input" className="text-sm">
                  Hora
                </Label>
                <Input
                  id="time-input"
                  type="time"
                  value={timeValue}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleClear}
                  className="flex-1"
                >
                  Limpar
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => setShowPicker(false)}
                  className="flex-1"
                >
                  Confirmar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {value && (
        <p className="text-xs text-muted-foreground">
          O post será publicado automaticamente nesta data
        </p>
      )}
    </div>
  );
}
