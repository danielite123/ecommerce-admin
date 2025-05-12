import { useContext, useState } from "react";
import {
  ProductInfoModal,
  ProductPricingModal,
  ProductShippingModal,
  ProductSpecificationModal,
} from "../components/product-modal.component";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../App";

const SubNav = () => {
  const {
    userAuth: { access_token },
  } = useContext(UserContext);

  const [modalStep, setModalStep] = useState(null);
  const [productData, setProductData] = useState({
    name: "",
    imageUrls: [],
    category: "",
    brand: "",
    price: "",
    discount: 0,
    colors: [],
    stock: 0,
    specifications: [],
    shippingOptions: [],
    installmentAvailable: false,
  });

  const handleInputChange = (eOrData) => {
    if (eOrData?.target) {
      const { name, value } = eOrData.target;
      setProductData((prev) => ({ ...prev, [name]: value }));
    } else {
      setProductData(eOrData);
    }
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + "/create-product",
        productData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data;

      console.log(result);

      setProductData({
        name: "",
        imageUrls: [],
        category: "",
        brand: "",
        price: "",
        discount: 0,
        colors: [],
        stock: 0,
        specifications: [],
        shippingOptions: [],
        installmentAvailable: false,
      });
      setModalStep(null);
      toast.success("Product created successfully");
    } catch (error) {
      console.error("Request failed:", error);
      const errorMsg =
        error.response?.data?.error ||
        "An error occurred while submitting the product.";
      toast.error(`Failed to create product: ${errorMsg}`);
    }
  };

  return (
    <>
      <div className="bg-white max-md:bg-[#F8FAFC] max-md:border-none border-b border-gray-200 h-[70px] w-full flex flex-row justify-between items-center max-[798px]:px-5 max-md:p-0 px-7">
        <div className="flex flex-row gap-5 max-sm:hidden">
          <div className="relative inline-block w-[145px]">
            <select className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-10 text-[13px] font-medium text-gray-500 outline-none w-full">
              <option value="best-sellers">Best sellers</option>
              <option value="all-categories">All Categories</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <i className="fi fi-ts-angle-small-down"></i>
            </div>
          </div>
          <div className="relative inline-block w-[145px]">
            <select className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-10 text-[13px] font-medium text-gray-500 outline-none w-full">
              <option value="best-sellers">Best sellers</option>
              <option value="all-categories">All Categories</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <i className="fi fi-ts-angle-small-down"></i>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center gap-4 max-sm:w-full max-sm:gap-6">
          <button
            className="flex flex-row gap-2 items-center bg-blue-600 text-white rounded-lg p-3 px-3 cursor-pointer max-sm:w-[65%] max-sm:justify-center"
            onClick={() => setModalStep(1)}
          >
            <i className="fi fi-sr-plus text-xs"></i>
            <p className="text-xs font-inter font-semibold">New Product</p>
          </button>

          <div className="flex flex-row gap-5 max-sm:gap-6 items-center max-sm:w-[35%] max-sm:justify-center">
            <button className="max-sm:flex max-sm:justify-center max-md:bg-white max-md:rounded-lg max-md:px-3 max-md:py-[9px]">
              <i className="fi fi-rr-list text-[18px] text-gray-500"></i>
            </button>

            <button className="max-sm:flex max-sm:justify-center max-md:bg-white max-md:rounded-lg max-md:px-3 max-md:py-[9px]">
              <i className="fi fi-rr-apps text-[16px] text-gray-500"></i>
            </button>
          </div>
        </div>
      </div>
      {modalStep === 1 && (
        <ProductInfoModal
          data={productData}
          onChange={handleInputChange}
          onNext={() => setModalStep(2)}
          onClose={() => setModalStep(null)}
        />
      )}

      {modalStep === 2 && (
        <ProductSpecificationModal
          data={productData}
          onChange={handleInputChange}
          onNext={() => setModalStep(3)}
          onBack={() => setModalStep(1)}
          onClose={() => setModalStep(null)}
        />
      )}

      {modalStep === 3 && (
        <ProductPricingModal
          data={productData}
          onChange={handleInputChange}
          onNext={() => setModalStep(4)}
          onBack={() => setModalStep(2)}
          onClose={() => setModalStep(null)}
        />
      )}

      {modalStep === 4 && (
        <ProductShippingModal
          data={productData}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          onBack={() => setModalStep(3)}
          onClose={() => setModalStep(null)}
        />
      )}
    </>
  );
};

export default SubNav;
