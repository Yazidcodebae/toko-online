import React from "react";

const AddressSelected = ({ addressName, phone, description, address }) => {
  return (
    <div className="border border-l-0 border-r-0 py-4 text-gray-500">
      <div className="font-bold text-gray-900">{addressName}</div>
      <div className="text-gray-700">{phone}</div>
      <div>{description}</div>
      <div>{address}</div>
    </div>
  );
};

export default AddressSelected;
