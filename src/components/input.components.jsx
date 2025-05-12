import { useState } from "react";

export const InputBox = ({
  name,
  type,
  id,
  value,
  placeholder,
  icon,
  disable,
  error,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div className="relative w-[100%] mb-4">
      <div className="relative">
        <input
          name={name}
          type={
            type == "password" ? (passwordVisible ? "text" : "password") : type
          }
          placeholder={placeholder}
          defaultValue={value}
          id={id}
          disabled={disable}
          className={`input-box font-inter ${error ? "border-red-500" : ""}`}
        />
        {icon && <i className={"fi " + icon + " input-icon"}></i>}
      </div>

      {type == "password" ? (
        <i
          className={
            "fi fi-rr-eye" +
            (!passwordVisible ? "-crossed" : "") +
            " input-icon left-[auto] right-4 cursor-pointer"
          }
          onClick={() => setPasswordVisible((currentVal) => !currentVal)}
        ></i>
      ) : (
        ""
      )}

      {error && (
        <div className="flex flex-row ml-1 gap-2 mt-1 -mb-3">
          <i className="fi fi-rr-exclamation text-red-500 text-[11px]"></i>
          <p className="text-red-500 text-xs">{error}</p>
        </div>
      )}
    </div>
  );
};

export const SearchInputBox = ({
  name,
  type,
  id,
  value,
  placeholder,
  icon,
  disable,
}) => {
  return (
    <div className="relative w-[100%] mb-4 mt-1">
      <div className="relative">
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          defaultValue={value}
          id={id}
          disabled={disable}
          className="search-input-box font-inter"
        />
        {icon && <i className={"fi " + icon + " search-input-icon"}></i>}
      </div>
    </div>
  );
};

export const ProductInputBox = ({
  name,
  type,
  id,
  value,
  onChange,
  placeholder,
  disable,
  error,
}) => {
  return (
    <div className="relative w-[100%] mb-4">
      <div className="relative">
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          id={id}
          disabled={disable}
          className={`product-input-box font-inter ${
            error ? "border-red-500" : ""
          }`}
        />
      </div>

      {error && (
        <div className="flex flex-row ml-1 gap-2 mt-1 -mb-3">
          <i className="fi fi-rr-exclamation text-red-500 text-[11px]"></i>
          <p className="text-red-500 text-xs">{error}</p>
        </div>
      )}
    </div>
  );
};
