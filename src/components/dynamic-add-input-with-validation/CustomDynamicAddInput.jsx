import { useFormik } from 'formik';
import React, { useState } from 'react';

function CustomDynamicAddInput() {
    const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);
     
      // handle click event of the Remove button
      const handleRemoveClick = index => {
        const list = [...formik.values.dua];
        list.splice(index, 1);
        formik.setFieldValue('dua', list)
      };
     
      // handle click event of the Add button
      const handleAddClick = () => {
        formik.setFieldValue('dua', [...formik.values.dua, { firstName: "", lastName: "" }])
      };

    const validate = (values) => {
        let errors = {}
        values.dua.forEach((item, index) => {
            if (!item.firstName) {
              errors[index] = {firstName: "This field is required"}
            }
            if (!item.lastName) {
                errors[index] = {...errors[index], lastName: "This field is required"}
              }
            
          });
        return errors
    }

    const formik = useFormik({
        initialValues: {
            dua: [{ firstName: "", lastName: "" }]
        },
        onSubmit: (values) => {
            console.log(values)
        },
        validate: validate,
    });
  return (
    <div>
      {formik.values.dua.map((x, index) => {
        return (
          <div className="box" key={index}>
            <input
              name={`dua.${index}.firstName`}
              id={`dua.${index}.firstName`}
              placeholder="Enter First Name"
              value={formik.values.dua[index]?.firstName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <p>{formik.touched.dua && formik.touched.dua[index]?.firstName ||formik.isSubmitting ? formik.errors && formik.errors[index]?.firstName : ""}</p>
            <input
              className="ml10"
              name={`dua.${index}.lastName`}
              id={`dua.${index}.lastName`}
              placeholder="Enter Last Name"
              value={formik.values.dua[index]?.lastName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <p>{formik.touched.dua && formik.touched.dua[index]?.lastName ||formik.isSubmitting ? formik.errors &&formik.errors[index]?.lastName : ""}</p>
            <div className="btn-box">
              {formik.values.dua.length !== 1 && <button
                className="mr10"
                onClick={() => handleRemoveClick(index)}>Remove</button>}
              {formik.values.dua.length - 1 === index && <button onClick={handleAddClick}>Add</button>}
            </div>
          </div>
        );
      })}
      <button
        type='submit'
        onClick={formik.handleSubmit}
      >
        submit
      </button>
    </div>
  )
}
export default CustomDynamicAddInput