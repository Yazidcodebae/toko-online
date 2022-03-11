import React from "react";

const AddressCard = ({ addressName, phone, description, address, onClick }) => {
  return (
    <div className="border text-gray-500 p-4 rounded-xl border-blue-300 my-2 flex flex-row justify-between items-center">
      <div>
        <div className="font-bold text-gray-900">{addressName}</div>
        <div className="text-gray-700">{phone}</div>
        <div>{description}</div>
        <div>{address}</div>
      </div>
      <button
        onClick={onClick}
        className="bg-blue-600 p-2 px-6 rounded-md hover:bg-blue-500 text-white flex items-center justify-center"
      >
        Pilih
      </button>
    </div>
  );
};

export default AddressCard;
