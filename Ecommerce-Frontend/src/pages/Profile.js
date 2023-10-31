import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../features/users/userSlice";
import { FiEdit } from "react-icons/fi";

const profileSchema = yup.object({
  firstname: yup.string().required("First Name is Required"),
  lastname: yup.string().required("Last Name is Required"),
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email Address is Required"),
  mobile: yup.string().required("Mobile No is Required"),
});

const Profile = () => {
  const getTokenFromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const config2 = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
      Accept: "application/json",
    },
  };

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.auth.user);
  const [edit, setEdit] = useState(true);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: userState?.firstname,
      lastname: userState?.lastname,
      email: userState?.email,
      mobile: userState?.mobile,
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      dispatch(updateUser({ data: values, config2: config2 }));
      setEdit(true);
    },
  });

  return (
    <>
      <BreadCrumb title="My Profile" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="my-3">Update Profile</h3>
              <FiEdit className="fs-3" onClick={() => setEdit(false)} />
            </div>
          </div>
          <div className="col-12">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="example1">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  className="form-control"
                  id="example1"
                  disabled={edit}
                  placeholder="First Name"
                  value={formik.values.firstname}
                  onChange={formik.handleChange("firstname")}
                  onBlur={formik.handleBlur("firstname")}
                />
                <div className="errors">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="example2">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  className="form-control"
                  id="example2"
                  disabled={edit}
                  placeholder="Last Name"
                  value={formik.values.lastname}
                  onChange={formik.handleChange("lastname")}
                  onBlur={formik.handleBlur("lastname")}
                />
                <div className="errors">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  name="email"
                  disabled={edit}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                />
                <div className="errors">
                  {formik.touched.email && formik.errors.email}
                </div>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="exampleInputEmail2">Mobile No</label>
                <input
                  type="number"
                  name="mobile"
                  disabled={edit}
                  className="form-control"
                  id="exampleInputEmail2"
                  placeholder="Mobile No"
                  value={formik.values.mobile}
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                />
                <div className="errors">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
              </div>
              {edit === false && (
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              )}
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
