import ProductTable from "../components/product-table";
import Loader from "../components/loader.component";
import { useContext } from "react";
import { UserContext } from "../App";

// Create context

const ProductPage = () => {
  const {
    userAuth: { access_token },
  } = useContext(UserContext);

  if (!access_token) {
    return <Loader />;
  }

  return (
    <div className="mt-4 mx-3">
      <ProductTable />
    </div>
  );
};

export default ProductPage;
