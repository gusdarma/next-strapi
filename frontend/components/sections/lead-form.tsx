import { useState } from "react";
import { fetchAPI } from "utils/api";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import Button from "../elements/button";

interface typesLeadForm{
    data:{
        title: string;
        location: string;
        emailPlaceholder: string;
        submitButton: (string | number)[];
    }
}

const LeadForm: React.FC<typesLeadForm> = ({ data }) => {
    const [loading, setLoading] = useState(false);

    const LeadSchema = yup.object().shape({
        email: yup.string().email().required(),
    });

    return (
        <div className="py-10 text-center">
            <h1 className="mb-2 mb-10 text-3xl font-bold">{data.title}</h1>
            <div className="flex flex-col items-center">
                <Formik
                    initialValues={{ email: "" }}
                    validationSchema={LeadSchema}
                    onSubmit={async (values, { setSubmitting, setErrors }) => {
                        setLoading(true);

                        try {
                            setErrors({ api: null });
                            await fetchAPI("/lead-form-submissions", {
                                method: "POST",
                                body: JSON.stringify({
                                    email: values.email,
                                    location: data.location,
                                }),
                            });
                        } catch (err) {
                            setErrors({ api: err.message });
                        }

                        setLoading(false);
                        setSubmitting(false);
                    }}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <div>
                            <Form className="flex flex-col gap-4 md:flex-row">
                                <Field
                                    className="px-4 py-4 text-base border-2 rounded-md focus:outline-none md:py-0"
                                    type="email"
                                    name="email"
                                    placeholder={data.emailPlaceholder}
                                />
                                <Button
                                    type="submit"
                                    button={data.submitButton}
                                    disabled={isSubmitting}
                                    loading={loading}
                                />
                            </Form>
                            <p className="h-12 mt-1 ml-2 text-sm text-left text-red-500">
                                {(errors.email &&
                                    touched.email &&
                                    errors.email) ||
                                    errors.api}
                            </p>
                        </div>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default LeadForm;
