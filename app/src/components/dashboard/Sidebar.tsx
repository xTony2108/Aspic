import { useState } from "react";
import logo from "../../assets/logo_aspic_bianco.svg";
import { SidebarLink } from "./SidebarLink";
import { CiLogout, CiMenuFries } from "react-icons/ci";
import { BsClipboardCheck } from "react-icons/bs";
import { FaCalendarDays } from "react-icons/fa6";
import { MdOutlineGroup } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { SidebarLabel } from "./SidebarLabel";
import { DashboardAvatar } from "./DashboardAvatar";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createGetUserDataQueryOptions } from "../../api/admin/createGetUserDataQueryOptions";
import { createLogoutMutationOptions } from "../../api/auth/createLogoutMutationOptions";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../../store";
import { queryClient } from "../../queryClient";

export const Sidebar = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const {
    data: { userData },
  } = useSuspenseQuery(createGetUserDataQueryOptions());

  const cleanup = () => {
    useAuthStore.getState().setData({ accessToken: undefined });
    queryClient.clear();
    return navigate({ to: "/admin" });
  };

  const { mutate } = useMutation(
    createLogoutMutationOptions({ onError: cleanup, onSuccess: cleanup }),
  );
  return (
    <>
      <button
        className="flex items-center justify-center lg:hidden fixed top-4 right-4 z-50 min-w-10 min-h-10 rounded-lg bg-sidebar text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CiMenuFries size={20} />
      </button>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 bottom-0 h-dvh z-50 w-60 bg-sidebar flex flex-col transition-transform duration-300 lg:translate-x-0 will-change-auto overflow-y-scroll no-scrollbar ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="px-5 pt-6 pb-4 border-b border-login-border">
          <img
            src={logo}
            alt="logo aspic reggio calabria"
            fetchPriority="high"
            className="w-3/4"
          />
          <div className="text-[0.7rem] font-medium text-sidebar-text-color tracking-widest uppercase mt-[0.25rem]">
            Pannello amministrativo
          </div>
        </div>
        <nav className="px-4 py-3 mb-6 grow">
          <SidebarLabel label="Principale" />
          <div className="text-sm font-medium pointer relative">
            <SidebarLink
              icon={<BsClipboardCheck size={18} />}
              label="Richieste"
              to="/dashboard/richieste"
              onClick={() => setIsOpen(false)}
            />
            <SidebarLink
              icon={<FaCalendarDays size={18} />}
              label="Disponibilità"
              to="/dashboard/disponibilita"
              onClick={() => setIsOpen(false)}
            />
          </div>

          {userData && userData.role === "admin" && (
            <>
              <SidebarLabel label="Gestione" />
              <div className="text-sm font-medium pointer relative">
                <SidebarLink
                  icon={<MdOutlineGroup size={18} />}
                  label="Professionisti"
                  to="/dashboard/professionisti"
                  onClick={() => setIsOpen(false)}
                />
              </div>
            </>
          )}

          <SidebarLabel label="Account" />
          <div className="text-sm font-medium pointer relative">
            <SidebarLink
              icon={<IoSettingsOutline size={18} />}
              label="Impostazioni"
              to="/dashboard/impostazioni"
              onClick={() => setIsOpen(false)}
            />
          </div>
        </nav>
        <div className="px-3 py-4 border-t border-login-border">
          <div className="flex gap-3 items-center">
            <DashboardAvatar
              nameLetter={userData.firstName.charAt(0)}
              size="base"
            />
            <div className="flex-1 shrink-0 min-w-0">
              <div className="text-[0.875rem] text-white font-medium text-nowrap text-ellipsis overflow-hidden">
                {`${userData.firstName} ${userData.lastName}`}
              </div>
              <div className="text-xs text-sidebar-text-color">
                Amministratore
              </div>
            </div>
            <button
              className="text-white shrink-0 cursor-pointer"
              onClick={() => mutate()}
            >
              <CiLogout size={24} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
