import { Eye } from "lucide-react";
import profileAvatar from "@/assets/dashboard/profile-avatar.png";
import { CROZIERICONS, Icon } from "@/components/icons";
import SideFormSheet from "@/components/common/SideFormSheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UserProfile } from "@/features/profile/types/profile.types";
import { useUpdatePassword } from "@/features/profile/hooks/useUpdatePassword";
import { useUpdateProfile } from "@/features/profile/hooks/useUpdateProfile";

const Heading = ({ children }: { children: string }) => (
  <div className="flex h-7 items-center gap-2 rounded-lg bg-crozier-surface-primary px-3 text-sm font-medium">
    <Icon type={CROZIERICONS.Hierarchy} size={12} className="text-crozier-text-accent" />
    {children}
  </div>
);
const Field = ({
  label,
  name,
  value,
  type = "text",
}: {
  label: string;
  name: string;
  value?: string;
  type?: string;
}) => (
  <div className="grid gap-1.5">
    <Label
      className="text-sm font-normal
  text-crozier-text-placeholder"
    >
      {label}
    </Label>
    <Input
      type={type}
      defaultValue={value}
      name={name}
      className="h-10.5 border-0 bg-crozier-surface-primary-tint shadow-none"
    />
  </div>
);

export const EditProfileSheet = ({
  profile,
  open,
  onOpenChange,
}: {
  profile: UserProfile;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const updateProfile = useUpdateProfile();

  return (
    <SideFormSheet
      title="Edit profile"
      submitLabel="Save"
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        updateProfile.mutate(
          {
            firstName: String(data.get("firstName") ?? profile.firstName),
            lastName: String(data.get("lastName") ?? profile.lastName),
            email: String(data.get("email") ?? profile.email),
            primaryPhone: String(data.get("primaryPhone") ?? profile.primaryPhone),
            secondaryPhone: String(data.get("secondaryPhone") ?? "") || null,
          },
          { onSuccess: () => onOpenChange(false) },
        );
      }}
    >
      <div>
        <Heading>General details</Heading>
        <div className="mt-2">
          <p className="text-sm text-crozier-text-placeholder">Profile photo</p>
          <div className="mt-2.5 flex items-center gap-4">
            <img src={profileAvatar} alt="" className="size-14 rounded-full object-cover" />
            <button type="button" className="rounded-lg border px-3 py-1 text-sm">
              Update
            </button>
          </div>
        </div>
        <div className="mt-3.5 grid grid-cols-2 gap-5">
          <Field label="First name *" name="firstName" value={profile.firstName} />
          <Field label="Last name *" name="lastName" value={profile.lastName} />
        </div>
        <div className="mt-4">
          <Field label="Email address *" name="email" value="tochiifeanyi@gmail.com" type="email" />
        </div>
        <div
          className="mt-4 grid
  grid-cols-2 gap-5"
        >
          <Field label="Phone number *" name="primaryPhone" value="🇳🇬 +234 81 0011 2345" />
          <Field
            label="Secondary phone number"
            name="secondaryPhone"
            value="🇳🇬 +234 81 0011 2345"
          />
        </div>
        <div className="mt-7">
          <Heading>Demographics</Heading>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-5">
          <Field label="Date of birth" name="dateOfBirth" type="date" />
          <Field label="Wedding anniversary" name="weddingAnniversary" type="date" />
        </div>
        <fieldset className="mt-4">
          <legend
            className="text-sm
  text-crozier-text-placeholder"
          >
            Gender *
          </legend>
          <div className="mt-4 flex gap-6">
            <label>
              <input
                type="radio"
                name="gender"
                defaultChecked={profile.gender === "Male"}
                className="mr-2
  accent-crozier-text-accent"
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                defaultChecked={profile.gender === "Female"}
                className="mr-2 accent-crozier-text-accent"
              />
              Female
            </label>
          </div>
        </fieldset>
        <div className="mt-7">
          <Field
            label="Relationship *"
            name="relationshipStatus"
            value={profile.relationshipStatus}
          />
        </div>
      </div>
    </SideFormSheet>
  );
};

const PasswordField = ({ label, name }: { label: string; name: string }) => (
  <div className="grid gap-1.5">
    <Label className="text-sm font-normal text-crozier-text-placeholder">{label} *</Label>
    <div className="relative">
      <Input
        name={name}
        type="password"
        placeholder="Enter password"
        className="h-12.5 border-0 bg-crozier-surface-primary-tint pr-10 shadow-none"
      />
      <Eye
        className="absolute top-1/2
  right-3 size-4 -translate-y-1/2 text-crozier-text-placeholder"
      />
    </div>
  </div>
);

export const UpdatePasswordSheet = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const updatePassword = useUpdatePassword();

  return (
    <SideFormSheet
      title="Update password"
      submitLabel="Update password"
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        updatePassword.mutate(
          {
            oldPassword: String(data.get("oldPassword") ?? ""),
            newPassword: String(data.get("newPassword") ?? ""),
            confirmPassword: String(data.get("confirmPassword") ?? ""),
          },
          { onSuccess: () => onOpenChange(false) },
        );
      }}
    >
      <div>
        <Heading>Password details</Heading>
        <div className="mt-2">
          <PasswordField label="Old password" name="oldPassword" />
        </div>
        <div className="mt-4">
          <PasswordField label="New password" name="newPassword" />
        </div>
        <div className="mt-4">
          <PasswordField label="Confirm password" name="confirmPassword" />
        </div>
      </div>
    </SideFormSheet>
  );
};
