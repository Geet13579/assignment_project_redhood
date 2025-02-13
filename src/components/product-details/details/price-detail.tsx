
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function DeatilsPage({ product }: any) {
 
  return (
    <div className=" mt-5 grid 2xl:grid-cols-2 grid-cols-1  gap-8">
      <div className="bg-white border-[1.5px] flex  gap-5 justify-around border-borderColor p-8 h-auto">
       <ul className="flex flex-col gap-5 justify-evenly items-left">
        <li>Return Policy</li>
        <li>Weight</li>
        <li>Stock</li>
        <li>Discount Percentage</li>
        <li>Price</li>

       </ul>
       <ul className="flex flex-col gap-5 justify-evenly items-left">
       <li>-</li>
       <li>-</li>
       <li>-</li>
       <li>-</li>
       <li>-</li>

</ul>

       <ul className="flex  flex-col gap-5 justify-evenly items-left">
       <li>{product?.returnPolicy}</li>

        <li>{product?.weight}</li>
        <li>{product?.stock}</li>
        <li>{product?.discountPercentage}</li>
        <li>{product?.price}</li>

       </ul>
   
     
      </div>
    </div>
  );
}

export default DeatilsPage;
