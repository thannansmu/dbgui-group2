export const TextAreaField = ({ id, label, value, setValue }) => {
    return <>
        <div className="form-group mb-3">
            <label htmlFor={id}>{label}</label>
            <textarea id={id} name={id}
                className="form-control"
                value={value}
                onChange={event => setValue(event.target.value)} />
        </div>
    </>;
}