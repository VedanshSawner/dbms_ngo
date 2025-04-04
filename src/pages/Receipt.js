import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Receipt = () => {
  const { id } = useParams();
  const [receiptData, setReceiptData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/receipt/${id}`)
      .then((res) => res.json())
      .then((data) => setReceiptData(data));
  }, [id]);

  return receiptData ? (
    <div>
      <h2>Donation Receipt</h2>
      <p>Name: {receiptData.name}</p>
      <p>Email: {receiptData.email}</p>
      <p>Amount: ${receiptData.amount}</p>
      <p>Payment Method: {receiptData.paymentMethod}</p>
      <p>Date: {receiptData.date}</p>
      <button onClick={() => window.print()}>Download PDF</button>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Receipt;