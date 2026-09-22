export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  primaryPhone: string;
  secondaryPhone: string | null;
  gender: "Male" | "Female";
  dateOfBirth: string;
  dateOfBirthISO: string;
  relationshipStatus: string;
  weddingAnniversary: string | null;
}
