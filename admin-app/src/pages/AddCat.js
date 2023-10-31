import React from "react";
import CustomInput from "../components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createCategory,
  getProductCategory,
  resetState,
  updateProductCategory,
} from "../features/pcategory/pcategorySlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Category Name is Required"),
});

const AddCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getPCatId = location.pathname.split("/")[3];
  const newCategory = useSelector((state) => state.pCategory);
  const {
    isSuccess,
    isLoading,
    isError,
    createdCategory,
    categoryName,
    updatedCategory,
  } = newCategory;

  useEffect(() => {
    if (getPCatId !== undefined) {
      dispatch(getProductCategory(getPCatId));
    } else {
      dispatch(resetState());
    }
  }, [getPCatId]);

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Category Added Successfully");
    }
    if (isSuccess && updatedCategory) {
      toast.success("Product Category Updated Successfully");
      navigate("/admin/category-list");
    }
    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isSuccess, isLoading, isError]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getPCatId !== undefined) {
        const data = { id: getPCatId, pCatData: values };
        dispatch(updateProductCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getPCatId !== undefined ? "Edit" : "Add"} Product Category
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Product Category"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button type="submit" className="btn-success border-0 rounded-0 my-5">
            {getPCatId !== undefined ? "Edit" : "Add"} Product Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCat;
