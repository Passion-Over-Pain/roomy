import { toast } from "sonner";
import { ToastMessage } from "./toast";

type ToastOptions = {
  description?: string;
  duration?: number;
};

class ToastService {
  success(title: string, options?: ToastOptions) {
    toast(
      <ToastMessage
        title={title}
        description={options?.description}
        variant="success"
      />,
      { duration: options?.duration ?? 4000 },
    );
  }

  error(title: string, options?: ToastOptions) {
    toast(
      <ToastMessage
        title={title}
        description={options?.description}
        variant="error"
      />,
      { duration: options?.duration ?? 5000 },
    );
  }

  info(title: string, options?: ToastOptions) {
    toast(
      <ToastMessage
        title={title}
        description={options?.description}
        variant="info"
      />,
      { duration: options?.duration ?? 4000 },
    );
  }
}

export const toastService = new ToastService();
