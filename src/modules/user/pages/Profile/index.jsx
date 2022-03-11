import { baseApi } from "@commons/config/index";
import {
  userAction,
  useRetrieveProfileData,
  useUpdatePasswordLoading,
  useUpdateProfileLoading,
  useUpdateProfilePictureLoading,
  useUserAction,
} from "@commons/redux";
import { Button, Dashboard, SideBar, Spinner } from "@components";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import * as yup from "yup";

const updatePofileSchema = yup.object().shape({
  name: yup.string().required(),
  phone: yup.string().required(),
});

const updatePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required(),
  newPassword: yup.string().required(),
});

const Profile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userActionState = useUserAction();
  const profileData = useRetrieveProfileData();
  const updateProfileLoading = useUpdateProfileLoading();
  const updateProfilePictureLoading = useUpdateProfilePictureLoading();
  const updatePasswordLoading = useUpdatePasswordLoading();
  const [foto, setFoto] = useState();

  const {
    register: updatePofileRegister,
    handleSubmit: updatePofileHandleSubmit,
    formState: { errors: updatePofileErrors },
  } = useForm({
    resolver: yupResolver(updatePofileSchema),
  });

  const {
    register: updatePasswordRegister,
    handleSubmit: updatePasswordHandleSubmit,
    formState: { errors: updatePasswordErrors },
  } = useForm({
    resolver: yupResolver(updatePasswordSchema),
  });

  const handleRetrieveProfile = useCallback(() => {
    dispatch(userAction.retrieveProfileExecute());
  }, [dispatch]);

  useEffect(() => {
    handleRetrieveProfile();
  }, [handleRetrieveProfile]);

  const handleUpdateProfile = useCallback(
    (payload) => dispatch(userAction.updateProfileExecute(payload)),
    [dispatch]
  );

  const handleUpdateProfilePicture = useCallback(
    (id, profilePicture) =>
      dispatch(userAction.updateProfilePictureExecute({ id, profilePicture })),
    [dispatch]
  );

  const handleUpdatePassword = useCallback(
    (payload) => dispatch(userAction.updatePasswordExecute(payload)),
    [dispatch]
  );

  //#region WATCHER
  useEffect(() => {
    if (userActionState === userAction.updateProfileSuccess.type) {
      alert("sukses");
    }
    if (userActionState === userAction.updateProfilePictureSuccess.type) {
      window.location.reload();
    }
  }, [userActionState, history]);

  useEffect(() => {
    if (foto && profileData) {
      handleUpdateProfilePicture(profileData.id, foto);
      setFoto(undefined);
    }
  }, [foto, profileData, handleUpdateProfilePicture]);

  //#endregion

  return (
    <Dashboard>
      {profileData && (
        <div className="flex flex-row py-4">
          <div>
            <SideBar />
          </div>
          <div className="flex-1">
            <div className="flex flex-row rounded-md shadow bg-white p-4">
              <div className="w-64">
                <img
                  src={baseApi + "/" + profileData.profilePicture}
                  alt=""
                  className="w-64 h-64 rounded object-cover mb-2"
                />

                <div class="flex w-full items-center justify-center bg-grey-lighter">
                  <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer">
                    {updateProfilePictureLoading ? (
                      <Spinner className="" />
                    ) : (
                      <>
                        <svg
                          class="w-8 h-8"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                        </svg>
                        <span class="mt-2 text-base leading-normal">
                          Select a file
                        </span>
                      </>
                    )}

                    <input
                      type="file"
                      class="hidden"
                      onChange={(e) => setFoto(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>
              <form
                className="flex flex-col w-full ml-8"
                onSubmit={updatePofileHandleSubmit(handleUpdateProfile)}
              >
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-gray-500">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Input Email"
                    className="p-3 rounded-md bg-gray-2 border-none"
                    defaultValue={profileData.email}
                    {...updatePofileRegister("email")}
                    readOnly
                  />
                  {updatePofileErrors?.email && (
                    <div className="text-red-500">
                      {updatePofileErrors?.email?.message}
                    </div>
                  )}
                </div>

                <div className="flex flex-col mt-6">
                  <label htmlFor="name" className="text-gray-500">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="name"
                    placeholder="Input name"
                    className="p-3 rounded-md bg-gray-2 border-none"
                    defaultValue={profileData.name}
                    {...updatePofileRegister("name")}
                  />
                  {updatePofileErrors?.name && (
                    <div className="text-red-500">
                      {updatePofileErrors?.name?.message}
                    </div>
                  )}
                </div>

                <div className="flex flex-col mt-6">
                  <label htmlFor="phone" className="text-gray-500">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="phone"
                    placeholder="Input phone"
                    className="p-3 rounded-md bg-gray-2 border-none"
                    {...updatePofileRegister("phone")}
                    defaultValue={profileData.phone}
                  />
                  {updatePofileErrors?.phone && (
                    <div className="text-red-500">
                      {updatePofileErrors?.phone?.message}
                    </div>
                  )}
                </div>

                <Button className="mt-10" type="submit">
                  {updateProfileLoading ? (
                    <Spinner className="mr-4" />
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </form>
            </div>

            <form
              className="flex flex-col rounded-md shadow bg-white p-4 mt-4"
              onSubmit={updatePasswordHandleSubmit(handleUpdatePassword)}
            >
              <div className="flex flex-col mt-6">
                <label htmlFor="oldPassword" className="text-gray-500">
                  Old Password
                </label>
                <input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  placeholder="Input Old Password"
                  className="p-3 rounded-md bg-gray-2 border-none"
                  {...updatePasswordRegister("oldPassword")}
                />
                {updatePasswordErrors?.oldPassword && (
                  <div className="text-red-500">
                    {updatePasswordErrors?.oldPassword?.message}
                  </div>
                )}
              </div>

              <div className="flex flex-col mt-6">
                <label htmlFor="newPassword" className="text-gray-500">
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="Input New Password"
                  className="p-3 rounded-md bg-gray-2 border-none"
                  {...updatePasswordRegister("newPassword")}
                />
                {updatePasswordErrors?.newPassword && (
                  <div className="text-red-500">
                    {updatePasswordErrors?.newPassword?.message}
                  </div>
                )}
              </div>

              <Button className="mt-10" type="submit">
                {updatePasswordLoading ? (
                  <Spinner className="mr-4" />
                ) : (
                  "Update Password"
                )}
              </Button>
            </form>
          </div>
        </div>
      )}
    </Dashboard>
  );
};

export default Profile;
