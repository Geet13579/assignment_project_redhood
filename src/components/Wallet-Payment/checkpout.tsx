import React, { useState } from "react";

function Select() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    totalAmount: "",
  });

  const [GSTAmount, setGSTAmount] = useState(0);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    const gstAmount = parseInt(value) * 0.02
    const totalAmount = parseInt(value) - gstAmount; 
    setGSTAmount(totalAmount);
    setFormData({ ...formData, [name]: value });
  };


  const walletUpdate =(amount:any, order_id:any, status:any) =>{

    const getToken = localStorage.getItem("authToken");
    const parsedToken = getToken ? JSON.parse(getToken) : null;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/recharge-wallet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${parsedToken.token}`,
      },
      body: JSON.stringify({amount:amount, order_id:order_id, status:status}),
    })
      .then((response) => response.json())
      .then((data) => {

        // // console.log('data', data)
    window.location.reload();
     

      })
  }

  const handleSubmit = (e:any) => {
    e.preventDefault();

    const getToken = localStorage.getItem("authToken");
    const parsedToken = getToken ? JSON.parse(getToken) : null;


    fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment-create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${parsedToken.token}`,
      },
      body: JSON.stringify({amount:formData.totalAmount}),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Convert response to JSON
    })
      .then((data) => {

        const onPaymentSuccess = (response:any) => {
          walletUpdate(data?.data?.amount/100, response.razorpay_order_id, 'SUCCESS')
        }

        const onPaymentFailed = (response:any) => {
          walletUpdate(data?.data?.amount/100,response.error.metadata.order_id, 'FAILED')
        }

        const options = {
          key: process.env.NEXT_PUBLIC_PAYMENT_KEY, 
          amount: data?.data?.amount, 
          currency: data?.data?.currency, 
          name: data?.data?.name,
          order_id: data?.data?.id, 
          handler: function (response:any){

            // console.log('response', response)
            if(response.razorpay_payment_id){
             
              onPaymentSuccess(response)
            } else if(response.error.code === 'API_ERROR'){
              
              onPaymentFailed(response)
            } else {
             
              onPaymentFailed(response)
            }
          },
          prefill: { 
              name: data?.data?.notes?.name, 
              email:data?.data?.notes?.email, 
              contact:data?.data?.notes?.phone  
          },
          theme: {
              color: "#FF6702"
          }
        };

        //@ts-expect-error null
        const pay = new window.Razorpay(options);
        pay.open();
        pay.on('payment.failed', onPaymentFailed);

  })
    
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center px-[16px] mb-4 text-textLightColor">
        <div>
          <p className="text-[14px] text-[#211C1C] leading-[16px]">
            Add Wallet
          </p>
        </div>
      </div>
      <div className="">

      <form
          onSubmit={handleSubmit}>
        <div className="bg-white border-[1.5px] p-[16px] border-borderColor rounded-[6px]">
          <div className="grid  items-center grid-cols-1 gap-6 h-auto">
            {/* Previous input fields remain the same */}

{/*             
            <div className="flex flex-col gap-2">
              <label className="text-[14px] text-textLightColor font-medium">
                First Name
              </label>
              <input
                name="fname"
                type="text"
                value={formData.fname}
                onChange={handleChange}
                required
                className="border-[1.5px] h-[38px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary hover:border-primary"
                placeholder="Enter Your First Name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] text-textLightColor font-medium">
                {" "}
                Last Name
              </label>
              <input
                name="lname"
                type="text"
                value={formData.lname}
                onChange={handleChange}
                required
                className="border-[1.5px] h-[38px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary hover:border-primary"
                placeholder="Enter Your Last Name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] text-textLightColor font-medium">
                Email{" "}
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                required
                className="border-[1.5px] h-[38px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary hover:border-primary"
                placeholder="Enter Your Email id"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] text-textLightColor font-medium">
                Mobile Number
              </label>
              <input
                name="mobile"
                type="number"
                minLength={10}
                maxLength={10}
                value={formData.mobile}
                onChange={handleChange}
                required
                className="border-[1.5px] h-[38px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary hover:border-primary"
                placeholder="Enter Your Mobile Number"
              />
            </div> */}



            <div className="flex flex-col gap-2 ">
              <label className="text-[14px] text-textLightColor font-medium">
                Total Amount
              </label>
              <input
                name="totalAmount"
                type="number"
                value={formData.totalAmount}
                onChange={handleChange}
                required
                className="border-[1.5px] h-[50px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary hover:border-primary"
                placeholder="Amount"
              />
            </div>
            <label className="text-[14px] text-textLightColor font-medium " >
                Note : <span className="font-bold text-blue-500">{GSTAmount}</span> is deposited in your wallet with <span className="font-bold text-blue-500">2%</span>  service charges
              </label>
{/* 
            <div className="flex flex-col gap-2 ">
              <label className="text-[14px] text-textLightColor font-medium">
                Total Amount with GST
              </label>
              <input
                name="totalAmount"
                type="number"
                readOnly
                disabled
                value={GSTAmount}
                required
                className="border-[1.5px] h-[50px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary hover:border-primary"
                placeholder="Amount"
              />
            </div> */}
          </div>

          <div className="flex justify-around pt-8">
            <button className="border-[1.5px] border-borderColor rounded-[6px] px-10 py-1">
              Clear
            </button>
            <button type="submit" className="bg-primary text-white  rounded-[6px] px-10     py-1">
              Pay Now
            </button>
          </div>

          
        </div>
        </form>
      </div>
    </div>
  );
}

export default Select;
