const SubNav = () => {
  return (
    <div className="bg-white max-md:bg-[#F8FAFC] max-md:border-none border-b border-gray-200 h-[70px] w-full flex flex-row justify-between items-center max-[798px]:px-5 max-md:p-0 px-7">
      <div className="flex flex-row gap-5 max-sm:hidden">
        <div className="relative inline-block w-[145px]">
          <select className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-10 text-[13px] font-medium text-gray-500 outline-none w-full">
            <option value="best-sellers">Best sellers</option>
            <option value="all-categories">All Categories</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <i class="fi fi-ts-angle-small-down"></i>
          </div>
        </div>
        <div className="relative inline-block w-[145px]">
          <select className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-10 text-[13px] font-medium text-gray-500 outline-none w-full">
            <option value="best-sellers">Best sellers</option>
            <option value="all-categories">All Categories</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <i class="fi fi-ts-angle-small-down"></i>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center gap-4 max-sm:w-full max-sm:gap-6">
        <button className="flex flex-row gap-2 items-center bg-blue-600 text-white rounded-lg p-3 px-3 cursor-pointer max-sm:w-[65%] max-sm:justify-center ">
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
  );
};

export default SubNav;
