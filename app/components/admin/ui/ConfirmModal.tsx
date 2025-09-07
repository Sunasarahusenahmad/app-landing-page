"use client";

import React, { useState, useEffect } from "react";
import styles from "@/app/styles/admin/ui/confirmModal.module.css";

interface ConfirmModalProps {
  isOpen: boolean;
  type: "delete" | "confirm" | "reject" | "custom" | "logout";
  title?: string;
  message?: string;
  onConfirm?: (reason?: string) => void;
  onCancel?: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  type,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  const [cancelReason, setCancelReason] = useState<string>("");

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onCancel?.();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onCancel]);

  // Reset cancel reason when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCancelReason("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getDefaultContent = () => {
    switch (type) {
      case "delete":
        return {
          title: "Delete Item",
          message:
            "Are you sure you want to delete this item? This action cannot be undone.",
        };
      case "confirm":
        return {
          title: "Confirmation",
          message: "Do you want to confirm this action?",
        };
      case "reject":
        return {
          title: "Reject Item",
          message:
            "Are you sure you want to cancel this? Please provide a reason.",
        };
      case "logout":
        return {
          title: "Logout",
          message:
            "Are you sure you want to logout? You will need to sign in again.",
        };
      default:
        return { title, message };
    }
  };

  const { title: modalTitle, message: modalMessage } = getDefaultContent();

  const getConfirmButtonClass = () => {
    switch (type) {
      case "delete":
        return styles.confirmButtonDelete;
      case "reject":
        return styles.confirmButtonReject;
      case "logout":
        return styles.confirmButtonLogout;
      default:
        return styles.confirmButtonDefault;
    }
  };

  const getConfirmButtonText = () => {
    switch (type) {
      case "delete":
        return "Delete";
      case "reject":
        return "Reject";
      case "logout":
        return "Logout";
      default:
        return "Confirm";
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCancel?.();
    }
  };

  const handleConfirm = () => {
    onConfirm?.(type === "reject" ? cancelReason : undefined);
  };

  const isConfirmDisabled = type === "reject" && !cancelReason.trim();

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-message"
    >
      <div className={styles.modal}>
        {/* Modal Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h2 id="modal-title" className={styles.title}>
              {modalTitle}
            </h2>
            <button
              onClick={onCancel}
              className={styles.closeButton}
              aria-label="Close modal"
            >
              <svg
                className={styles.closeIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className={styles.body}>
          <p id="modal-message" className={styles.message}>
            {modalMessage}
          </p>

          {/* Rejection Reason Textarea */}
          {type === "reject" && (
            <div className={styles.textareaContainer}>
              <label htmlFor="cancel-reason" className={styles.label}>
                Reason for cancellation{" "}
                <span className={styles.required}>*</span>
              </label>
              <textarea
                id="cancel-reason"
                rows={4}
                placeholder="Enter reason for cancellation..."
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className={styles.textarea}
                maxLength={500}
              />
              <div className={styles.charCount}>
                <span>{cancelReason.length}/500</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className={styles.footer}>
          <button
            type="button"
            onClick={onCancel}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isConfirmDisabled}
            className={`${styles.confirmButton} ${getConfirmButtonClass()} ${
              isConfirmDisabled ? styles.disabled : ""
            }`}
          >
            {getConfirmButtonText()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
