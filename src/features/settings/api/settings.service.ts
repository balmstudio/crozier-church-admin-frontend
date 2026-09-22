import { branchContact } from "../data/branch.mock";
import type { BranchContact } from "../types/branch.types";

export const getBranchSettings = async (): Promise<BranchContact> => branchContact;
