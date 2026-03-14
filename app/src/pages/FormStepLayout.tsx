import { Outlet, useLocation } from "@tanstack/react-router";
import { ProgressDot } from "../components/form/progress/ProgressDot";
import { ProgressLine } from "../components/form/progress/ProgressLine";
import { FormHeader } from "../components/form/FormHeader";
import { STEPS } from "../features/services/services.config";
import { Fragment } from "react/jsx-runtime";
import { motion } from "motion/react";

export const FormStepLayout = () => {
  const { pathname } = useLocation();
  const currentIndex = STEPS.findIndex((s) => s.path === pathname);

  return (
    <>
      <FormHeader />
      <div className="border-b border-border fixed w-full bg-bg z-50">
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
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: false }}
        className="px-5 pt-24 pb-20 md:pt-26 md:pb-24 lg:pt-32 lg:pb-28 max-w-3xl m-auto"
        key={pathname}
      >
        <div className="mb-8">
          <span className="text-xs text-primary font-medium uppercase mb-2.5 tracking-widest">
            PASSO {currentIndex + 1} DI {STEPS.length}
          </span>
          <h2 className="font-garamond font-light">
            {STEPS[currentIndex] && STEPS[currentIndex].heading}
          </h2>
          <p className="font-light mt-1">
            {STEPS[currentIndex] && STEPS[currentIndex].description}
          </p>
        </div>

        <Outlet />
      </motion.section>
    </>
  );
};
