import { setDialog } from "@/lib/stores/dialog-store";

class DialogService {
  alert(options: DialogOptions) {
    setDialog({
      ...options,
      variant: "alert",
      open: true,
    });
  }

  confirm(options: DialogOptions) {
    return new Promise<boolean>((resolve) => {
      let settled = false;

      const settle = (value: boolean) => {
        if (settled) return;
        settled = true;
        resolve(value);
      };

      setDialog({
        ...options,
        onConfirm: () => {
          options.onConfirm?.();
          settle(true);
        },
        onCancel: () => {
          options.onCancel?.();
          settle(false);
        },
        variant: "confirm",
        open: true,
      });
    });
  }

  modal(options: DialogOptions) {
    return new Promise<string | null>((resolve) => {
      let settled = false;

      const settle = (value: string | null) => {
        if (settled) return;
        settled = true;
        resolve(value);
      };

      setDialog({
        ...options,
        onConfirm: (inputValue?: string) => {
          options.onConfirm?.(inputValue);
          settle(inputValue ?? null);
        },
        onCancel: () => {
          options.onCancel?.();
          settle(null);
        },
        variant: "modal",
        open: true,
      });
    });
  }

  close() {
    setDialog(null);
  }
}

export const dialogService = new DialogService();
