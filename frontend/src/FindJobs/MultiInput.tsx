import { useEffect, useState } from "react";
import {
  Checkbox,
  Combobox,
  Group,
  Input,
  Pill,
  PillsInput,
  useCombobox,
} from "@mantine/core";
import { IconSelector } from "@tabler/icons-react";

interface MultiInputProps {
  options?: string[];
  icon?: React.ElementType;
  title: string;
  onValueChange?: (value: string) => void;
}

const MultiInput = (props: MultiInputProps) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<string[]>([]);
  const [value, setValue] = useState<string[]>([]);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  useEffect(() => {
    setData(props.options || []);
  }, [props.options]);

  const exactOptionMatch = data.some((item) => item === search);

  const handleValueSelect = (val: string) => {
    setSearch("");

    if (val === "$create" && !data.includes(search)) {
      setData((current) => [...current, search]);
      const newValue = [...value, search];
      setValue(newValue);
      if (props.onValueChange && newValue.length > 0) {
        props.onValueChange(newValue[0]);
      }
    } else {
      const newValue = value.includes(val)
        ? value.filter((v) => v !== val)
        : [val]; // Only allow one selection
      setValue(newValue);
      if (props.onValueChange && newValue.length > 0) {
        props.onValueChange(newValue[0]);
      } else if (props.onValueChange && newValue.length === 0) {
        props.onValueChange("");
      }
    }
  };

  const handleValueRemove = (val: string) => {
    const newValue = value.filter((v) => v !== val);
    setValue(newValue);
    if (props.onValueChange) {
      props.onValueChange(newValue.length > 0 ? newValue[0] : "");
    }
  };

  const values = value.slice(0, 1).map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  const options = data
    .filter((item) => item.toLowerCase().includes(search.trim().toLowerCase()))
    .map((item) => (
      <Combobox.Option value={item} key={item} active={value.includes(item)}>
        <Group gap="sm">
          <Checkbox
            size="xs"
            color="brightSun.5"
            checked={value.includes(item)}
            readOnly
            aria-hidden
            tabIndex={-1}
            style={{ pointerEvents: "none" }}
          />
          <span className="text-mine-shaft-300">{item}</span>
        </Group>
      </Combobox.Option>
    ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={handleValueSelect}
      withinPortal={false}
    >
      <Combobox.DropdownTarget>
        <PillsInput
          variant="unstyled"
          leftSection={
            <div className="text-bright-sun-400 p-1 bg-mine-shaft-900 rounded-full mr-2">
              {props.icon ? <props.icon /> : null}
            </div>
          }
          rightSection={<IconSelector />}
          onClick={() => combobox.toggleDropdown()}
        >
          <Pill.Group>
            {value.length > 0 ? (
              <>
                {values}
                {value.length > 1 && (
                  <Pill>+{value.length - 1} more</Pill>
                )}
              </>
            ) : (
              <Input.Placeholder className="!text-mine-shaft-200">
                {props.title}
              </Input.Placeholder>
            )}
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Search
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          placeholder="Search items"
        />
        <Combobox.Options>
          {options.length > 0 ? (
            options
          ) : (
            <Combobox.Empty>Nothing found</Combobox.Empty>
          )}

          {!exactOptionMatch && search.trim().length > 0 && (
            <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default MultiInput;
