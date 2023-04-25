export const TextField = ({ id, label, value, setValue, type = 'text' }) => {
    return <>
        <div className="form-group mb-3">
            <label htmlFor={id}>{label}</label>
            <input id={id} name={id}
                className="form-control"
                type={type}
                value={value}
                onChange={event => setValue(event.target.value)} />
        </div>
    </>;
}