export const SidebarLabel = ({ label }: { label: string }) => {
  return (
    <div className="px-2 py-1 text-[.62rem] font-semibold uppercase text-sidebar-text-color mb-1.5 tracking-sidebar-wider">
      {label}
    </div>
  );
};
