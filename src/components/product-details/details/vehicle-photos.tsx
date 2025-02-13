import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download } from "lucide-react";

type TaskImages = {
  type: string;
  pick_up_images: {
    [key: string]: string;
  };
  drop_off_images: {
    [key: string]: string;
  };
  return_images: {
    [key: string]: string;
  };
};

interface DetailsPageProps {
  product: TaskImages;
}

const DetailsPage = ({ product }: DetailsPageProps) => {
  const [selectedServiceCenter, setSelectedServiceCenter] = useState(
    product.type === "PICKUP" ? "Pick-up photo" : "Service Center to Drop-off"
  );
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

  const handleServiceDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedServiceCenter(value);
  };

  const currentImages =
  selectedServiceCenter === "Pick-up photo"
    ? product.pick_up_images
    : selectedServiceCenter === "Return to Service photos"
    ? product.return_images
    :  selectedServiceCenter === "At Service Center Photo" ? product.drop_off_images:""


  return (
    <div className="mt-5 2xl:w-[60%] w-[100%]">
      <div className="bg-white border-borderColor border-[1.5px] p-8 h-auto">
        <select
          name="dropdown"
          value={selectedServiceCenter}
          onChange={handleServiceDropdownChange}
          className="mb-8 border-[1.5px] h-[38px] text-[16px] font-medium border-borderColor rounded-[6px] px-3 py-2 transition duration-300 block w-full focus:outline-none focus:border-primary hover:border-primary"
        >
          {product.type === "PICKUP" ? (
            <>
              <option value="Pick-up photo">Pick-up photo</option>
              <option value="At Service Center Photo">At Service Center Photo</option>
              <option value="Return to Service photos">Return to Service photos</option>

            </>
          ) : (
            <>
              <option value="Service Center to Drop-off">Service Center to Drop-off</option>
              <option value="Customer House After Drop-off">
                Customer House After Drop-off
              </option>
              <option value="Return to Service photos">Return to Service photos</option>

            </>
          )}
        </select>

        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
          {currentImages === null ? "No Found Data": Object?.entries(currentImages)?.map(([label, imageUrl]) => (
            <Dialog
              key={label}
              open={!!isDialogOpen[label]}
              onOpenChange={(isOpen) => handleDialogToggle(label, isOpen)}
            >
              <DialogTrigger asChild>
                <div className="flex flex-col gap-2">
                  <div className="w-full h-24 bg-[#F0E1E1] overflow-hidden focus:outline-none border-[1.5px] border-borderColor rounded-[6px]">
                    <img
                      src={imageUrl}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      alt={label}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 text-center">
                    {label}
                  </span>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{label}</DialogTitle>
                </DialogHeader>
                <button
                  onClick={() => handleDownload(imageUrl, label)}
                  className="absolute text-white text-center right-0 bottom-0 border border-white h-[40px] w-[50px] bg-black hover:bg-gray-800 transition-colors duration-300"
                >
                  <Download className="inline-block" size={24} />
                </button>
                <div className="w-full">
                  <img
                    src={imageUrl}
                    className="w-full h-full object-contain"
                    alt={label}
                  />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
        <p className="mt-4 text-[#908A8A] text-sm">
          <span className="font-medium">Note:</span> This audio and content are
          available for 30 days. After that, both will be automatically deleted from
          the server.
        </p>
      </div>
    </div>
  );
};

export default DetailsPage;