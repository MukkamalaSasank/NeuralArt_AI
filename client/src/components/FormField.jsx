import React from "react";

export default function FormField({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) {
  return (
    <div className="flex flex-col">
      <div className="mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-300"
        >
          {labelName}
        </label>
      </div>
      <div className="relative">
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          required
          className="bg-[#2d2d3a] border border-[#3b3b4a] text-white text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
        />
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-1 px-2 rounded-[5px] mt-3 hover:brightness-110"
          >
            Surprise Me
          </button>
        )}
      </div>
    </div>
  );
}
