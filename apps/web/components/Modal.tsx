import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/shadcn/dialog";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Modal = ({ open, onClose, title, icon, children }: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-full rounded-xl shadow-lg bg-white animate-slide-in p-6">
        <DialogHeader className="flex items-center flex-row justify-between">
          <DialogTitle className="flex gap-2 text-lg font-semibold text-gray-900">
            {icon}
            {title}
          </DialogTitle>
          <X
            className="text-gray-600 size-5 cursor-pointer"
            onClick={onClose}
          />
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
