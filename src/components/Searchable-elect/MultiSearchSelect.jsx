import { useEffect, useState } from "react";
import "./select.scss";

function Select(props) {
    const [inputText, setInputText] = useState("");
    const [showOption, setShowOption] = useState(false);
    const [selectOptions, setSelectOptions] = useState(props.options);
    const [multiOptions, setMultiOptions] = useState([]);

    const hnadleInputText = (e) => {
        setInputText(e.target.value);
        setShowOption(true);
        if (e.target.value !== "") {
            const filterText = props.options.filter((item) => {
                return item.label
                    .toLocaleLowerCase()
                    .includes(e.target.value.toLocaleLowerCase());
            });
            setSelectOptions(filterText);
        } else {
            setSelectOptions(props.options);
        }
    };

    const handleOption = (value) => {
        const isMulti = false;
        setShowOption(false);
        setSelectOptions(props.options);
        const selectValue = selectOptions.find((item) => item.value === value);
        if (isMulti) {
            setMultiOptions([...multiOptions, { selectValue }]);
            props.formik.setFieldValue(props.name, multiOptions);
        } else {
            setInputText(selectValue.label);
            props.formik.setFieldValue(props.name, selectValue.value);
        }
    };

    useEffect(() => {
        if (props.value) {
            const filterText = props.options.find(
                (item) => item.value === props.value
            );
            if (filterText) {
                props.formik.setFieldValue(props.name, filterText.value);
                setInputText(filterText.label);
            } else {
                props.formik.setFieldValue(props.name, props.value);
                setInputText(props.value);
            }
        }
    }, [props.value]);

    return (
        <div className="select-field">
            {props.labelText && (
                <label htmlFor={props.id}>
                    <span
                        className={
                            props.asterisk
                                ? "asterisk label_name"
                                : "label_name"
                        }
                    >
                        {props.labelText}
                    </span>
                </label>
            )}
            <div
                className={`close-select ${showOption ? "show" : ""}`}
                onClick={() => setShowOption(false)}
            ></div>
            <div className="select-area">
                <input
                    id={props.id}
                    name={props.name}
                    type="text"
                    onChange={(e) => {
                        props.formik.handleChange(e);
                        hnadleInputText(e);
                    }}
                    value={inputText}
                    onClick={() => setShowOption(!showOption)}
                    placeholder={props.labelText}
                    onBlur={props.formik.handleBlur}
                />
                <div>
                    {multiOptions.map((item, index) => (
                        <span key={index}>{item.label}</span>
                    ))}
                </div>
                <div className="error-message">
                    {props.formik.errors[props.name] && (
                        <span>{props.formik.errors[props.name]}</span>
                    )}
                </div>
                <div className={`input-options ${showOption ? "active" : ""}`}>
                    {selectOptions.length > 0 ? (
                        <>
                            {selectOptions.map((option, index) => (
                                <p
                                    key={index}
                                    onClick={() => handleOption(option.value)}
                                >
                                    {option.label}
                                </p>
                            ))}
                        </>
                    ) : (
                        <span>No Options</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Select;
