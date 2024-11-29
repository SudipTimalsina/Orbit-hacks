import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import KhaltiCheckout from "khalti-checkout-web";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { price, bookingDetails } = location.state || {};

  useEffect(() => {
    if (!price || !bookingDetails) {
      navigate("/"); // Redirect back if no price or booking details exist
    }
  }, [price, bookingDetails, navigate]);

  const khaltiConfig = {
    publicKey: "4e5f6499f606498abd273218be72ec05", // Replace with your actual public key
    productIdentity: bookingDetails?.licensePlate || "UNKNOWN",
    productName: `Parking Spot for ${bookingDetails?.vehicleType || "Unknown"}`,
    productUrl: "http://localhost:3000", // Replace with your app's URL
    eventHandler: {
      onSuccess(payload) {
        console.log("Payment successful:", payload);
        navigate("/success", { state: { bookingDetails, price } });
      },
      onError(error) {
        console.log("Payment failed:", error);
      },
      onClose() {
        console.log("Payment widget closed");
      },
    },
    paymentPreference: ["KHALTI"],
  };

  const handlePayment = () => {
    const checkout = new KhaltiCheckout(khaltiConfig);
    checkout.show({ amount: price * 100 }); // Amount in paisa (NPR 1 = 100 paisa)
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg shadow-md border border-blue-200">
      <h2 className="text-2xl font-semibold text-indigo-700 text-center mb-4">
        Payment for Your Parking Booking
      </h2>

      <div className="bg-blue-50 p-4 rounded-md border border-blue-300 shadow-sm mb-4">
        <h3 className="text-md font-medium text-blue-700">Booking Details</h3>
        <p className="text-sm text-blue-600">
          Vehicle Type: <strong>{bookingDetails?.vehicleType}</strong>
        </p>
        <p className="text-sm text-blue-600">
          License Plate: <strong>{bookingDetails?.licensePlate}</strong>
        </p>
        <p className="text-sm text-blue-600">
          Booking Time: <strong>{bookingDetails?.time}</strong>
        </p>
        <p className="text-sm text-blue-600">
          Parking Duration:{" "}
          <strong>
            {bookingDetails?.hours} hours {bookingDetails?.minutes} minutes
          </strong>
        </p>
        <p className="text-lg font-semibold text-indigo-700">
          Total Price: NPR {price}
        </p>
      </div>

      <button
        onClick={handlePayment}
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
      >
        Pay via Khalti
      </button>
    </div>
  );
};

export default PaymentPage;
