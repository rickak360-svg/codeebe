"use client";

import { useState } from "react";
import { HeroBriefTeaser } from "./HeroBriefTeaser";
import { HeroWizardBadges } from "./HeroWizardBadges";
import { ProjectBriefModal } from "./ProjectBriefModal";

type Props = {
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
};

export function HeroRequirementWizard({ open: openProp, onOpenChange }: Props = {}) {
  const [openInternal, setOpenInternal] = useState(false);
  const open = openProp ?? openInternal;
  const setOpen = onOpenChange ?? setOpenInternal;

  return (
    <>
      <div>
        <HeroBriefTeaser onOpenBrief={() => setOpen(true)} />
        <HeroWizardBadges />
      </div>
      <ProjectBriefModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
