
const DetailsPage = () => {

  const data = [
    "Cabin Mats",
    "Tools Kit",
    "Warranty Book",
    "Trunk Mat",
    "Jack",
    "Antenna",
    "Owner Manual",
    "Spare Wheel",
    "RC Book",
    "Insurance",
  ];


  const totalBars = 10;
  const filledBars = 6;

  return (
    <>
      <div className="mt-5 w-[100%]">
        <div className="bg-white border-borderColor border-[1.5px] p-8 h-auto">
          <div className="grid grid-cols-2 gap-4 my-5">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] text-textLightColor font-medium">
                KMs Reading
              </label>
              <input
                name="invoice_amount"
                className="border-[1.5px] h-[38px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary hover:border-primary"
                placeholder="20km"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] text-textLightColor font-medium">
                Fuel Guage
              </label>
              <input
                name="invoice_amount"
                className="border-[1.5px] h-[38px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary hover:border-primary"
                placeholder=""
              />
            </div>
          </div>

          <div className="w-[400px] flex gap-2 my-5">
          {Array.from({ length: totalBars }).map((_, index) => (
        <div
          key={index}
          className={`h-8 w-2 rounded-full ${
            index < filledBars ? 'bg-primary' : 'bg-borderColor'
          }`}
        />
      ))}

          </div>

          <div className="grid grid-cols-5 gap-4">
            {data.map((data, index) => (
              <div 
              key={index}
              className="border-[1.6px] border-black-500 px-5 py-2 rounded-[6px] text-center">
                {data}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
