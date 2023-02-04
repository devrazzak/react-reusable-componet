import { Field, FieldArray, Form, Formik } from "formik";
import React from "react";

const initialValues = {
  items: [
    { name: "", quantity: "" },
    { name: "", quantity: "" },
  ],
};

const validateItems = (values) => {
  const errors = {};
  values.items.forEach((item, index) => {
    if (!item.name) {
      errors[index] = { name: "Required" };
    }
    if (!item.quantity) {
      errors[index] = { ...errors[index], quantity: "Required" };
    }
  });
  return errors;
};

const ArrayOfObjectsForm = () => (
  <Formik
    initialValues={initialValues}
    validate={validateItems}
    onSubmit={(values, { setSubmitting }) => {
      console.log(values)
    }}
  >
    {({values, errors, isSubmitting }) => (
      <Form>
        <FieldArray
          name="items"
          render={(arrayHelpers) => (
            <div>
              {values.items.map((item, index) => (
                <div key={index}>
                  <Field
                    name={`items.${index}.name`}
                    placeholder="Item Name"
                  />
                  {errors[index] && errors[index].name ? (
                    <div>{errors[index].name}</div>
                  ) : null}
                  <Field
                    name={`items.${index}.quantity`}
                    placeholder="Quantity"
                  />
                  {errors[index] && errors[index].quantity ? (
                    <div>{errors[index].quantity}</div>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => arrayHelpers.remove(index)}
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => arrayHelpers.insert(index + 1, {})}
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
          )}
        />
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </Form>
    )}
  </Formik>
);

export default ArrayOfObjectsForm;