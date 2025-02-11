import dynamic from "next/dynamic";

export const lazyLoad = (
  importFunc: () => Promise<any>,
  loadingComponent = null
) => {
  return dynamic(
    () =>
      new Promise<typeof importFunc>((resolve) => {
        setTimeout(() => resolve(importFunc()), 200); // 2000 ms delay
      }),
    {
      loading: () =>
        loadingComponent || (
          <>
            <div className="mt-4">
              <div className="flex flex-col  w-full items-center gap-2 p-2 rounded">
                <div className="grid grid-cols-3 w-full h-[150px] gap-4">
                  <div className="bg-gray-200   rounded-[6px] animate-pulse"></div>
                  <div className="bg-gray-200     rounded-[6px] animate-pulse"></div>
                  <div className="bg-gray-200    rounded-[6px] animate-pulse"></div>
                </div>
                <div className="bg-gray-200 h-[300px] w-full  rounded-[6px] animate-pulse"></div>
                <div className="bg-gray-200 h-[300px] w-full  rounded-[6px] animate-pulse"></div>

                <div className="grid grid-cols-2 w-full h-[150px] gap-4">
                  <div className="bg-gray-200   rounded-[6px] animate-pulse"></div>
                  <div className="bg-gray-200     rounded-[6px] animate-pulse"></div>
                </div>
              </div>
            </div>
          </>
        ),
        ssr: false
    },
  );
};
