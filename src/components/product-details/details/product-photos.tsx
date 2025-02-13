import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download } from "lucide-react";


const DetailsPage = ({ product }: any) => {

  const [isDialogOpen, setIsDialogOpen] = useState<{ [key: string]: boolean }>({});

  const handleDialogToggle = (key: string, isOpen: boolean) => {
    setIsDialogOpen((prev) => ({ ...prev, [key]: isOpen }));
  };

  const handleDownload = async (imageUrl: string, label: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `${label.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };


  return (
    <div className="mt-5 2xl:w-[60%] w-[100%]">
      <div className="bg-white border-borderColor border-[1.5px] p-8 h-auto">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
          {product?.images.length === 0 ? "No Found Data": Object?.entries(product.images)?.map(([label, imageUrl]) => (
            <Dialog
              key={label}
              open={!!isDialogOpen[label]}
              onOpenChange={(isOpen) => handleDialogToggle(label, isOpen)}
            >
              <DialogTrigger asChild>
                <div className="flex flex-col gap-2">
                  <div className="w-full h-24 bg-[#F0E1E1] overflow-hidden focus:outline-none border-[1.5px] border-borderColor rounded-[6px]">
                    <img
                    //@ts-expect-error null
                      src={imageUrl}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      alt={label}
                    />
                  </div>
                 
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{label}</DialogTitle>
                </DialogHeader>
                <button
                    //@ts-expect-error null

                  onClick={() => handleDownload(imageUrl, label)}
                  className="absolute text-white text-center right-0 bottom-0 border border-white h-[40px] w-[50px] bg-black hover:bg-gray-800 transition-colors duration-300"
                >
                  <Download className="inline-block" size={24} />
                </button>
                <div className="w-full">
                  <img
                    //@ts-expect-error null

                    src={imageUrl}
                    className="w-full h-full object-contain"
                    alt={label}
                  />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
       
      </div>
    </div>
  );
};

export default DetailsPage;