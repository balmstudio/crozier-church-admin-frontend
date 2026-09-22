export const settingsKeys = {
  all: ["settings"] as const,
  branch: () => [...settingsKeys.all, "branch"] as const,
};
