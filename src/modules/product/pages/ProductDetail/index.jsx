import { baseApi } from "@commons/config/index";
import {
  cartAction,
  productAction,
  useAddCartLoading,
  useCartAction,
  useRetrieveProductDetailData,
} from "@commons/redux";
import {
  BackButton,
  Button,
  CartButton,
  Dashboard,
  Spinner,
} from "@components";
import { currencyFormat, Swal } from "commons/utils/index";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";

const ProductDetail = () => {
  const history = useHistory();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const productDetail = useRetrieveProductDetailData();
  const addCartLoading = useAddCartLoading();
  const cartActionState = useCartAction();

  const handleRetrieveProductDetail = useCallback(
    (param) => {
      dispatch(productAction.retrieveProductDetailExecute(param));
    },
    [dispatch]
  );

  const handleAddCart = useCallback(
    (param) => {
      dispatch(cartAction.addCartExecute(param));
    },
    [dispatch]
  );

  useEffect(() => {
    handleRetrieveProductDetail({
      id: id,
    });
  }, [handleRetrieveProductDetail, id]);

  useEffect(() => {
    return () => dispatch(productAction.retrieveProductDetailReset());
  }, [dispatch]);

  useEffect(() => {
    return () => dispatch(cartAction.addCartReset());
  }, [dispatch]);

  const handleUpdateCartSuccess = () => {
    return Swal.fire({
      text: "Success add to Cart",
      icon: "success",
    });
  };

  //#region WATCHER
  useEffect(() => {
    const actions = {
      [cartAction.addCartSuccess.type]: () => {
        if (loading === "buyNow") {
          history.push("/cart");
        }
        if (loading === "addToCart") {
          handleUpdateCartSuccess();
          dispatch(cartAction.retrieveCartListExecute());
        }
        setQuantity(1);
        setLoading("");
      },
      DEFAULT: () => undefined,
    };
    return (actions[cartActionState] || actions.DEFAULT)();
  }, [cartActionState, history, loading, dispatch]);
  //#endregion

  return (
    <Dashboard>
      <div className="overflow-scroll pr-8">
        <BackButton className="" />
        {/* //#region PRODUCTS */}
        {productDetail && (
          <div className="mt-8 flex flex-row">
            <div className="w-96">
              <img
                alt="dummy"
                className="rounded-2xl w-96 h-72 object-cover"
                src={baseApi + "/" + productDetail.image}
              ></img>
              {/* TODO : CREATE GALERY IMAGE */}
              {/* <div className="mt-4 flex flex-row justify-between">
                {Array.from(Array(3).keys()).map((i) => {
                  return (
                    <img
                      alt="dummy"
                      key={i}
                      className="rounded-2xl w-28"
                      src="https://placeimg.com/200/200/any"
                    ></img>
                  );
                })}
              </div> */}
            </div>

            <div className="flex-1 ml-8">
              <div className="font-bold text-4xl text-gray-700">
                {productDetail.name}
              </div>
              <div className="font-bold text-xl text-gray-700 my-4">
                {currencyFormat(productDetail.price)}
              </div>

              <div className="font-bold text-xl text-gray-700">
                <span>Stock: </span>
                <span className="font-normal">{productDetail.stock}</span>
              </div>
              <div className="text-gray-500 my-4">
                {productDetail.description}
              </div>

              <div className="flex flex-row mt-10">
                <CartButton total={quantity} onClick={setQuantity} />
                <Button
                  className="ml-6 mr-0.5"
                  onClick={() => {
                    setLoading("addToCart");
                    handleAddCart({
                      quantity: quantity,
                      product_id: id,
                    });
                  }}
                >
                  {addCartLoading && loading === "addToCart" ? (
                    <Spinner />
                  ) : (
                    "Add to Cart"
                  )}
                </Button>
                <Button
                  onClick={() => {
                    setLoading("buyNow");
                    handleAddCart({
                      quantity: quantity,
                      product_id: id,
                    });
                  }}
                >
                  {addCartLoading && loading === "buyNow" ? (
                    <Spinner />
                  ) : (
                    "Buy Now"
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
        {/* //#endregion */}
      </div>
    </Dashboard>
  );
};

export default ProductDetail;
