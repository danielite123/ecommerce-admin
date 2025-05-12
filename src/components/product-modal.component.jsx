import { useState } from "react";
import { ProductInputBox } from "./input.components";
import { uploadImages } from "../common/upload";
import { CirclePicker } from "react-color";
import { toast } from "react-hot-toast";

export const ProductInfoModal = ({ data, onChange, onNext, onClose }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);

    const tempPreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      uploading: true,
    }));
    setSelectedImages(tempPreviews);

    setUploading(true);
    const toastId = toast.loading("Uploading images...");

    try {
      const cloudinaryUrls = await uploadImages(files);
      onChange({
        target: {
          name: "imageUrls",
          value: cloudinaryUrls,
        },
      });

      const uploadedImages = cloudinaryUrls.map((url, index) => ({
        file: files[index],
        url,
        uploading: false,
      }));

      setSelectedImages(uploadedImages);
      toast.success("Images uploaded successfully!", { id: toastId });
    } catch {
      toast.error("Failed to upload images. Please try again.", {
        id: toastId,
      });
    }
    setUploading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 max-sm:px-6 overflow-auto">
      <div className="bg-white rounded-lg shadow-xl w-[500px] max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold font-inter">
              Product Information
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 bg-gray-100 rounded-lg p-1 px-2 flex items-center"
            >
              <i className="fi fi-rr-cross-small text-[16px]"></i>
            </button>
          </div>
          <hr className="text-gray-200 -mx-6" />

          <div className="flex flex-col mt-4">
            <div>
              <h1 className="font-inter font-semibold text-[16px]">
                Product image
              </h1>
            </div>
            <p className="text-gray-400 text-[12px]">
              Image format .jpg .jpeg .png and minimum size 300 x 300px
            </p>

            <div className="flex gap-3 flex-wrap mt-4">
              {selectedImages.map((img, index) => (
                <div
                  key={index}
                  className="relative w-[120px] h-[120px] bg-blue-100 rounded-xl flex items-center justify-center"
                >
                  <img
                    src={img.url}
                    alt={`Uploaded preview ${index}`}
                    className="w-[65px] h-[65px] object-contain rounded-lg"
                  />
                  {index === 0 && (
                    <div className="absolute bottom-1 right-1 bg-white text-blue-500 text-[10px] font-semibold px-2 py-1 font-inter rounded">
                      Cover Image
                    </div>
                  )}
                </div>
              ))}

              <label htmlFor="images">
                <div className="relative aspect-video w-[120px] h-[120px] bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer">
                  <div className="flex flex-col justify-center items-center h-full">
                    <svg
                      width="33"
                      height="32"
                      viewBox="0 0 33 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.83327 24C8.16964 24 6.57415 23.3678 5.39779 22.2426C4.22142 21.1174 3.56055 19.5913 3.56055 18C3.56055 16.4087 4.22142 14.8826 5.39779 13.7573C6.57415 12.6321 8.16964 12 9.83327 12C10.2262 10.2495 11.3756 8.71129 13.0287 7.72359C13.8473 7.23454 14.7648 6.89537 15.729 6.72546C16.6931 6.55555 17.6851 6.55821 18.6481 6.73331C19.6111 6.90841 20.5264 7.2525 21.3417 7.74595C22.1569 8.2394 22.8562 8.87253 23.3996 9.60921C23.943 10.3459 24.3199 11.1717 24.5087 12.0394C24.6975 12.9072 24.6945 13.7999 24.4999 14.6666H25.8333C27.071 14.6666 28.2579 15.1583 29.1331 16.0335C30.0083 16.9086 30.4999 18.0956 30.4999 19.3333C30.4999 20.571 30.0083 21.758 29.1331 22.6331C28.2579 23.5083 27.071 24 25.8333 24H24.4999"
                        stroke="#2563EB"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.5 20L16.5 16L20.5 20"
                        stroke="#2563EB"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.5 16V28"
                        stroke="#2563EB"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <p className="text-[12px] mt-2 font-semibold text-blue-600">
                      New Image
                    </p>
                  </div>
                  <input
                    id="images"
                    type="file"
                    multiple
                    accept=".png, .jpg, .jpeg"
                    hidden
                    onChange={handleImageChange}
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="flex flex-col mt-3">
            <div>
              <h1 className="font-inter font-semibold text-[16px]">
                Product name
              </h1>
            </div>
            <p className="text-gray-400 text-[12px] pb-3">
              Include min. 40 characters to make it more interesting
            </p>

            <ProductInputBox
              name="name"
              type="text"
              placeholder="Product name"
              value={data.name}
              onChange={onChange}
            />
          </div>

          <div className="flex flex-row mt-1 w-full gap-4 mb-6">
            <div className="flex flex-col w-[50%]">
              <h1 className="font-inter font-semibold text-[16px]">Brand</h1>
              <div className="relative inline-block w-full">
                <select
                  name="brand"
                  className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 text-[13px] font-medium text-gray-500 outline-none w-full"
                  value={data.brand}
                  onChange={onChange}
                >
                  <option value="">Select brand</option>
                  <option value="apple">Apple</option>
                  <option value="tecno">Tecno</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <i className="fi fi-ts-angle-small-down"></i>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-[50%]">
              <h1 className="font-inter font-semibold text-[16px]">
                Categories
              </h1>
              <div className="relative inline-block w-full">
                <select
                  name="category"
                  className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 text-[13px] font-medium text-gray-500 outline-none w-full"
                  value={data.category}
                  onChange={onChange}
                >
                  <option value="">Select category</option>
                  <option value="phones">Phones</option>
                  <option value="laptops">Laptops</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <i className="fi fi-ts-angle-small-down"></i>
                </div>
              </div>
            </div>
          </div>

          <hr className="text-gray-200 -mx-6" />

          <div className="flex justify-center items-center pt-4 w-full gap-4">
            <button
              type="button"
              onClick={onClose}
              className="w-[50%] px-4 py-3 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={uploading}
              className="w-[50%] px-4 py-3 text-sm font-medium rounded-xl bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductSpecificationModal = ({
  data,
  onChange,
  onNext,
  onBack,
  onClose,
}) => {
  const [specifications, setSpecifications] = useState(
    data.specifications?.length >= 2
      ? data.specifications
      : [
          { title: "", attributes: [{ key: "", value: "" }] },
          { title: "", attributes: [{ key: "", value: "" }] },
        ]
  );

  const handleSpecChange = (index, field, value) => {
    const updated = [...specifications];
    updated[index][field] = value;
    updateSpecifications(updated);
  };

  const handleAttrChange = (specIndex, attrIndex, field, value) => {
    const updated = [...specifications];
    updated[specIndex].attributes[attrIndex][field] = value;
    updateSpecifications(updated);
  };

  const addSpecification = () => {
    updateSpecifications([
      ...specifications,
      { title: "", attributes: [{ key: "", value: "" }] },
    ]);
  };

  const removeSpecification = (index) => {
    const updated = specifications.filter((_, i) => i !== index);
    updateSpecifications(updated);
  };

  const addAttribute = (specIndex) => {
    const updated = [...specifications];
    updated[specIndex].attributes.push({ key: "", value: "" });
    updateSpecifications(updated);
  };

  const removeAttribute = (specIndex, attrIndex) => {
    const updated = [...specifications];
    updated[specIndex].attributes = updated[specIndex].attributes.filter(
      (_, i) => i !== attrIndex
    );
    updateSpecifications(updated);
  };

  const updateSpecifications = (updated) => {
    setSpecifications(updated);
    onChange({ ...data, specifications: updated });
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-[500px] max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold font-inter">
              Product Specifications
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 bg-gray-100 rounded-lg p-1 px-2 flex items-center"
            >
              <i className="fi fi-rr-cross-small text-[16px]"></i>
            </button>
          </div>

          <hr className="text-gray-300 -mx-6" />

          {specifications.map((spec, specIndex) => (
            <div
              key={specIndex}
              className="mb-6 border border-gray-300 p-4 rounded-lg mt-4"
            >
              <div className="flex justify-between items-center mb-2">
                <input
                  type="text"
                  placeholder="Specification Title"
                  value={spec.title}
                  onChange={(e) =>
                    handleSpecChange(specIndex, "title", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
                <button
                  onClick={() => removeSpecification(specIndex)}
                  className="ml-2 text-sm mt-1.5"
                >
                  <i className="fi fi-rr-cross-circle text-[16px] text-gray-400"></i>
                </button>
              </div>

              <div className="space-y-2">
                {spec.attributes.map((attr, attrIndex) => (
                  <div key={attrIndex} className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Key"
                      value={attr.key}
                      onChange={(e) =>
                        handleAttrChange(
                          specIndex,
                          attrIndex,
                          "key",
                          e.target.value
                        )
                      }
                      className="p-2 border border-gray-300 rounded text-sm"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Value"
                        value={attr.value}
                        onChange={(e) =>
                          handleAttrChange(
                            specIndex,
                            attrIndex,
                            "value",
                            e.target.value
                          )
                        }
                        className="p-2 border border-gray-300 rounded text-sm w-full"
                      />
                      <button
                        type="button"
                        onClick={() => removeAttribute(specIndex, attrIndex)}
                        className="text-xs mt-1.5"
                      >
                        <i className="fi fi-rr-cross-circle text-[16px] text-gray-400"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => addAttribute(specIndex)}
                className="mt-2 text-blue-600 text-sm flex flex-row items-center gap-2"
              >
                <i className="fi fi-rr-add"></i>
                <p>Add Attribute</p>
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addSpecification}
            className="text-blue-700 font-medium mb-4 flex flex-row items-center gap-2"
          >
            <i className="fi fi-rr-add"></i>
            <p>Add Specification</p>
          </button>

          <hr className="text-gray-300 -mx-6" />

          <div className="flex justify-center items-center pt-4 w-full gap-4">
            <button
              type="button"
              onClick={onBack}
              className="w-[50%] px-4 py-3 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={onNext}
              className="w-[50%] px-4 py-3 bg-blue-600 text-white text-sm font-medium rounded-xl"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductPricingModal = ({
  data,
  onChange,
  onNext,
  onBack,
  onClose,
}) => {
  const colorNameMap = {
    "#f44336": "Red",
    "#e91e63": "Pink",
    "#9c27b0": "Purple",
    "#673ab7": "Deep Purple",
    "#3f51b5": "Indigo",
    "#2196f3": "Blue",
    "#03a9f4": "Light Blue",
    "#00bcd4": "Cyan",
    "#009688": "Teal",
    "#4caf50": "Green",
    "#8bc34a": "Light Green",
    "#cddc39": "Lime",
    "#ffeb3b": "Yellow",
    "#ffc107": "Amber",
    "#ff9800": "Orange",
    "#ff5722": "Deep Orange",
    "#795548": "Brown",
    "#607d8b": "Blue Gray",
    "#000000": "Black",
    "#ffffff": "White",
  };

  const colors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#607d8b",
    "#000000",
    "#ffffff",
  ];

  const handleColorChange = (color) => {
    const currentColors = Array.isArray(data.colors) ? [...data.colors] : [];
    const colorHex = color.hex;

    let updatedColors;
    if (currentColors.includes(colorHex)) {
      updatedColors = currentColors.filter((c) => c !== colorHex);
    } else {
      updatedColors = [...currentColors, colorHex];
    }
    onChange({ ...data, colors: updatedColors });
  };
  const isColorSelected = (color) => {
    return Array.isArray(data.colors) && data.colors.includes(color);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-[500px] max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Pricing Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fi fi-rr-cross-small text-xl"></i>
            </button>
          </div>

          <hr className="text-gray-300 -mx-6" />

          <div className="mb-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium font-inter mb-1">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={data.price}
                  onChange={onChange}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium font-inter mb-1">
                  Discount
                </label>
                <input
                  type="number"
                  name="discount"
                  value={data.discount}
                  onChange={onChange}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Product Color</h3>
            <div className="w-full">
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <div
                    key={color}
                    onClick={() => handleColorChange({ hex: color })}
                    className="w-8 h-8 rounded-full cursor-pointer relative"
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      backgroundColor: color,
                      border: "2px solid #ccc",
                      margin: 3,
                      cursor: "pointer",
                    }}
                  >
                    {isColorSelected(color) && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <i
                          className="fi fi-sr-check text-xs text-white mt-1"
                          style={{
                            textShadow: "0 0 2px rgba(0,0,0,0.5)",
                            fontSize: "14px",
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <span className="mt-2 text-xs text-gray-600">
                Selected:{" "}
                {Array.isArray(data.colors) && data.colors.length > 0 ? (
                  data.colors.map((color, index) => (
                    <span key={color} style={{ color }}>
                      {colorNameMap[color] || color}
                      {index < data.colors.length - 1 ? ", " : ""}
                    </span>
                  ))
                ) : (
                  <span>No colors selected</span>
                )}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium font-inter mb-1 flex items-center gap-1">
              Stock Quantity
              <span className="relative group cursor-pointer">
                <i className="fi fi-rr-info text-xs text-gray-500" />
                <div className="absolute z-10 hidden group-hover:block w-max max-w-[200px] text-xs text-blue-400 bg-white border border-gray-200 p-2 rounded shadow-lg top-full mt-1 left-1/2 -translate-x-1/2">
                  Number of units available for sale. Set to 0 to mark as out of
                  stock.
                </div>
              </span>
            </label>

            <div className="relative">
              <input
                type="number"
                name="stock"
                value={data.stock || ""}
                onChange={onChange}
                min="0"
                className={`w-full p-2 pl-10 border text-sm rounded transition-all outline-none duration-200 ${
                  data.stock === 0
                    ? "border-red-400 bg-red-50 focus:border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
                placeholder="Enter stock quantity"
              />
              <div className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-sm">
                <i className="fi fi-rr-box" />
              </div>
            </div>

            {data.stock === 0 && (
              <p className="text-xs text-red-600 mt-1">
                ⚠ This product is out of stock
              </p>
            )}
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Installment Plan
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={!!data.installmentAvailable}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      installmentAvailable: e.target.checked,
                    })
                  }
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
              </label>
            </div>

            <p className="text-xs text-gray-500 mt-1">
              Enable a 3-part installment payment plan for this product.
            </p>

            {data.installmentAvailable && data.price && (
              <div className="mt-3 bg-blue-50 text-blue-800 p-3 rounded-lg text-sm border border-blue-200">
                <strong>Installment Plan:</strong>
                <br />3 payments of $
                {(
                  Math.round(
                    ((data.price * (1 - (data.discount || 0) / 100)) / 3) * 100
                  ) / 100
                ).toFixed(2)}{" "}
                each
              </div>
            )}
          </div>

          <hr className="text-gray-300 -mx-6" />

          <div className="flex justify-center items-center pt-4 w-full gap-4">
            <button
              type="button"
              onClick={onBack}
              className="w-[50%] px-4 py-3 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={onNext}
              className="w-[50%] px-4 py-3 bg-blue-600 text-white text-sm font-medium rounded-xl"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductShippingModal = ({
  data,
  onChange,
  onSubmit,
  onBack,
  onClose,
}) => {
  const [shippingOptions, setShippingOptions] = useState(() => {
    if (data.shippingOptions && data.shippingOptions.length > 0) {
      return data.shippingOptions;
    }
    return [
      { method: "Standard", cost: "", estimatedTime: "" },
      { method: "Express", cost: "", estimatedTime: "" },
    ];
  });

  const handleOptionChange = (index, field, value) => {
    const updated = [...shippingOptions];
    updated[index][field] = value;
    setShippingOptions(updated);
    onChange({ ...data, shippingOptions: updated });
  };

  const handleAddOption = () => {
    const newOption = { method: "", cost: "", estimatedTime: "" };
    const updated = [...shippingOptions, newOption];
    setShippingOptions(updated);
    onChange({ ...data, shippingOptions: updated });
  };

  const handleRemoveOption = (index) => {
    const updated = shippingOptions.filter((_, i) => i !== index);
    setShippingOptions(updated);
    onChange({ ...data, shippingOptions: updated });
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-[500px] max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Shipping Options
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fi fi-rr-cross-small text-xl" />
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Add one or more shipping methods with cost and estimated delivery
            time.
          </p>

          <div className="space-y-6">
            {shippingOptions.map((option, index) => (
              <div
                key={index}
                className="border border-gray-200 p-4 rounded-lg shadow-sm relative"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Method
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Express"
                      value={option.method}
                      onChange={(e) =>
                        handleOptionChange(index, "method", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded p-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Cost ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={option.cost}
                      onChange={(e) =>
                        handleOptionChange(index, "cost", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded p-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Estimated Time
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2-4 business days"
                      value={option.estimatedTime}
                      onChange={(e) =>
                        handleOptionChange(
                          index,
                          "estimatedTime",
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 rounded p-2 text-sm"
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveOption(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  title="Remove shipping method"
                >
                  <i className="fi fi-rr-trash" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={handleAddOption}
              className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
            >
              + Add Shipping Option
            </button>
          </div>

          <hr className="my-6 text-gray-300" />

          <div className="flex justify-between items-center">
            <button
              onClick={onBack}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100"
            >
              Back
            </button>
            <button
              onClick={onSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
