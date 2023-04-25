export const CheckboxList = ({ id, label, value, setValue, options, checkedItems, setCheckedItems }) => {

  const handleChange = (event) => {
    setCheckedItems({ ...checkedItems, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      {options.map((option) => (
        <div key={option.value}>
          <label>
            <input
              type="checkbox"
              name={option.name}
              checked={checkedItems[option.name] || false}
              onChange={handleChange}
            />
            {option.name}
          </label>
        </div>
      ))}
    </div>
  );
};
