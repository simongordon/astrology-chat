import React from "react";
import Head from "next/head";
import "./index.css";
import { Formik, FormikErrors, Form } from "formik";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";

const data = [
  { name: "Aries", m1: 3, d1: 21, m2: 5, d2: 19 },
  { name: "Taurus", m1: 4, d1: 20, m2: 5, d2: 20 },
  { name: "Gemini", m1: 5, d1: 21, m2: 6, d2: 20 },
  { name: "Cancer", m1: 6, d1: 21, m2: 7, d2: 22 },
  { name: "Leo", m1: 7, d1: 23, m2: 8, d2: 22 },
  { name: "Virgo", m1: 8, d1: 23, m2: 9, d2: 22 },
  { name: "Libra", m1: 9, d1: 23, m2: 10, d2: 22 },
  { name: "Scorpio", m1: 10, d1: 23, m2: 11, d2: 21 },
  { name: "Sagittarius", m1: 11, d1: 22, m2: 12, d2: 21 },
  { name: "Capricorn", m1: 12, d1: 22, m2: 1, d2: 19 },
  { name: "Aquarius", m1: 1, d1: 20, m2: 2, d2: 18 },
  { name: "Pisces", m1: 2, d1: 19, m2: 3, d2: 20 }
];

const Home = () => {
  const [starSign, setStarSign] = React.useState<string | null>(null);
  return (
    <>
      <Head>
        <title>Astrology chat</title>
      </Head>

      <h1>Astrology chat</h1>

      {starSign ? (
        <p>You are a {starSign}</p>
      ) : (
        <Formik
          initialValues={{ birthdate: null as null | moment.Moment }}
          validate={values => {
            const errors: FormikErrors<typeof values> = {};
            if (!values.birthdate) {
              // @ts-ignore Go home formik, you're drunk
              errors.birthdate = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const f = values.birthdate!;

            // TODO: Properly
            setStarSign(data[0].name);
            setSubmitting(false);
          }}
          render={({ values, errors, setFieldValue, isSubmitting }) => (
            <Form>
              <Datetime
                timeFormat={false}
                value={values.birthdate}
                onChange={e => {
                  setFieldValue("birthdate", e);
                }}
              />
              {errors.birthdate ? <p>{errors.birthdate}</p> : null}
              <p>
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </p>
            </Form>
          )}
        />
      )}
    </>
  );
};

export default Home;
