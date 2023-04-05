export const TextAreaField = ({id, label, value, setValue}) => {
    return <>
        <div>
            <label htmlFor={ id }>{label}</label>
            <textarea id={id} name={id}
                value={value}
                onChange={event => setValue(event.target.value)}>
            </textarea>  
        </div>
    </>;
}