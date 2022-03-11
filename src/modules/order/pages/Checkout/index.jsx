import { baseApi } from "@commons/config/index";
import {
  addressAction,
  cartAction,
  useAddressAction,
  useCreateAddressLoading,
  useRetrieveAddressListData,
  useRetrieveCartListSelectedData,
} from "@commons/redux";
import { useOrderAction } from "@commons/redux/order/selector";
import { orderAction } from "@commons/redux/order/slice";
import { BackButton, Button, Dashboard, Spinner, TotalCard } from "@components";
import { yupResolver } from "@hookform/resolvers/yup";
import { currencyFormat, Swal } from "commons/utils/index";
import sumBy from "lodash/sumBy";
import {
  AddressCard,
  AddressSelected,
  CartCard,
} from "modules/order/components/index";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required(),
  address: yup.string().required(),
  phone: yup.string().required(),
  description: yup.string().required(),
});

const Checkout = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalAddressIsOpen, setModalAddressIsOpen] = React.useState(false);
  const [addressSelected, setAddressSelected] = React.useState(0);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const openAddressModal = () => {
    setModalAddressIsOpen(true);
  };
  const closeAddressModal = () => {
    setModalAddressIsOpen(false);
  };

  const cartList = useRetrieveCartListSelectedData();
  const addressList = useRetrieveAddressListData();
  const loading = useCreateAddressLoading();
  const addressActionState = useAddressAction();
  const orderActionState = useOrderAction();

  const handleRetrieveCartList = useCallback(() => {
    dispatch(cartAction.retrieveCartListExecute());
  }, [dispatch]);

  const handleRetrieveAddressList = useCallback(() => {
    dispatch(addressAction.retrieveAddressListExecute());
  }, [dispatch]);

  const handleCreateAddress = useCallback(
    (payload) => dispatch(addressAction.createAddressExecute(payload)),
    [dispatch]
  );

  const handleCheckout = useCallback(
    (payload) => {
      dispatch(
        orderAction.checkoutExecute({
          address_id: payload.address_id,
          coupon_id: payload.coupon_id,
          products: payload.products,
          total: payload.total,
          carts: payload.carts,
        })
      );
    },
    [dispatch]
  );

  const handleCheckoutSuccess = () => {
    return Swal.fire({
      text: "Success checkout",
      icon: "success",
    }).then(() => {
      history.push("/order");
    });
  };

  useEffect(() => {
    handleRetrieveCartList();
    handleRetrieveAddressList();
  }, [handleRetrieveCartList, handleRetrieveAddressList]);

  //#region WATCHER
  useEffect(() => {
    if (addressActionState === addressAction.createAddressSuccess.type) {
      handleRetrieveAddressList();
      closeAddressModal();
    }
  }, [addressActionState, handleRetrieveAddressList]);

  useEffect(() => {
    if (orderActionState === orderAction.checkoutSuccess.type) {
      handleCheckoutSuccess();
    }
  }, [orderActionState, handleCheckoutSuccess]);
  //#endregion

  //#region CLEAR
  useEffect(() => {
    return () => dispatch(orderAction.checkoutReset());
  }, [dispatch]);
  //#endregion

  const totalBarang = sumBy(cartList, (data) => {
    return data.quantity;
  });

  const totalPrice = sumBy(cartList, (data) => {
    return data.product.price * data.quantity;
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <Dashboard>
      <div className="overflow-scroll pr-8">
        <BackButton />

        <div className="flex flex-row justify-between mt-8">
          <div className="flex-1 mr-8">
            <div>
              <div>Alamat Pengiriman</div>
              {addressList.length > 0 && (
                <AddressSelected
                  addressName={addressList[addressSelected].name}
                  phone={addressList[addressSelected].phone}
                  description={addressList[addressSelected].description}
                  address={addressList[addressSelected].address}
                />
              )}

              <Button className="my-4" onClick={openModal}>
                Pilih Alamat Lain
              </Button>
              <hr className="border-4 border-gray-100" />
            </div>

            {/* //#region LIST CART */}
            <div className="mt-8">
              {cartList.map((data, i) => {
                return (
                  <CartCard
                    key={i}
                    onClick={() => {
                      history.push("/product/" + data.id);
                    }}
                    image={baseApi + "/" + data.product.image}
                    productName={data.product.name}
                    price={currencyFormat(data.product.price)}
                    quantity={data.quantity}
                  />
                );
              })}
            </div>
            {/* //#endregion */}
          </div>
          {console.log("cartListcartList", cartList)}
          {/* //#region TOTAL */}
          <div>
            <TotalCard
              // showCoupon
              totalPrice={currencyFormat(totalPrice)}
              totalItem={totalBarang}
              onClick={() =>
                handleCheckout({
                  address_id: addressList[addressSelected].id,
                  coupon_id: 1,
                  products: cartList.map((cart) => ({
                    quantity: cart.quantity,
                    product_id: cart.product.id,
                  })),
                  total: totalPrice,
                  carts: cartList.map((cart) => cart.id),
                })
              }
            />
          </div>
          {/* //#endregion */}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            backgroundColor: "#ffffff",
            width: "50%",
            margin: "0 auto",
            borderRadius: 10,
            padding: 40,
          },
          overlay: {
            backgroundColor: "#0009",
          },
        }}
        contentLabel="Example Modal"
      >
        <div className="font-semibold text-2xl text-center">
          Pilih Alamat Pengiriman
        </div>
        <button
          className="w-full border-gray-300 border border-dashed p-5 rounded-xl font-semibold text-gray-500 mt-8"
          onClick={() => {
            openAddressModal();
            closeModal();
          }}
        >
          Tambah Alamat Baru
        </button>

        <div className="mt-8">
          {addressList.map((data, i) => {
            return (
              <AddressCard
                key={i}
                addressName={data.name}
                description={data.description}
                address={data.address}
                phone={data.phone}
                onClick={() => {
                  closeModal();
                  setAddressSelected(i);
                }}
              />
            );
          })}
        </div>
      </Modal>

      <Modal
        isOpen={modalAddressIsOpen}
        onRequestClose={closeAddressModal}
        style={{
          content: {
            backgroundColor: "#ffffff",
            width: "50%",
            margin: "0 auto",
            borderRadius: 10,
            padding: 40,
          },
          overlay: {
            backgroundColor: "#0009",
          },
        }}
        contentLabel="Example Modal"
      >
        <div className="font-semibold text-2xl text-center">
          Tambah Alamat Baru
        </div>

        <form
          className="flex flex-col mt-8 w-full"
          onSubmit={handleSubmit(handleCreateAddress)}
        >
          <div className="flex flex-row w-full">
            <input
              name="name"
              type="name"
              placeholder="Input name"
              className="flex-1 p-3 rounded-md bg-gray-2 border-none mt-6 mr-2"
              {...register("name")}
            />
            {errors?.name && (
              <div className="text-red-500">{errors?.name?.message}</div>
            )}

            <input
              name="phone"
              type="phone"
              placeholder="Input phone"
              className="flex-1 p-3 rounded-md bg-gray-2 border-none mt-6 ml-2"
              {...register("phone")}
            />
            {errors?.phone && (
              <div className="text-red-500">{errors?.phone?.message}</div>
            )}
          </div>

          <input
            name="address"
            type="text"
            placeholder="Input Address"
            className="p-3 rounded-md bg-gray-2 border-none mt-6"
            {...register("address")}
          />
          {errors?.address && (
            <div className="text-red-500">{errors?.address?.message}</div>
          )}

          <textarea
            name="description"
            type="description"
            placeholder="Input description"
            className="h-40 p-3 rounded-md bg-gray-2 border-none mt-6"
            {...register("description")}
          />
          {errors?.description && (
            <div className="text-red-500">{errors?.description?.message}</div>
          )}

          <Button className="mt-10" onClick={openModal} type="submit">
            {loading ? <Spinner className="mr-4" /> : "Simpan Alamat"}
          </Button>
        </form>
      </Modal>
    </Dashboard>
  );
};

export default Checkout;
