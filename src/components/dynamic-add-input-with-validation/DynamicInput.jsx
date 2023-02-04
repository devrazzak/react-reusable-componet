import { FieldArray, FormikProvider, useFormik } from "formik";
import * as Yup from 'yup';

function DynamicInput() {
    // Dua Form Validation Function
    const validateDuaForm = Yup.object().shape({
        dua: Yup.array().of(
            Yup.object().shape({arabic_text: Yup.string().trim().required("This Field is Required"),
            })
        ),
    });
    const validate = (values) => {
        let errors = {}
        if(!values.name) errors.name = "This field is required"
        values.dua.forEach((item, index) => {
            if (!item.arabic_text) {
              errors[index] = {arabic_text: "This field is required"}
            }
          });
        return errors
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            dua: [
                {
                    arabic_text: "",
                },
            ],
        },
        onSubmit: (values) => {
            console.log(values)
        },
        validate: validate,
    });

    return (
        <div>
            <FormikProvider value={formik}>
            <input
                type="text"
                name='name'
                id='name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
            />
            <p>{formik.touched.name ||formik.isSubmitting ? formik.errors.name : ""}</p>
                <FieldArray
                    name="dua"
                    render={(arrayHelpers) => {
                        return (
                            <div>
                                {formik?.values?.dua?.map((item, index) => (
                                    <div key={index} className="row">
                                        <div className="col-md-11">
                                            <input
                                                type="text"
                                                name={`dua.${index}.arabic_text`}
                                                id={`dua.${index}.arabic_text`}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.dua[index]?.arabic_text}
                                            />
                                            <p>{formik.touched.dua && formik.touched.dua[index]?.arabic_text ||formik.isSubmitting ? formik.errors &&formik.errors[index]?.arabic_text : ""}</p>
                                            {/* <InputField
                                                id={`dua.${index}.arabic_text`}
                                                inputLabel="Ayat Name"
                                                placeHolder="Ayat Name"
                                                textType="text"
                                                inputName={`dua.${index}.arabic_text`}
                                                asterisk={true}
                                                whiteSpace={false}
                                                onBlur={formik.handleBlur}
                                                value={
                                                    formik.values.dua[index]
                                                        ?.arabic_text
                                                }
                                                onchangeCallback={
                                                    formik.handleChange
                                                }
                                                inputClassName={
                                                    formik.touched.dua &&
                                                    formik.touched.dua[index]
                                                        ?.arabic_text &&
                                                    formik.errors.dua &&
                                                    formik.errors.dua[index]
                                                        ?.arabic_text
                                                        ? " is-invalid"
                                                        : ""
                                                }
                                                requiredMessage={
                                                    formik.touched.dua &&
                                                    formik.touched.dua[index]
                                                        ?.arabic_text &&
                                                    formik.errors.dua &&
                                                    formik.errors.dua[index]
                                                        ?.arabic_text
                                                }
                                                requiredMessageLabel={
                                                    (formik.touched.dua &&
                                                        formik.touched.dua[
                                                            index
                                                        ]?.arabic_text) ||
                                                    formik.isSubmitting
                                                        ? formik.errors.dua &&
                                                          formik.errors.dua[
                                                              index
                                                          ]?.arabic_text
                                                        : ""
                                                }
                                            />

                                            <InputField
                                                id={`dua.${index}.pronunciation_text`}
                                                inputLabel="Arabic Text"
                                                placeHolder="Arabic Text"
                                                textType="text"
                                                inputName={`dua.${index}.pronunciation_text`}
                                                asterisk={true}
                                                whiteSpace={false}
                                                onBlur={formik.handleBlur}
                                                value={
                                                    formik.values.dua[index]
                                                        ?.pronunciation_text
                                                }
                                                onchangeCallback={
                                                    formik.handleChange
                                                }
                                                inputClassName={
                                                    formik.touched.dua &&
                                                    formik.touched.dua[index]
                                                        ?.pronunciation_text &&
                                                    formik.errors.dua &&
                                                    formik.errors.dua[index]
                                                        ?.pronunciation_text
                                                        ? " is-invalid"
                                                        : ""
                                                }
                                                requiredMessage={
                                                    formik.touched.dua &&
                                                    formik.touched.dua[index]
                                                        ?.pronunciation_text &&
                                                    formik.errors.dua &&
                                                    formik.errors.dua[index]
                                                        ?.pronunciation_text
                                                }
                                                requiredMessageLabel={
                                                    (formik.touched.dua &&
                                                        formik.touched.dua[
                                                            index
                                                        ]
                                                            ?.pronunciation_text) ||
                                                    formik.isSubmitting
                                                        ? formik.errors.dua &&
                                                          formik.errors.dua[
                                                              index
                                                          ]?.pronunciation_text
                                                        : ""
                                                }
                                            />

                                            <InputField
                                                id={`dua.${index}.meaning_text`}
                                                inputLabel="English Text"
                                                placeHolder="English Text"
                                                textType="text"
                                                inputName={`dua.${index}.meaning_text`}
                                                asterisk={true}
                                                whiteSpace={false}
                                                onBlur={formik.handleBlur}
                                                value={
                                                    formik.values.dua[index]
                                                        ?.meaning_text
                                                }
                                                onchangeCallback={
                                                    formik.handleChange
                                                }
                                                inputClassName={
                                                    formik.touched.dua &&
                                                    formik.touched.dua[index]
                                                        ?.meaning_text &&
                                                    formik.errors.dua &&
                                                    formik.errors.dua[index]
                                                        ?.meaning_text
                                                        ? " is-invalid"
                                                        : ""
                                                }
                                                requiredMessage={
                                                    formik.touched.dua &&
                                                    formik.touched.dua[index]
                                                        ?.meaning_text &&
                                                    formik.errors.dua &&
                                                    formik.errors.dua[index]
                                                        ?.meaning_text
                                                }
                                                requiredMessageLabel={
                                                    (formik.touched.dua &&
                                                        formik.touched.dua[
                                                            index
                                                        ]?.meaning_text) ||
                                                    formik.isSubmitting
                                                        ? formik.errors.dua &&
                                                          formik.errors.dua[
                                                              index
                                                          ]?.meaning_text
                                                        : ""
                                                }
                                            />*/}
                                        </div>
                                        <div className="col-md-1 multi-dua-remove-btn">
                                            {index > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        arrayHelpers.remove(
                                                            index
                                                        );
                                                    }}
                                                >
                                                    <i className="icofont icofont-ui-remove"></i>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            arrayHelpers.push({
                                                arabic_text: "",
                                            });
                                        }}
                                    >
                                        Add More Field
                                    </button>
                                </div>
                            </div>
                        );
                    }}
                />
                <div className="modal-footer">
                    <button type="submit" onClick={formik.handleSubmit}>
                        add
                    </button>
                </div>
            </FormikProvider>
        </div>
    );
}

export default DynamicInput;
