"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PrintLocationLabelProps {
  open: boolean;
  onClose: () => void;
  locationName: string;
  qrCode: string;
}

export function PrintLocationLabel({
  open,
  onClose,
  locationName,
}: PrintLocationLabelProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <div className="fixed inset-0 bg-gray-800/60" />
      <DialogContent className="max-w-sm border border-border bg-white dark:bg-gray-900 shadow-xl">
        <DialogHeader>
          <DialogTitle>Print Label</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <div className="w-full aspect-square max-w-xs bg-gray-200 dark:bg-gray-600 flex items-center justify-center rounded-md">
            <span className="text-sm text-gray-500 dark:text-gray-300">
              QR Code
            </span>
          </div>
          <h2 className="text-lg font-semibold">{locationName}</h2>
          <div className="flex gap-2">
            <Button onClick={() => window.print()} className="cursor-pointer">
              Print
            </Button>
            <Button variant="secondary" className="cursor-pointer">
              Save Image
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
