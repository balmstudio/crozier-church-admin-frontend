import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditProfileSheet, UpdatePasswordSheet } from "@/features/profile/components/ProfileSheets";
import ProfileDetails from "@/features/profile/components/ProfileDetails";
import { useProfile } from "@/features/profile/hooks/useProfile";

const Profile = () => {
  const [panel, setPanel] = useState<"profile" | "password" | null>(null);
  const { data: profile, isLoading, isError } = useProfile();

  if (isLoading) return <div className="p-8">Loading profile...</div>;
  if (isError || !profile) return <div className="p-8">Unable to load profile.</div>;
  return (
    <div className="px-5 py-2 max-md:px-4">
      <div
        className="flex items-center
    justify-between"
      >
        <h1 className="text-base font-semibold text-crozier-text-body">Manage profile details</h1>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="outline"
                className="h-8.5 gap-2 rounded-[10px] border-crozier-text-accent px-5 text-sm text-crozier-text-action"
              />
            }
          >
            Edit
            <ChevronDown className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="h-20.5 w-28! min-w-28! space-y-1 rounded-[10px]
              bg-crozier-surface-white-black p-1.5"
          >
            <DropdownMenuItem
              className="h-8 justify-center rounded-[9px] border border-crozier-border-primary"
              onClick={() => setPanel("profile")}
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="h-8 justify-center rounded-[9px] border border-crozier-border-primary"
              onClick={() => setPanel("password")}
            >
              Password
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ProfileDetails profile={profile} />
      <EditProfileSheet
        profile={profile}
        open={panel === "profile"}
        onOpenChange={(open) => !open && setPanel(null)}
      />
      <UpdatePasswordSheet
        open={panel === "password"}
        onOpenChange={(open) => !open && setPanel(null)}
      />
    </div>
  );
};

export default Profile;
