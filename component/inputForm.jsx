import React from "react";
import { useState } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { FormControl, Row, Col } from "react-bootstrap";

const FormSchema = Yup.object().shape({
  date: Yup.date().required("Required"),
  systolic: Yup.number()
    .required()
    .min(100, "Must be greater than 100")
    .max(250, "Must be less than 250"),
  diastolic: Yup.number()
    .required()
    .min(50, "Must be greater than 50")
    .max(200, "Must be less than 200"),
});

function getTodayDate() {
  var d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export default function InputForm() {
  const [displayMessage, setDisplayMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  return (
    <Formik
      initialValues={{
        date: getTodayDate(),
        systolic: 0,
        diastolic: 0,
      }}
      validationSchema={FormSchema}
      onSubmit={async function (values) {
        console.log(values);
        const resp = await fetch("/api/data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setMessage(data.message);
            setDisplayMessage(true);
            if (data.status == 0) {
              setError(true);
            } else {
              setError(false);
            }
          });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        handleBlur,
      }) => (
        <Form>
          {displayMessage && (
            <Alert variant={error ? "danger": "success"}>
              <Alert.Heading>Note</Alert.Heading>
              <p>{message}</p>
            </Alert>
          )}
          <Form.Group className="mb-2" controlId="formDate">
            <Form.Label>Date</Form.Label>
            <FormControl
              type="date"
              name="date"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.date}
              isValid={touched.date && !errors.date}
              isInvalid={errors.date}
            />
            <Form.Text id="dateHelpBlock" muted>
              {errors.date && touched.date ? (
                <ErrorMessage name="date" />
              ) : (
                "Your date must be before today date or today date"
              )}
            </Form.Text>
          </Form.Group>

          <Row className="mb-2">
            <Form.Group as={Col} controlId="formSystolic">
              <Form.Label>Systolic</Form.Label>
              <FormControl
                type="text"
                name="systolic"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.systolic}
                isValid={touched.systolic && !errors.systolic}
                isInvalid={errors.systolic}
              />
              <Form.Text id="systolicHelpBlock" muted>
                {errors.systolic && touched.systolic ? (
                  <ErrorMessage name="systolic" />
                ) : (
                  "Your value must be between 100 and 250"
                )}
              </Form.Text>
            </Form.Group>

            <Form.Group as={Col} controlId="formDiastolic">
              <Form.Label>Diastolic</Form.Label>
              <FormControl
                type="text"
                name="diastolic"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.diastolic}
                isValid={touched.diastolic && !errors.diastolic}
                isInvalid={errors.diastolic}
              />
              <Form.Text id="diastolicHelpBlock" muted>
                Your value must be between 50 and 200
              </Form.Text>
            </Form.Group>
          </Row>
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              type="button"
              className="btn-block"
              onClick={handleSubmit}
              size="lg"
            >
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
