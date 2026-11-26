import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { CROZIERICONS, Icon } from "@/components/icons";
import SideFormSheet from "@/components/common/SideFormSheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type {
  UpdateWorkerProfileRequest,
  UserProfile,
} from "@/features/profile/types/profile.types";
import { useUpdatePassword } from "@/features/profile/hooks/useUpdatePassword";
import { useUpdateProfile } from "@/features/profile/hooks/useUpdateProfile";
import { getErrorMessage } from "@/helpers/getErrorMessage";

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
  disabled = false,
}: {
  label: string;
  name: string;
  value?: string;
  type?: string;
  disabled?: boolean;
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
      disabled={disabled}
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
  const [errorMessage, setErrorMessage] = useState("");
  const updateProfile = useUpdateProfile();

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
    if (nextOpen) {
      setErrorMessage("");
      updateProfile.reset();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    const formElement = event.currentTarget;
    const data = new FormData(formElement);
    const secondaryPhoneNumber = String(data.get("secondaryPhoneNumber") ?? "").trim();
    const weddingAnniversary = String(data.get("weddingAnniversary") ?? "").trim();
    const body: UpdateWorkerProfileRequest = {
      firstName: String(data.get("firstName") ?? "").trim(),
      lastName: String(data.get("lastName") ?? "").trim(),
      phoneNumber: String(data.get("phoneNumber") ?? "").trim(),
      secondaryPhoneNumber: secondaryPhoneNumber || null,
      birthday: String(data.get("birthday") ?? "").trim(),
      weddingAnniversary: weddingAnniversary || null,
      gender: String(data.get("gender") ?? "").trim(),
      relationship: String(data.get("relationship") ?? "").trim(),
    };

    try {
      await updateProfile.mutateAsync(body);
      onOpenChange(false);
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Unable to update profile."));
    }
  };

  return (
    <SideFormSheet
      title="Edit profile"
      submitLabel="Save"
      open={open}
      onOpenChange={handleOpenChange}
      isSubmitting={updateProfile.isPending}
      onSubmit={handleSubmit}
    >
      <div>
        <Heading>General details</Heading>
        <div className="mt-2">
          <p className="text-sm text-crozier-text-placeholder">Profile photo</p>
          <div className="mt-2.5 flex items-center gap-4">
            {profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt=""
                className="size-14 rounded-full object-cover"
              />
            ) : (
              <span
                aria-hidden="true"
                className="grid size-14 place-items-center rounded-full
                  bg-crozier-surface-primary-tint text-base font-medium text-crozier-text-body"
              >
                {profile.firstName.charAt(0)}
                {profile.lastName.charAt(0)}
              </span>
            )}
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
          <Field label="Email address" name="email" value={profile.email} type="email" disabled />
        </div>
        <div
          className="mt-4 grid
  grid-cols-2 gap-5"
        >
          <Field label="Phone number *" name="phoneNumber" value={profile.phoneNumber ?? ""} />
          <Field
            label="Secondary phone number"
            name="secondaryPhoneNumber"
            value={profile.secondaryPhoneNumber ?? ""}
          />
        </div>
        <div className="mt-7">
          <Heading>Demographics</Heading>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-5">
          <Field label="Date of birth" name="birthday" value={profile.birthday ?? ""} type="date" />
          <Field
            label="Wedding anniversary"
            name="weddingAnniversary"
            value={profile.weddingAnniversary ?? ""}
            type="date"
          />
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
                value="Male"
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
                value="Female"
                defaultChecked={profile.gender === "Female"}
                className="mr-2 accent-crozier-text-accent"
              />
              Female
            </label>
          </div>
        </fieldset>
        <div className="mt-7">
          <Field label="Relationship *" name="relationship" value={profile.relationship ?? ""} />
        </div>
        {errorMessage && (
          <p role="alert" className="mt-4 text-sm text-crozier-text-error">
            {errorMessage}
          </p>
        )}
      </div>
    </SideFormSheet>
  );
};

const PasswordField = ({
  label,
  name,
  autoComplete,
  isNewPassword = false,
}: {
  label: string;
  name: string;
  autoComplete: "current-password" | "new-password";
  isNewPassword?: boolean;
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="grid gap-1.5">
      <Label htmlFor={name} className="text-sm font-normal text-crozier-text-placeholder">{label} *</Label>
      <div className="relative">
        <Input
          id={name}
          name={name}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          placeholder="Enter password"
          required
          minLength={isNewPassword ? 8 : undefined}
          maxLength={isNewPassword ? 25 : undefined}
          className="h-12.5 border-0 bg-crozier-surface-primary-tint pr-10 shadow-none"
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`}
          className="absolute top-1/2 right-3 grid size-6 -translate-y-1/2 place-items-center text-crozier-text-placeholder"
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </div>
  );
};

const isValidWorkerPassword = (password: string) =>
  password.length >= 8 &&
  password.length <= 25 &&
  /[a-z]/.test(password) &&
  /[A-Z]/.test(password) &&
  /\d/.test(password) &&
  /[@$!%*?&#\-+_()/\\]/.test(password);

export const UpdatePasswordSheet = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const updatePassword = useUpdatePassword();

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
    if (nextOpen) {
      setErrorMessage("");
      updatePassword.reset();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    const formElement = event.currentTarget;
    const data = new FormData(formElement);
    const password = String(data.get("oldPassword") ?? "");
    const newPassword = String(data.get("newPassword") ?? "");
    const confirmPassword = String(data.get("confirmPassword") ?? "");

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirmation do not match.");
      return;
    }

    if (!isValidWorkerPassword(newPassword)) {
      setErrorMessage(
        "New password must be 8–25 characters and include uppercase, lowercase, a number, and a supported special character.",
      );
      return;
    }

    try {
      await updatePassword.mutateAsync({ password, newPassword });
      formElement.reset();
      onOpenChange(false);
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Unable to update password."));
    }
  };

  return (
    <SideFormSheet
      title="Update password"
      submitLabel="Update password"
      open={open}
      onOpenChange={handleOpenChange}
      isSubmitting={updatePassword.isPending}
      onSubmit={handleSubmit}
    >
      <div>
        <Heading>Password details</Heading>
        <div className="mt-2">
          <PasswordField label="Old password" name="oldPassword" autoComplete="current-password" />
        </div>
        <div className="mt-4">
          <PasswordField label="New password" name="newPassword" autoComplete="new-password" isNewPassword />
        </div>
        <div className="mt-4">
          <PasswordField label="Confirm password" name="confirmPassword" autoComplete="new-password" isNewPassword />
        </div>
        {errorMessage && (
          <p role="alert" className="mt-4 text-sm text-crozier-text-error">
            {errorMessage}
          </p>
        )}
      </div>
    </SideFormSheet>
  );
};
