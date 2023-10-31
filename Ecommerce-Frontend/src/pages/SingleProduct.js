import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import ProductCard from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from "react-image-zoom";
import Color from "../components/Color";
import { AiOutlineHeart } from "react-icons/ai";
import { TbGitCompare } from "react-icons/tb";
import Container from "../components/Container";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAProduct,
  getAllProducts,
  rateProduct,
} from "../features/products/productSlice";
import { toast } from "react-toastify";
import { addToCart, getCart } from "../features/users/userSlice";

const SingleProduct = () => {
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [popularProduct, setPopularProduct] = useState([]);
  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const getProductId = location.pathname.split("/")[2];
  const dispatch = useDispatch();

  const uploadCart = () => {
    if (color === null) {
      toast.error("Please Choose Color");
      return false;
    } else {
      dispatch(
        addToCart({
          productId: productState?._id,
          quantity,
          color,
          price: productState?.price,
        })
      );
      navigate("/cart");
    }
  };

  const productState = useSelector((state) => state?.product?.singleProduct);
  const productsState = useSelector((state) => state?.product?.product);
  const cartState = useSelector((state) => state?.auth?.cartProducts);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState.length; index++) {
      const element = productsState[index];
      if (element.tags === "popular") {
        data.push(element);
      }
      setPopularProduct(data);
    }
  }, [productState]);

  useEffect(() => {
    dispatch(getAProduct(getProductId));
    dispatch(getCart());
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.productId?._id) {
        setAlreadyAdded(true);
      }
    }
  }, []);

  const props = {
    width: 400,
    height: 600,
    zoomWidth: 600,
    img: productState?.images[0]?.url
      ? productState?.images[0]?.url
      : "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg",
  };

  const [orderedProduct, setorderedProduct] = useState(true);

  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  const addRatingToProduct = () => {
    if (star === null) {
      toast("Please add star rating to product");
      return false;
    } else if (comment === null) {
      toast("Please write review about product");
      return false;
    } else {
      dispatch(
        rateProduct({ star: star, comment: comment, prodId: getProductId })
      );
      setTimeout(() => {
        dispatch(getAProduct(getProductId));
      }, 100);
    }
  };

  return (
    <>
      <BreadCrumb title={productState?.title} />
      <Container class1="main-product-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                <ReactImageZoom {...props} />
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              {productState?.map((item, index) => {
                return (
                  <div>
                    <img src={item?.url} className="img-fluid" alt="" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">{productState?.title}</h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">$ {productState?.price}</p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    value={productState?.totalrating}
                    edit={false}
                    size={24}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">( 2 Reviews )</p>
                </div>
                <a className="review-btn" href="#review">
                  Write a review
                </a>
              </div>
              <div className="py-3">
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3 className="product-heading">Type :</h3>
                  <p className="product-data">Watch</p>
                </div>
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3 className="product-heading">Brand :</h3>
                  <p className="product-data">{productState?.brand}</p>
                </div>
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3 className="product-heading">Category :</h3>
                  <p className="product-data">{productState?.category}</p>
                </div>
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3 className="product-heading">Tags :</h3>
                  <p className="product-data">{productState?.tags}</p>
                </div>
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3 className="product-heading">Availability :</h3>
                  <p className="product-data">In Stock</p>
                </div>
                <div className="d-flex flex-column gap-10 mb-3 mt-2">
                  <h3 className="product-heading">Size :</h3>
                  <div className="d-flex flex-wrap gap-15">
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      S
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      M
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      L
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      XXL
                    </span>
                  </div>
                </div>
                {alreadyAdded === false && (
                  <>
                    <div className="d-flex flex-column gap-10 mb-3 mt-2">
                      <h3 className="product-heading">Color :</h3>
                      <Color
                        setColor={setColor}
                        colorData={productState?.color}
                      />
                    </div>
                  </>
                )}
                <div className="d-flex align-items-center flex-row gap-15 mb-3 mt-2">
                  {alreadyAdded === false && (
                    <>
                      <h3 className="product-heading">Quantity :</h3>
                      <div className="">
                        <input
                          type="number"
                          name=""
                          className="form-control"
                          min={1}
                          max={10}
                          id=""
                          style={{ width: "70px" }}
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  <div
                    className={
                      alreadyAdded
                        ? "ms-0"
                        : "ms-5" + `d-flex align-items-center gap-30 ms-5`
                    }
                  >
                    <button
                      className="button border-0"
                      type="button"
                      onClick={() => {
                        alreadyAdded
                          ? navigate("/cart")
                          : uploadCart(productState?._id);
                      }}
                    >
                      {alreadyAdded ? "Go to Cart" : "Add to Cart"}
                    </button>
                    <button className="button signup">Buy It Now</button>
                  </div>
                </div>
                <div className="align-items-center gap-15 d-flex">
                  <div>
                    <a href="">
                      <TbGitCompare className="fs-5 me-2" />
                      Add to Compare
                    </a>
                  </div>
                  <a href="">
                    <AiOutlineHeart className="fs-5 me-2" />
                    Add to Wishlist
                  </a>
                </div>
                <div className="d-flex flex-column gap-10 my-3">
                  <h3 className="product-heading">Shipping & Returns :</h3>
                  <p className="product-data">
                    nsakjufhen nvsdvuh fhcsn chfuhnzxm, ncjbfc ehf ieh jhisoH{" "}
                    <br />
                    dkbj fic uuigcb cgywgacv
                    <b> uGDs uaGBC ahiuCBc</b>
                  </p>
                </div>
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3 className="product-heading">Product Link :</h3>
                  <a
                    href="javascript:void(0);"
                    onClick={() => {
                      copyToClipboard(window.location.href);
                    }}
                  >
                    Copy Product Link
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p
                dangerouslySetInnerHTML={{ __html: productState?.description }}
              ></p>
            </div>
          </div>
        </div>
      </Container>
      <Container id="review" className="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3>Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-4">Customer Reviews</h4>
                  <div className="d-flex gap-10 align-items-center">
                    <ReactStars
                      count={5}
                      value="3"
                      edit={false}
                      size={24}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">Based on 2 reviews</p>
                  </div>
                </div>
                {orderedProduct && (
                  <div>
                    <a href="" className="text-dark text-decoration-underline">
                      Write a Review
                    </a>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4>Write a Review</h4>
                <div>
                  <ReactStars
                    count={5}
                    value="3"
                    onChange={(e) => {
                      setStar(e);
                    }}
                    edit={true}
                    size={24}
                    activeColor="#ffd700"
                  />
                </div>
                <div>
                  <textarea
                    type="text"
                    placeholder="comments"
                    name=""
                    id=""
                    cols="30"
                    rows="4"
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                    className="w-100 form-control"
                  />
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <button
                    onClick={addRatingToProduct}
                    type="button"
                    className="button border-0"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
              <div className="reviews mt-4">
                {productState &&
                  productState.ratings?.map((item, index) => {
                    return (
                      <div key={index} className="review">
                        <div className="d-flex align-items-center gap-10">
                          <h6 className="mb-0">Sahitya</h6>
                          <ReactStars
                            count={5}
                            value={item?.star}
                            edit={false}
                            size={24}
                            activeColor="#ffd700"
                          />
                        </div>
                        <p className="mt-3">{item?.comment}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
          <ProductCard data={popularProduct} />
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
