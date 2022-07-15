import { Combobox } from '@headlessui/react';
import { isEqual } from 'lodash';
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './SelectList.css';

export type SelectListOptionType = {
  id: string;
  name: string;
};

export type SelectListProps<T extends SelectListOptionType> = {
  label: string;
  variant: 'green' | 'red';
  options: T[];
  onChange: (values: T[]) => void;
};

export function SelectList<T extends SelectListOptionType>({
  label,
  variant,
  options,
  onChange,
}: SelectListProps<T>) {
  const [query, setQuery] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<T[]>([]);
  const previousSelectedOptions = useRef(selectedOptions);

  const inputHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const filtered = useMemo(() => {
    return query !== ''
      ? options.filter((opt) =>
          opt.name.toLowerCase().includes(query.toLowerCase())
        )
      : options;
  }, [query, options]);

  useEffect(() => {
    if (!isEqual(selectedOptions, previousSelectedOptions.current)) {
      onChange(selectedOptions);
    }
  }, [selectedOptions, onChange]);

  return (
    <Combobox multiple value={selectedOptions} onChange={setSelectedOptions}>
      {!!label && <Combobox.Label>{label}</Combobox.Label>}
      <Combobox.Input onChange={inputHandler} className="SelectList-input" />
      <Combobox.Options hold className="SelectList-option_box">
        {filtered.map((opt) => (
          <Combobox.Option
            key={opt.id}
            value={opt}
            className={`SelectList-option SelectList-option--${variant}`}
          >
            {opt.name}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}
