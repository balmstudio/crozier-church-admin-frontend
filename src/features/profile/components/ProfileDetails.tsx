import type { ReactNode } from "react";
import CopyButton from "@/components/common/CopyButton";
import profileAvatar from "@/assets/dashboard/profile-avatar.png";
import type { UserProfile } from "../types/profile.types";

interface DetailRow {
  label: string;
  value: ReactNode;
}

const ProfileDetails = ({ profile }: { profile: UserProfile }) => {
  const fullName = `${profile.firstName} ${profile.lastName}`;
  const rows: DetailRow[] = [
    { label: "Name", value: fullName },
    { label: "Gender", value: profile.gender },
    { label: "Email address", value: profile.email },
    { label: "Date of birth", value: profile.dateOfBirth },
    {
      label: "Primary phone number",
      value: (
        <span className="flex items-center gap-2">
          🇳🇬 {profile.primaryPhone}
          <CopyButton value={profile.primaryPhone} label="Copy primary phone number" />
        </span>
      ),
    },
    { label: "Relationship status", value: profile.relationshipStatus },
    { label: "Secondary phone number", value: profile.secondaryPhone ?? "Nil" },
    { label: "Wedding anniversary", value: profile.weddingAnniversary ?? "Nil" },
    { label: "Password", value: "********" },
  ];

  return (
    <>
      <img src={profileAvatar} alt="" className="mt-8.75 ml-6 size-16 rounded-full object-cover" />
      <dl
        className="mt-13.5 ml-6 grid max-w-[1007px] grid-cols-1 gap-x-[87px] gap-y-12.5
          text-sm text-crozier-text-body md:grid-cols-2"
      >
        {rows.map(({ label, value }) => (
          <div key={label} className="grid grid-cols-[200px_1fr] gap-5">
            <dt className="text-crozier-text-body-light">{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </>
  );
};

export default ProfileDetails;
