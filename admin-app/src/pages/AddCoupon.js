import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createCoupon,
  getCoupon,
  resetState,
  updateCoupon,
} from "../features/coupon/couponSlice";

let schema = Yup.object().shape({
  name: Yup.string().required("Coupon Name is Required"),
  expiry: Yup.date().required("Expiry Date is Required"),
  discount: Yup.number().required("Discount Percentage is Required"),
});
const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCouponId = location.pathname.split("/")[3];
  const newCoupon = useSelector((state) => state.coupon);
  const {
    isSuccess,
    isLoading,
    isError,
    createdCoupon,
    updatedCoupon,
    couponName,
    couponDiscount,
    couponExpiry,
  } = newCoupon;

  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    return [year, month, day].join("-");
  };

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getCoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [getCouponId]);

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Coupon Added Successfully");
    }
    if (isSuccess && updatedCoupon) {
      toast.success("Coupon Updated Successfully");
      navigate("/admin/coupon-list");
    }
    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isSuccess, isLoading, isError]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || "",
      expiry: changeDateFormat(couponExpiry) || "",
      discount: couponDiscount || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: values };
        dispatch(updateCoupon(data));
        dispatch(resetState());
      } else {
        dispatch(createCoupon(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getCouponId !== undefined ? "Edit" : "Add"} Coupon
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            id="name"
            name="name"
            onChng={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
            label="Enter Coupon Name"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="date"
            id="expiry"
            name="expiry"
            onChng={formik.handleChange("expiry")}
            onBlr={formik.handleBlur("expiry")}
            val={formik.values.expiry}
            label="Enter Expiry Date"
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <CustomInput
            type="number"
            id="discount"
            name="discount"
            onChng={formik.handleChange("discount")}
            onBlr={formik.handleBlur("discount")}
            val={formik.values.discount}
            label="Enter Discount"
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <button type="submit" className="btn-success border-0 rounded-0 my-5">
            {getCouponId !== undefined ? "Edit" : "Add"} Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
