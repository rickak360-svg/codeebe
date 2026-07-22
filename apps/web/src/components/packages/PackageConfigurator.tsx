"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import {
  services,
  calculateEstimate,
  buildEstimateUrl,
  buildContactUrl,
  formatINR,
  getServicePlans,
  type ServiceId,
  type PlanId,
  type ServicePlan,
} from "@/data/configurator";

const PRIMARY = "#FF7A00";
const PRIMARY_HOVER = "#FF9333";
const SUCCESS = "#22C55E";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

function ProgressIndicator({
  currentStep,
  steps,
}: {
  currentStep: number;
  steps: { num: number; label: string; done: boolean }[];
}) {
  return (
    <div className="mb-10 flex items-center justify-center gap-0 sm:gap-2">
      {steps.map((step, i) => (
        <motion.div
          key={step.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="flex items-center"
        >
          <motion.div
            className="flex items-center gap-2 rounded-full px-3 py-1.5 sm:px-4 sm:py-2"
            animate={{
              background:
                currentStep === step.num
                  ? "rgba(255,122,0,0.12)"
                  : step.done
                    ? "rgba(34,197,94,0.08)"
                    : "rgba(255,255,255,0.03)",
              borderColor:
                currentStep === step.num
                  ? "rgba(255,122,0,0.4)"
                  : step.done
                    ? "rgba(34,197,94,0.3)"
                    : "rgba(255,255,255,0.08)",
            }}
            style={{ border: "1px solid" }}
          >
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold"
              style={{
                background:
                  currentStep === step.num
                    ? PRIMARY
                    : step.done
                      ? SUCCESS
                      : "rgba(255,255,255,0.08)",
                color: currentStep === step.num || step.done ? "#090909" : "#9CA3AF",
              }}
            >
              {step.done && currentStep !== step.num ? (
                <MaterialIcon name="check" className="!text-[14px]" />
              ) : (
                step.num
              )}
            </span>
            <span
              className="hidden text-[12px] font-medium sm:inline"
              style={{ color: currentStep === step.num ? "#FFFFFF" : "#9CA3AF" }}
            >
              {step.label}
            </span>
          </motion.div>
          {i < steps.length - 1 && (
            <div
              className="mx-1 h-px w-6 transition-colors duration-300 sm:mx-2 sm:w-12"
              style={{
                background: step.done ? SUCCESS : "rgba(255,255,255,0.08)",
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

function ServiceCard({
  service,
  selected,
  onSelect,
  index,
}: {
  service: (typeof services)[0];
  selected: boolean;
  onSelect: () => void;
  index: number;
}) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.45 }}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className="group relative w-full overflow-hidden rounded-[24px] p-6 text-left transition-shadow duration-300"
      style={{
        background: selected
          ? "linear-gradient(135deg, rgba(255,122,0,0.12) 0%, rgba(18,18,18,0.95) 60%)"
          : "rgba(18,18,18,0.7)",
        border: selected
          ? `1.5px solid ${PRIMARY}`
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: selected
          ? "0 0 48px -12px rgba(255,122,0,0.45), 0 24px 48px -24px rgba(0,0,0,0.8)"
          : "0 8px 32px -16px rgba(0,0,0,0.6)",
        backdropFilter: "blur(20px)",
      }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,122,0,0.08), transparent)",
        }}
      />

      <motion.div
        className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full"
        animate={{
          background: selected ? PRIMARY : "rgba(255,255,255,0.06)",
          scale: selected ? 1 : 0.9,
        }}
      >
        {selected && <MaterialIcon name="check" className="!text-[16px] text-[#090909]" />}
      </motion.div>

      <div className="relative">
        <motion.div
          className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ background: "rgba(255,122,0,0.12)" }}
          whileHover={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.4 }}
        >
          <MaterialIcon name={service.icon} className="!text-[24px]" style={{ color: PRIMARY }} />
        </motion.div>

        <h3 className="mb-2 font-[family-name:var(--font-family-display)] text-lg font-bold text-white sm:text-xl">
          {service.title}
        </h3>
        <p className="mb-5 text-[13px] leading-relaxed text-[#9CA3AF]">{service.description}</p>

        <motion.div
          className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">From</span>
          <span className="font-[family-name:var(--font-family-display)] text-base font-bold text-white">
            {formatINR(service.startingPrice)}
          </span>
        </motion.div>
      </div>
    </motion.button>
  );
}

function PlanCard({
  plan,
  selected,
  onSelect,
  index,
}: {
  plan: ServicePlan;
  selected: boolean;
  onSelect: () => void;
  index: number;
}) {
  const isPopular = plan.popular;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: isPopular ? -8 : -4 }}
      onClick={onSelect}
      className="relative flex cursor-pointer flex-col rounded-[24px] p-6 transition-all duration-300 sm:p-7"
      style={{
        background: selected
          ? "linear-gradient(180deg, rgba(255,122,0,0.1) 0%, rgba(18,18,18,0.95) 40%)"
          : "rgba(18,18,18,0.8)",
        border: selected
          ? `2px solid ${PRIMARY}`
          : isPopular
            ? `1.5px solid rgba(255,122,0,0.5)`
            : "1px solid rgba(255,255,255,0.08)",
        boxShadow: isPopular
          ? "0 0 60px -12px rgba(255,122,0,0.35), 0 32px 64px -32px rgba(0,0,0,0.8)"
          : selected
            ? "0 0 40px -12px rgba(255,122,0,0.3)"
            : "0 16px 48px -24px rgba(0,0,0,0.6)",
        backdropFilter: "blur(20px)",
        transform: isPopular ? "scale(1.02)" : undefined,
      }}
    >
      {isPopular && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-wider"
          style={{
            background: `linear-gradient(135deg, ${PRIMARY}, ${PRIMARY_HOVER})`,
            color: "#090909",
            boxShadow: "0 4px 20px -4px rgba(255,122,0,0.6)",
          }}
        >
          {plan.badge}
        </motion.div>
      )}

      {!isPopular && (
        <span
          className="mb-4 inline-flex w-fit rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
          style={{
            background: "rgba(255,255,255,0.06)",
            color: "#9CA3AF",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {plan.badge}
        </span>
      )}

      {isPopular && <motion.div className="mb-4 h-3" />}

      <h3 className="font-[family-name:var(--font-family-display)] text-2xl font-bold text-white">
        {plan.name}
      </h3>
      <p className="mt-1 text-[13px] text-[#9CA3AF]">{plan.tagline}</p>

      <div
        className="my-5 rounded-2xl p-4"
        style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <p className="font-[family-name:var(--font-family-display)] text-3xl font-bold text-white">
          {formatINR(plan.price)}
        </p>
        <p className="mt-1 text-[12px] text-[#9CA3AF]">
          <MaterialIcon name="schedule" className="!text-[13px] mr-1 align-middle" style={{ color: PRIMARY }} />
          {plan.timeline}
        </p>
      </div>

      <p className="mb-4 text-[12.5px] leading-relaxed text-white/55">{plan.deliverables}</p>

      <ul className="mb-6 flex-1 space-y-2">
        {plan.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2 text-[12.5px] text-white/60">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: PRIMARY }} />
            {h}
          </li>
        ))}
      </ul>

      <div className="mb-5 grid grid-cols-2 gap-2">
        <MetaChip icon="cloud" label="Hosting" value={plan.hosting} />
        <MetaChip icon="support_agent" label="Support" value={plan.support} />
      </div>

      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        className="flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-semibold transition-colors"
        style={{
          background: selected ? PRIMARY : "rgba(255,255,255,0.05)",
          color: selected ? "#090909" : "#FFFFFF",
          border: selected ? "none" : "1px solid rgba(255,255,255,0.1)",
          boxShadow: selected ? "0 8px 32px -8px rgba(255,122,0,0.5)" : "none",
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        <MaterialIcon name={selected ? "check_circle" : "add_circle"} className="!text-[16px]" />
        {selected ? "Selected" : "Select plan"}
      </motion.button>
    </motion.article>
  );
}

function MetaChip({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div
      className="rounded-xl px-3 py-2"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <p className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-[#9CA3AF]">
        <MaterialIcon name={icon} className="!text-[11px]" style={{ color: PRIMARY }} />
        {label}
      </p>
      <p className="mt-0.5 text-[12px] font-medium text-white/80">{value}</p>
    </div>
  );
}

function ComparisonSection({
  plans,
  selectedPlan,
}: {
  plans: ServicePlan[];
  selectedPlan: PlanId | null;
}) {
  const [expanded, setExpanded] = useState(true);

  const rows = [
    { key: "price", label: "Price", render: (p: ServicePlan) => formatINR(p.price) },
    { key: "timeline", label: "Timeline", render: (p: ServicePlan) => p.timeline },
    { key: "hosting", label: "Hosting", render: (p: ServicePlan) => p.hosting },
    { key: "support", label: "Support", render: (p: ServicePlan) => p.support },
    { key: "deliverables", label: "Deliverables", render: (p: ServicePlan) => p.deliverables },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-12 overflow-hidden rounded-[24px]"
      style={{
        background: "rgba(18,18,18,0.6)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
      }}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-white/[0.02]"
      >
        <motion.div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: `${PRIMARY}cc` }}>
            Full comparison
          </p>
          <h3 className="mt-1 font-[family-name:var(--font-family-display)] text-xl font-bold text-white">
            Plan breakdown
          </h3>
        </motion.div>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.04]"
        >
          <MaterialIcon name="expand_more" className="!text-[20px] text-white/50" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="overflow-x-auto px-4 pb-6 sm:px-6">
              <table className="w-full min-w-[560px] border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="px-3 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#9CA3AF]">
                      Detail
                    </th>
                    {plans.map((plan) => (
                      <th
                        key={plan.id}
                        className="px-3 py-4 text-center"
                        style={{
                          background:
                            selectedPlan === plan.id
                              ? "rgba(255,122,0,0.06)"
                              : plan.popular
                                ? "rgba(255,122,0,0.03)"
                                : undefined,
                        }}
                      >
                        <span
                          className="block text-[13px] font-semibold"
                          style={{ color: plan.popular ? PRIMARY : "#FFFFFF" }}
                        >
                          {plan.name}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={row.key} className={i % 2 === 0 ? "bg-white/[0.015]" : ""}>
                      <td className="px-3 py-3.5 text-[13px] text-white/70">{row.label}</td>
                      {plans.map((plan) => (
                        <td
                          key={plan.id}
                          className="px-3 py-3.5 text-center text-[12px] text-white/70"
                          style={{
                            background:
                              selectedPlan === plan.id ? "rgba(255,122,0,0.04)" : undefined,
                            fontWeight: row.key === "price" ? 600 : undefined,
                            color: row.key === "price" ? "#FFFFFF" : undefined,
                          }}
                        >
                          {row.render(plan)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function StickySummary({
  serviceTitle,
  packageName,
  priceFormatted,
  timeline,
  hosting,
  support,
  estimateUrl,
  contactUrl,
}: {
  serviceTitle: string;
  packageName: string;
  priceFormatted: string;
  timeline: string;
  hosting: string;
  support: string;
  estimateUrl: string;
  contactUrl: string;
}) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-[120]"
      style={{
        background: "linear-gradient(180deg, transparent 0%, rgba(9,9,9,0.95) 20%)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div
        className="mx-auto max-w-[1440px] px-4 pb-4 sm:px-6"
        style={{
          paddingLeft: "max(1rem, env(safe-area-inset-left))",
          paddingRight: "max(1rem, env(safe-area-inset-right))",
        }}
      >
        <div
          className="flex flex-col gap-4 rounded-[24px] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
          style={{
            background: "rgba(18,18,18,0.95)",
            border: `1px solid rgba(255,122,0,0.25)`,
            backdropFilter: "blur(24px)",
            boxShadow: "0 -8px 48px -12px rgba(255,122,0,0.2), 0 24px 48px -24px rgba(0,0,0,0.8)",
          }}
        >
          <motion.div
            className="grid grid-cols-2 gap-x-6 gap-y-2 sm:flex sm:flex-wrap sm:items-center sm:gap-6"
            layout
          >
            <SummaryItem label="Service" value={serviceTitle} />
            <SummaryItem label="Package" value={packageName} highlight />
            <SummaryItem label="Price" value={priceFormatted} highlight large />
            <SummaryItem label="Timeline" value={timeline} />
            <SummaryItem label="Hosting" value={hosting} />
            <SummaryItem label="Support" value={support} />
          </motion.div>

          <motion.div className="flex shrink-0 flex-wrap gap-2 sm:gap-3" layout>
            <Link
              href={estimateUrl}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition-colors sm:flex-none"
              style={{
                background: PRIMARY,
                color: "#090909",
                boxShadow: "0 8px 32px -8px rgba(255,122,0,0.5)",
              }}
            >
              <MaterialIcon name="arrow_forward" className="!text-[16px]" />
              Continue
            </Link>
            <Link
              href={contactUrl}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border px-5 py-3 text-sm font-medium text-white/70 transition-all hover:border-white/20 hover:text-white sm:flex-none"
              style={{ borderColor: "rgba(255,255,255,0.12)" }}
            >
              <MaterialIcon name="support_agent" className="!text-[16px]" />
              Talk to Expert
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function SummaryItem({
  label,
  value,
  highlight,
  large,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  large?: boolean;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">{label}</p>
      <p
        className={`font-medium ${large ? "text-lg" : "text-[13px]"}`}
        style={{ color: highlight ? PRIMARY : "#FFFFFF" }}
      >
        {value}
      </p>
    </div>
  );
}

export function PackageConfigurator() {
  const isMobile = useIsMobile();
  const [serviceId, setServiceId] = useState<ServiceId | null>(null);
  const [planId, setPlanId] = useState<PlanId | null>(null);
  const [mobileStep, setMobileStep] = useState(1);

  const activeStep = serviceId ? 2 : 1;

  const progressSteps = useMemo(
    () => [
      { num: 1, label: "Service", done: !!serviceId },
      { num: 2, label: "Plan", done: !!planId },
    ],
    [serviceId, planId],
  );

  const displayStep = isMobile ? mobileStep : activeStep;
  const plans = serviceId ? getServicePlans(serviceId) : [];
  const selectedService = services.find((s) => s.id === serviceId);
  const selectedPlan = plans.find((p) => p.id === planId);

  const handleServiceSelect = useCallback(
    (id: ServiceId) => {
      setServiceId(id);
      setPlanId(null);
      if (isMobile) setMobileStep(2);
    },
    [isMobile],
  );

  const activeEstimate =
    serviceId && planId ? calculateEstimate(serviceId, planId) : null;

  const showSticky = !!(serviceId && planId && activeEstimate);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] as const } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
  };

  const showStep = (step: number) => !isMobile || displayStep === step;
  const planGridClass =
    plans.length === 2
      ? "grid items-start gap-6 sm:grid-cols-2 lg:max-w-3xl lg:mx-auto"
      : "grid items-start gap-6 lg:grid-cols-3 lg:gap-5";

  return (
    <section
      id="plans"
      className={`relative scroll-mt-28 pt-4 sm:pt-6 ${showSticky ? "pb-44 sm:pb-48" : "pb-24 sm:pb-32"}`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[600px]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,122,0,0.08), transparent)",
        }}
      />

      <motion.div className="site-container relative">
        <ProgressIndicator currentStep={displayStep} steps={progressSteps} />

        {isMobile && displayStep > 1 && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setMobileStep((s) => Math.max(1, s - 1))}
            className="mb-6 flex items-center gap-1.5 text-[13px] text-[#9CA3AF] transition-colors hover:text-white"
          >
            <MaterialIcon name="arrow_back" className="!text-[16px]" />
            Back
          </motion.button>
        )}

        <AnimatePresence mode="wait">
          {showStep(1) && (
            <motion.div
              key="step-1"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mb-12"
            >
              <StepHeader
                step={1}
                title="Choose your service"
                subtitle="Select the category that best matches your project vision."
              />
              <motion.div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service, i) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    selected={serviceId === service.id}
                    onSelect={() => handleServiceSelect(service.id)}
                    index={i}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {serviceId && showStep(2) && (
            <motion.div
              key="step-plan"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            >
              <StepHeader
                step={2}
                title="Choose your plan"
                subtitle="Fixed packages with hosting and support included — pick the tier that fits your scope."
                selectedLabel={selectedService?.title}
              />

              <div className={planGridClass}>
                {plans.map((plan, i) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    selected={planId === plan.id}
                    onSelect={() => setPlanId(plan.id)}
                    index={i}
                  />
                ))}
              </div>

              <ComparisonSection plans={plans} selectedPlan={planId} />
            </motion.div>
          )}
        </AnimatePresence>

        {!isMobile && serviceId && activeStep > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <SelectedPill
              label={selectedService?.title ?? ""}
              onEdit={() => {
                setServiceId(null);
                setPlanId(null);
                setMobileStep(1);
              }}
            />
          </motion.div>
        )}
      </motion.div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {showSticky &&
              serviceId &&
              planId &&
              activeEstimate &&
              selectedService &&
              selectedPlan && (
                <StickySummary
                  serviceTitle={selectedService.title}
                  packageName={selectedPlan.name}
                  priceFormatted={activeEstimate.priceFormatted}
                  timeline={activeEstimate.timeline}
                  hosting={activeEstimate.hosting}
                  support={activeEstimate.support}
                  estimateUrl={buildEstimateUrl(serviceId, planId)}
                  contactUrl={buildContactUrl(serviceId, planId)}
                />
              )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}

function StepHeader({
  step,
  title,
  subtitle,
  selectedLabel,
}: {
  step: number;
  title: string;
  subtitle: string;
  selectedLabel?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="mb-3 flex items-center gap-3">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-xl text-[13px] font-bold"
          style={{ background: "rgba(255,122,0,0.15)", color: PRIMARY }}
        >
          {step}
        </span>
        {selectedLabel && (
          <span
            className="rounded-full px-3 py-1 text-[11px] font-medium"
            style={{
              background: "rgba(255,122,0,0.1)",
              color: PRIMARY,
              border: "1px solid rgba(255,122,0,0.2)",
            }}
          >
            {selectedLabel}
          </span>
        )}
      </div>
      <h2 className="font-[family-name:var(--font-family-display)] text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-[#9CA3AF]">{subtitle}</p>
    </motion.div>
  );
}

function SelectedPill({ label, onEdit }: { label: string; onEdit: () => void }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onEdit}
      className="flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-medium text-white/70 transition-colors hover:text-white"
      style={{
        background: "rgba(18,18,18,0.8)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <MaterialIcon name="check_circle" className="!text-[14px]" style={{ color: SUCCESS }} />
      {label}
      <MaterialIcon name="edit" className="!text-[13px] text-[#9CA3AF]" />
    </motion.button>
  );
}
