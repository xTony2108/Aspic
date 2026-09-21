import { createLink, type LinkComponent } from "@tanstack/react-router";
import { forwardRef } from "react";

interface BasicLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: React.ReactNode;
  label: string;
}

const BasicLinkComponent = forwardRef<HTMLAnchorElement, BasicLinkProps>(
  ({ icon, label, className, ...props }, ref) => {
    return (
      <a
        {...props}
        ref={ref}
        className={`relative flex items-center justify-between text-sidebar-link-color w-full rounded-xl px-3 py-2.5 hover:bg-sidebar-active transition-colors duration-200 ${className ? className : ""}`}
      >
        <div className="flex items-center gap-3">
          <span className="w-5 text-center shrink-0">{icon}</span>
          {label}
        </div>
      </a>
    );
  },
);

const CreatedLinkComponent = createLink(BasicLinkComponent);

export const SidebarLink: LinkComponent<typeof BasicLinkComponent> = ({
  ...props
}) => {
  return (
    <CreatedLinkComponent
      preload={"intent"}
      activeProps={{
        className:
          "text-white bg-sidebar-active pointer-events-none before:absolute before:content-[''] before:left-0 before:top-1/5 before:bottom-1/5 before:w-0.75 before:bg-blue-light",
      }}
      {...props}
    />
  );
};
