import type { ReactNode } from "react";
import CopyButton from "@/components/common/CopyButton";
import type { UserProfile } from "../types/profile.types";

interface DetailRow {
  label: string;
  value: ReactNode;
}

const ProfileDetails = ({ profile }: { profile: UserProfile }) => {
  const fullName = `${profile.firstName} ${profile.lastName}`;
  const rows: DetailRow[] = [
    { label: "Name", value: fullName },
    { label: "Gender", value: profile.gender ?? "Nil" },
    { label: "Email address", value: profile.email },
    { label: "Date of birth", value: profile.birthday ?? "Nil" },
    {
      label: "Primary phone number",
      value: profile.phoneNumber ? (
        <span className="flex items-center gap-2">
          🇳🇬 {profile.phoneNumber}
          <CopyButton value={profile.phoneNumber} label="Copy primary phone number" />
        </span>
      ) : (
        "Nil"
      ),
    },
    { label: "Relationship status", value: profile.relationship ?? "Nil" },
    { label: "Secondary phone number", value: profile.secondaryPhoneNumber ?? "Nil" },
    { label: "Wedding anniversary", value: profile.weddingAnniversary ?? "Nil" },
    { label: "Password", value: "********" },
  ];

  return (
    <>
      {profile.profileImage ? (
        <img
          src={profile.profileImage}
          alt=""
          className="mt-8.75 ml-6 size-16 rounded-full object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="mt-8.75 ml-6 grid size-16 place-items-center rounded-full
            bg-crozier-surface-primary-tint text-lg font-medium text-crozier-text-body"
        >
          {profile.firstName.charAt(0)}
          {profile.lastName.charAt(0)}
        </span>
      )}
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
