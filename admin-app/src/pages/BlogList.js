import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getBlogs, resetState } from "../features/blogs/blogSlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BlogList = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setBlogId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setBlogId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, []);
  const blogState = useSelector((state) => state.blogs.blogs);

  const data1 = [];
  for (let i = 0; i < blogState.length; i++) {
    data1.push({
      key: i + 1,
      title: blogState[i].title,
      category: blogState[i].category,
      action: (
        <>
          <Link
            to={`/admin/blog/${blogState[i]._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            onClick={() => showModal(blogState[i]._id)}
            className=" ms-3 fs-3 text-danger bg-transparent border-0"
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteABlog = (e) => {
    dispatch(deleteBlog(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Blogs List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteABlog(blogId);
        }}
        title="Are you sure you want to delete this Blog?"
      />
    </div>
  );
};

export default BlogList;
