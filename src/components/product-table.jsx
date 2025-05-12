import React, { useState } from "react";

const initialProducts = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dxeijafy8/image/upload/v1746987250/uploads/dqd0zdgnlwpz4eaakcla.png",
    name: "Watch Nike Series 7",
    brand: "Apple",
    stock: 100,
    sales: 1234,
    price: "$399.00",
    status: true,
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dxeijafy8/image/upload/v1746987250/uploads/dqd0zdgnlwpz4eaakcla.png",
    name: "iPhone 13 Pro",
    brand: "Apple",
    stock: 2,
    sales: 500,
    price: "$2,899.00",
    status: true,
  },
];

const ProductTable = () => {
  const [products, setProducts] = useState(initialProducts);

  const handleToggle = (id) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, status: !product.status } : product
      )
    );
  };

  return (
    <div className="overflow-x-auto bg-white rounded-md p-5">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-blue-50 text-gray-600 font-semibold">
          <tr>
            <th className="p-2 w-[40px]">
              <div className="flex items-center justify-center">
                <label className="custom-checkbox inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="appearance-none" />
                  <div className="w-4 h-4 border border-gray-300 rounded-sm flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white hidden"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </label>
              </div>
            </th>
            <th className="p-2 min-w-[180px] whitespace-nowrap">
              Product name
            </th>
            <th className="p-2 min-w-[100px] whitespace-nowrap">Brand</th>
            <th className="p-2 min-w-[80px] whitespace-nowrap">Stock</th>
            <th className="p-2 min-w-[80px] whitespace-nowrap">Sales</th>
            <th className="p-2 min-w-[100px] whitespace-nowrap">Price</th>
            <th className="p-2 w-[100px] whitespace-nowrap">Status</th>
            <th className="p-2 w-[40px]">
              <i className="fi fi-bs-menu-dots" />
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b hover:bg-gray-50 transition duration-150"
            >
              <td className="p-2">
                <div className="flex items-center justify-center">
                  <label className="custom-checkbox inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="appearance-none" />
                    <div className="w-4 h-4 border border-gray-300 rounded-sm flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white hidden"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </label>
                </div>
              </td>
              <td className="p-2 flex items-center gap-2 whitespace-nowrap">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-6 h-6"
                />
                {product.name}
              </td>
              <td className="p-2 whitespace-nowrap">{product.brand}</td>
              <td
                className={`p-2 whitespace-nowrap ${
                  product.stock <= 10 ? "text-red-500" : ""
                }`}
              >
                {product.stock}
              </td>
              <td className="p-2 whitespace-nowrap">
                {product.sales.toLocaleString()}
              </td>
              <td className="p-2 whitespace-nowrap">{product.price}</td>
              <td className="p-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={product.status}
                    onChange={() => handleToggle(product.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-checked:bg-blue-500 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-500 transition-all duration-200" />
                  <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-all duration-200 peer-checked:translate-x-full" />
                </label>
              </td>
              <td className="p-2 w-[40px] text-right">
                <i className="fi fi-bs-menu-dots" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
