const SelectBox = ({label, options, baseValue, onChange}) => {
    return (
        <div className={"select-box button"}>
            <select className={"select-box__list"} value={`${baseValue}`} onChange={onChange}>
                {
                    options.map((option, index) => (
                        <option key={index}
                                className={"select-box__item"}
                        >
                            {option}
                        </option>))
                }
            </select>
            {label && <label className={"select-box__label"}>{label}</label>}
        </div>
    )
}

export default SelectBox;
