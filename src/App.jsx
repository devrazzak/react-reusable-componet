import { useFormik } from "formik";
import "./App.css";
import MultiSelect from "./components/Searchable-elect/MultiSearchSelect";

const options = [
    { label: "Apple", value: "apple" },
    { label: "Orange", value: "orange" },
    { label: "Banana", value: "banana" },
    { label: "Lichhu", value: "lichhu" },
    { label: "Pine Apple", value: "pine-apple" },
];

function App(props) {
    const validateDuaForm = (values) => {
        let errors = {};
        if (!values.category_name) errors.category_name = "Name is Required";
        return errors;
    };
    const formik = useFormik({
        initialValues: {
            category_name: "",
        },
        onSubmit: (values) => {
            console.log(values);
        },
        validate: validateDuaForm,
    });
    return (
        <div className="app">
            <MultiSelect
                id="category_name"
                name="category_name"
                labelText="select Category"
                asterisk={true}
                value={formik.values.category_name}
                options={options}
                formik={formik}
            />

            <button onClick={formik.handleSubmit} type="submit">
                button
            </button>

            <button
                type="button"
                onClick={() => {
                    formik.setFieldValue("category_name", "orange");
                }}
            >
                select
            </button>

            {/* <DropDownMenu /> */}
        </div>
    );
}

export default App;
