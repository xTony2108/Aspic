import { Outlet, useLocation } from "@tanstack/react-router";
import { ProgressDot } from "../../../components/form/progress/ProgressDot";
import { ProgressLine } from "../../../components/form/progress/ProgressLine";
import { FormHeader } from "../../../components/form/FormHeader";
import { STEPS } from "../../../features/services/services.config";
import { Fragment } from "react/jsx-runtime";
import { motion } from "motion/react";

import { useStepGuard } from "../../../hooks/useStepGuard";

export const PrenotaStepLayout = () => {
  const { pathname } = useLocation();

  const currentIndex = STEPS.findIndex((s) => s.path === pathname);
  useStepGuard(currentIndex);

  return (
    <>
      <FormHeader />
      <div className="border-b border-border fixed w-full bg-bg/90 backdrop-blur-md z-50 mt-18">
        <div className="flex items-center m-auto px-5 py-3.5 max-w-3xl">
          {STEPS.map((step, i) => (
            <Fragment key={step.path}>
              <ProgressDot
                progress={String(i + 1)}
                progressLabel={step.label}
                active={i === currentIndex}
                done={i < currentIndex}
              />
              {i < STEPS.length - 1 && <ProgressLine />}
            </Fragment>
          ))}
        </div>
      </div>
      <main className="relative bg-bg min-h-dvh">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: false }}
          className="px-5 pt-42 max-w-3xl mx-auto"
          key={pathname}
        >
          <div className="surface-panel mb-8 p-6 md:p-8">
            <span className="text-xs text-accent font-medium uppercase mb-2.5 tracking-widest">
              PASSO {currentIndex + 1} DI {STEPS.length}
            </span>
            <h2 className="font-garamond">
              {STEPS[currentIndex] && STEPS[currentIndex].heading}
            </h2>
            <p className="mt-1">
              {STEPS[currentIndex] && STEPS[currentIndex].description}
            </p>
          </div>

          <div className="surface-panel p-5 md:p-8">
            <Outlet />
          </div>
        </motion.section>
      </main>
    </>
  );
};
