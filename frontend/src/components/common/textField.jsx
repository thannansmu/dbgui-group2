export const TextField = ({id, label, value, setValue}) => {
    return <>
        <div>
            <label htmlFor={ id }>{label}</label>
            <input id={id} name={id}
                type="text"
                value={value}
                onChange={event => setValue(event.target.value)} />
        </div>
    </>;
}