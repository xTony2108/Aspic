import { type ReactNode } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  titleEm?: string;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  titleEm,
  children,
  footer,
  maxWidth = "max-w-lg",
}: ModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/45 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`bg-white rounded-2xl w-full ${maxWidth} max-h-[90vh] overflow-y-auto animate-[fadeUp_.3s_ease_both]`}
      >
        <div className="flex items-center justify-between p-6 pb-0">
          <h3 id="modal-title" className="font-garamond text-2xl font-semibold">
            {title}{" "}
            {titleEm && <em className="italic text-primary">{titleEm}</em>}
          </h3>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text p-1.5 rounded-lg hover:bg-cream transition-colors cursor-pointer"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6">{children}</div>

        {footer && (
          <div className="flex gap-2 justify-end px-6 pb-6 pt-4 border-t border-border">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.getElementById("modal")!,
  );
};
