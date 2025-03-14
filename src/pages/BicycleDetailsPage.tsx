import { Button } from "@/components/ui/button";
import { useGetSpecificProductQuery } from "@/redux/api/productApi";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import {  useState } from "react";
import {  Link, useLocation, useNavigate} from "react-router-dom";



const BicycleDetailsPage = () => {

  const user = useAppSelector(useCurrentUser)
  const navigate = useNavigate()

  const location = useLocation();



  const cycleId = location.pathname.split("/")[2];

  const {data, isLoading,error} = useGetSpecificProductQuery(cycleId);

  const bicycle = data?.data;


  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    if (quantity < bicycle?.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrease = () => quantity > 1 && setQuantity(quantity - 1);




  if (isLoading) {
    return (
      <div className="max-w-sm my-20 mx-auto p-6 bg-white shadow-lg rounded-lg">
        <p className="text-center text-gray-500 font-semibold">Loading ...</p>
      </div>
    );
  }

  if (error || !bicycle) {
    return (
      <div className="max-w-sm my-20 mx-auto p-6 bg-white shadow-lg rounded-lg">
        <p className="text-center text-red-500 font-semibold">Failed to load bicycle details.</p>
      </div>
    );
  }

  const handleOrder = () => {
  
    const orderInfo = {
      user,
      product:bicycle,
      quantity,
      totalPrice:quantity * bicycle.price
    }
    navigate(`/user/create-order`, {state:orderInfo});
  }


  return (
    <div className="max-w-4xl my-20 mx-auto p-6 bg-white shadow-lg rounded-lg">
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <img
        src={bicycle?.image}
        alt={bicycle?.name}
        className="w-full rounded-lg shadow-md"
      />
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2 my-3">
            {bicycle?.name}
          </h2>
          <p className="text-gray-600 text-lg my-3">
            Brand: <span className="font-semibold">{bicycle?.brand}</span>
          </p>
          <p className="text-gray-600 text-lg my-3">
            Type: <span className="font-semibold">{bicycle?.type}</span>
          </p>
          <p className="text-gray-600 text-lg my-3">
            Quantity:
            <span className="font-semibold">{bicycle?.quantity}</span>
          </p>

          <p className="text-2xl font-semibold text-green-600 mt-4">
            ${bicycle?.price}
          </p>
        </div>

        <div className="my-4">
          <div className="">
            <div className="flex items-center space-x-4 my-2">
              <button onClick={decrease} className="px-4 py-2 border rounded">
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={increase}
                className={`px-4 py-2 border rounded`}
              >
                +
              </button>
            </div>
            <h3 className="text-lg my-4 font-semibold">Total Price: ${bicycle?.price * quantity}</h3>
          </div>
          <div className="my-2">
            {(bicycle?.inStock && user?.id)  && (
             
           <button onClick={() => handleOrder() } className=" bg-green-600 hover:bg-green-700 text-white px-1 rounded-md font-semibold text-lg py-2">
            Checkout Order
          </button>
          
            ) }
            {!bicycle?.inStock &&
              <Button
              className=" bg-red-500 hover:bg-red-600 text-white text-lg py-2"
              disabled
            >
              Out of Stock
            </Button>
            }

            {(bicycle?.inStock && !user?.id) &&
              <Link to="/login"><Button
              className=" bg-green-600 hover:bg-green-700 text-white text-lg py-2"
            >
              Login to Add to Cart
            </Button></Link>
            }
          </div>
        </div>

        <div className="mt-4"></div>
      </div>
    </div> 
     
    </div>
  );
};

export default BicycleDetailsPage;
