import React from "react";
import Head from "next/head";
import "./index.css";
import { Formik, FormikErrors, Form, Field } from "formik";
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

interface HistoryItem {
  sent: string;
  received: string;
  // key: number | string;
}

const Home = () => {
  const [starSign, setStarSign] = React.useState<string | null>(null);
  const [chatHistory, setChatHistory] = React.useState<HistoryItem[]>([]);
  return (
    <>
      <Head>
        <title>Astrology chat</title>
      </Head>

      <h1>Astrology chat</h1>

      {starSign ? (
        <>
          {chatHistory.length ? (
            <ul>
              {chatHistory.map((o, i) => (
                <li key={i}>
                  You: {o.sent}
                  <br />
                  Me: {o.received}
                </li>
              ))}
            </ul>
          ) : null}
          <Formik
            initialValues={{ message: "" }}
            validate={values => {
              const errors: FormikErrors<typeof values> = {};
              if (!values.message) {
                errors.message = "Required";
              }
              return errors;
            }}
            onSubmit={({ message }, { setSubmitting, resetForm }) => {
              setChatHistory(
                chatHistory.concat({
                  sent: message,
                  received: `Wow, you're such a ${starSign}`
                })
              );

              resetForm();
              setSubmitting(false);
            }}
            render={({ errors, isSubmitting }) => (
              <Form>
                <p>Talk to me!</p>
                <Field name="message" id="message" />
                {errors.message ? <p>{errors.message}</p> : null}
                <p>
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </p>
              </Form>
            )}
          />
        </>
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
            const birthdate = values.birthdate!;

            const month = birthdate.month();
            const day = birthdate.day();

            const match = data.filter(
              o =>
                (day >= o.d1 && month == o.m1) || (day <= o.d2 && month == o.m2)
            )[0];

            // TODO: Properly
            setStarSign(match.name);
            setSubmitting(false);
          }}
          render={({ values, errors, setFieldValue, isSubmitting }) => (
            <Form>
              <p>What is your birth date?</p>
              <Datetime
                timeFormat={false}
                value={values.birthdate}
                closeOnSelect
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
