export const SelectField = ({ id, label, value, setValue, options, hideBlankOption, defaultOption }) => {
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <select
          id={id}
          name={id}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        >
          {!hideBlankOption && <option>{defaultOption}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };
  