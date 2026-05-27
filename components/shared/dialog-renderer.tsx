import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { subscribe } from "@/lib/stores/dialog-store";
import { dialogService } from "@/lib/services/dialog-service";

export function DialogRenderer() {
  const [dialog, setDialog] = useState<DialogState | null>(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    return subscribe((d) => {
      setDialog(d);
      if (d?.variant === "modal" && d.defaultValue) {
        setInputValue(d.defaultValue);
      } else {
        setInputValue("");
      }
    });
  }, []);

  if (!dialog) return null;

  const isModal = dialog.variant === "modal";

  return (
    <Dialog
      open={dialog.open}
      onOpenChange={(open) => {
        if (!open) {
          dialog.onCancel?.();
          dialogService.close();
        }
      }}
    >
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{dialog.title}</DialogTitle>
          {dialog.description && (
            <DialogDescription>{dialog.description}</DialogDescription>
          )}
        </DialogHeader>

        {isModal && (
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Write a personal note to the organization admin (optional)"
            rows={6}
            maxLength={300}
            style={{ width: "100%", resize: "vertical", marginTop: "1rem" }}
          />
        )}

        <DialogFooter>
          {dialog.variant === "confirm" && (
            <>
              <Button
                variant="secondary"
                onClick={() => {
                  dialog.onCancel?.();
                  dialogService.close();
                }}
              >
                {dialog.cancelText ?? "Cancel"}
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  dialog.onConfirm?.();
                  dialogService.close();
                }}
              >
                {dialog.confirmText ?? "OK"}
              </Button>
            </>
          )}

          {isModal && (
            <Button
              variant="primary"
              onClick={() => {
                dialog.onConfirm?.(inputValue);
                dialogService.close();
              }}
            >
              {dialog.confirmText ?? "Send"}
            </Button>
          )}

          {!isModal && dialog.variant !== "confirm" && (
            <Button
              variant="primary"
              onClick={() => {
                dialog.onConfirm?.();
                dialogService.close();
              }}
            >
              {dialog.confirmText ?? "OK"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
