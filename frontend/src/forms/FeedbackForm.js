import React, { useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { validationSchema } from "../schema/FeedbackForm";
import { Col, Row } from "react-bootstrap";
import MenuItem from "@mui/material/MenuItem";
import { requestStatusOptions } from "../assets/data/requestStatusOptions";
import { convertToBase64 } from "../utils/convertToBase64";
import { addFeedback } from "../utils/addFeedback";

const RegisterForm = () => {
  const [file, setFile] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      subject: "",
      message: "",
      contact: "",
      status: "Low",
    },

    validationSchema: validationSchema,

    onSubmit: (values) => {
      addFeedback(values, file, setFile);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        size="large"
        margin="normal"
        variant="outlined"
        fullWidth
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        size="large"
        margin="normal"
        variant="outlined"
        fullWidth
        id="subject"
        name="subject"
        label="Subject"
        value={formik.values.subject}
        onChange={formik.handleChange}
        error={formik.touched.subject && Boolean(formik.errors.subject)}
        helperText={formik.touched.subject && formik.errors.subject}
      />
      <TextField
        size="large"
        margin="normal"
        variant="outlined"
        fullWidth
        id="message"
        name="message"
        label="Mention your query here"
        multiline
        rows={4}
        value={formik.values.message}
        onChange={formik.handleChange}
        error={formik.touched.message && Boolean(formik.errors.message)}
        helperText={formik.touched.message && formik.errors.message}
      />
      <Row>
        <Col>
          <h5>Attachments</h5>
          <Button component="label" className="chose-file">
            Upload File
            <input
              type="file"
              hidden
              accept=".jpg,.jpeg"
              onChange={(e) => convertToBase64(e, setFile)}
            />
          </Button>
          *Images should be in JPG format
        </Col>
      </Row>
      <Row>
        <Col>
          <TextField
            size="large"
            margin="normal"
            variant="outlined"
            fullWidth
            id="contact"
            name="contact"
            label="Contact"
            value={formik.values.contact}
            onChange={(event) => {
              const input = event.target.value;
              const digitsOnly = input.replace(/\D/g, ""); // Remove non-digit characters
              formik.setFieldValue("contact", digitsOnly);
            }}
            error={formik.touched.contact && Boolean(formik.errors.contact)}
            helperText={formik.touched.contact && formik.errors.contact}
            inputProps={{
              maxLength: 10,
            }}
          />
        </Col>
        <Col>
          <TextField
            select
            size="large"
            margin="normal"
            variant="outlined"
            fullWidth
            id="status"
            name="status"
            label="How critical is your request?"
            defaultValue="Low"
            onChange={formik.handleChange}
          >
            {requestStatusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </Col>
      </Row>

      <Row>
        <Col>
          <Button type="submit" className="submit-form-btn">
            Send
          </Button>
          <a href="/">Cancel</a>
        </Col>
        <Col>
          <h4> AIVision Helpline: +91-9924300511</h4>
          <p> Monday - Friday, 10:00 AM - 7:00 PM</p>
        </Col>
      </Row>
    </form>
  );
};

export default RegisterForm;
