"use client";

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        status,
        ...props
      }) {
        const isPositive = status === true; // or use any condition based on your logic
        const toastClassName = isPositive
          ? "bg-green-500 text-white border-white border-[1.5px] "
          : "bg-black text-white border-[#ff6702] border-[1.5px] rounded-[6px]";

        // console.log("status", status);
        return (
          <Toast key={id} {...props} className={toastClassName}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
