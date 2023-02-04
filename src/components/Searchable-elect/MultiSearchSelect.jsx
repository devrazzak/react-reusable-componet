import { useEffect, useRef, useState } from "react";
import "./select.scss";

function MultiSelect(props) {
    const [inputText, setInputText] = useState("");
    const [showOption, setShowOption] = useState(false);
    const [multiOptions, setMultiOptions] = useState([]);
    const [storeOptions, setStoreOptions] = useState(props.options);
    const [selectOptions, setSelectOptions] = useState(storeOptions);
    const [deleteIndex, setDeleteIndex] = useState("");
    const inputRef = useRef();
    const isMulti = props.multi;

    const hnadleInputText = (e) => {
        setInputText(e.target.value);
        setShowOption(true);
        if (isMulti) {
            if (e.target.value !== "") {
                const filterText = storeOptions.filter((item) => {
                    return item.label
                        .toLocaleLowerCase()
                        .includes(e.target.value.toLocaleLowerCase());
                });
                setSelectOptions(filterText);
            } else {
                setSelectOptions(storeOptions);
            }
        } else {
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
        }
    };

    const handleOption = (value) => {
        setShowOption(false);
        const selectValue = selectOptions.find((item) => item.value === value);
        const index = selectOptions.findIndex((item) => item.value === value);
        setDeleteIndex(index);
        if (isMulti) {
            setMultiOptions([...multiOptions, selectValue]);
            const filterText = storeOptions.filter(
                (item) => item.value !== selectValue.value
            );
            props.formik.setFieldValue(props.name, [
                ...props.formik.values[props.name],
                selectValue.value,
            ]);
            setStoreOptions(filterText);
            setSelectOptions(filterText);
        } else {
            setSelectOptions(props.options);
            setInputText(selectValue.label);
            props.formik.setFieldValue(props.name, selectValue.value);
        }
    };

    useEffect(() => {
        if (isMulti) {
        } else {
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
        }
    }, [props.value]);

    const addCursor = () => {
        inputRef.current.select();
        setShowOption(true);
    };

    const deleteOptions = (option) => {
        const deleteText = multiOptions.filter(
            (item) => item.value !== option.value
        );
        setMultiOptions(deleteText);
        const formikValue = deleteText.map((item) => item.value);
        console.log("formkiValue", formikValue.length);
        if (formikValue.length > 0) {
            props.formik.setFieldValue(props.name, formikValue);
        } else {
            props.formik.setFieldValue(props.name, "");
        }
        let newSelect = [...selectOptions];
        newSelect.splice(deleteIndex, 0, option);
        setStoreOptions(newSelect);
        setSelectOptions(newSelect);
    };

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
                {isMulti ? (
                    <div className="multi-selec-area" onClick={addCursor}>
                        <div className="input-box-area">
                            {multiOptions.map((item, index) => (
                                <div className="options" key={index}>
                                    {item.label}
                                    <span onClick={() => deleteOptions(item)}>
                                        x
                                    </span>
                                </div>
                            ))}
                            <div className="input-box">
                                <input
                                    className="multi-select"
                                    id={props.id}
                                    name={props.name}
                                    type="text"
                                    onChange={(e) => {
                                        props.formik.handleChange(e);
                                        hnadleInputText(e);
                                    }}
                                    value={inputText}
                                    ref={inputRef}
                                    onClick={() => setShowOption(!showOption)}
                                    placeholder={props.labelText}
                                    onBlur={props.formik.handleBlur}
                                />
                            </div>
                        </div>
                        <div className="input-cross"></div>
                    </div>
                ) : (
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
                )}
                <div className="error-message">
                    {props.formik.errors[props.name] && (
                        <span>{props.formik.errors[props.name]}</span>
                    )}
                </div>
                <div className={`input-options ${showOption ? "active" : ""}`}>
                    {selectOptions?.length > 0 ? (
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

export default MultiSelect;

// how to call it

{
    /* 
    // multiselect options 
    const options = [
        { label: "Apple", value: "apple" },
        { label: "Orange", value: "orange" },
        { label: "Banana", value: "banana" },
        { label: "Lichhu", value: "lichhu" },
        { label: "Pine Apple", value: "pine-apple" },
    ];
    // formik validation
    const validateDuaForm = (values) => {
        let errors = {};
        if (!values.category_name) errors.category_name = "Name is Required";
        return errors;
    };

    // formik initialization 
    const formik = useFormik({
        initialValues: {
            category_name: "",
        },
        onSubmit: (values) => {
            console.log(values);
        },
        validate: validateDuaForm,
    });
    
    // component calling
    <MultiSelect
        id="category_name"
        name="category_name"
        labelText="select Category"
        asterisk={true}
        value={formik.values.category_name}
        options={options}
        formik={formik}
        multi={false}
    />

    // on submit button
    <button onClick={formik.handleSubmit} type="submit">
        button
    </button>

    // if you set value a value after a operation then it. It only works single select not multiple
    <button
        type="button"
        onClick={() => {
            formik.setFieldValue("category_name", "orange");
        }}
    >
        select
    </button>
*/
}
