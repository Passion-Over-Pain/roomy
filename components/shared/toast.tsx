import { FiCheckCircle, FiXCircle, FiInfo } from "react-icons/fi";

type ToastVariant = "success" | "error" | "info";

interface ToastMessageProps {
  title: string;
  description?: string;
  variant?: ToastVariant;
}

const variantStyles = {
  success: {
    icon: FiCheckCircle,
    iconColor: "text-green-500",
  },
  error: {
    icon: FiXCircle,
    iconColor: "text-red-500",
  },
  info: {
    icon: FiInfo,
    iconColor: "text-blue-500",
  },
};

export function ToastMessage({
  title,
  description,
  variant = "info",
}: ToastMessageProps) {
  const { icon: Icon, iconColor } = variantStyles[variant];

  return (
    <div className="flex items-start gap-3">
      <Icon className={`h-5 w-5 mt-0.5 ${iconColor}`} />

      <div className="flex flex-col">
        <span className="text-sm font-semibold">{title}</span>

        {description && (
          <span className="text-xs text-gray-500">{description}</span>
        )}
      </div>
    </div>
  );
}
