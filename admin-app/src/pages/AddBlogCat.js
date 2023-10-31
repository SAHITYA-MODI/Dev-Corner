import React from "react";
import CustomInput from "../components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createBlogCategory,
  getBlogCategory,
  resetState,
  updateBlogCategory,
} from "../features/bcategory/bcategorySlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Category Name is Required"),
});

const AddBlogCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogCatId = location.pathname.split("/")[3];
  const newBlogCategory = useSelector((state) => state.bCategory);
  const {
    isSuccess,
    isLoading,
    isError,
    createdBlogCategory,
    updatedBlogCategory,
    blogCategoryName,
  } = newBlogCategory;

  useEffect(() => {
    if (getBlogCatId !== undefined) {
      dispatch(getBlogCategory(getBlogCatId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogCatId]);

  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast.success("Blog Category Added Successfully");
    }
    if (isSuccess && updatedBlogCategory) {
      toast.success("Blog Category Updated Successfully");
      navigate("/admin/blog-category-list");
    }
    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isSuccess, isLoading, isError]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCategoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogCatId !== undefined) {
        const data = { id: getBlogCatId, blogCatData: values };
        dispatch(updateBlogCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogCategory(values));
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
        {getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Blog Category"
            id="blogcat"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button type="submit" className="btn-success border-0 rounded-0 my-5">
            {getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCat;
