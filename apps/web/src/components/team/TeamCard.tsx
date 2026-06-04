import Image from "next/image";
import type { TeamMember } from "@/lib/team";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="card-surface group flex flex-col overflow-hidden p-6 transition hover:border-[#ff6600]/40 hover:shadow-[0_0_30px_rgba(255,102,0,0.12)]">
      <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-[#3d1500]">
        {member.imageUrl ? (
          <Image
            src={member.imageUrl}
            alt={member.name}
            fill
            className="object-cover"
            sizes="112px"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-2xl font-bold text-[#ff6600]">
            {initials(member.name)}
          </span>
        )}
      </div>
      <h3 className="mt-5 text-center text-lg font-semibold text-white">{member.name}</h3>
      <p className="mt-1 text-center text-sm font-medium text-[#ff6600]">{member.role}</p>
      <p className="mt-3 flex-1 text-center text-sm leading-relaxed text-zinc-400">
        {member.bio}
      </p>
      {member.linkedInUrl && (
        <a
          href={member.linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-center text-sm font-medium text-zinc-300 transition hover:text-[#ff6600]"
        >
          LinkedIn →
        </a>
      )}
    </article>
  );
}
