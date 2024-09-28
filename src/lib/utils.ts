import { clsx, type ClassValue } from "clsx";
import { Octokit } from "octokit";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

let octokitInstance: InstanceType<typeof Octokit> | null = null;

// Helper type guard
export function isOctokitInstance(
  value: unknown
): value is InstanceType<typeof Octokit> {
  return value instanceof Octokit;
}
export function getOctokitInstance(
  token: string
): InstanceType<typeof Octokit> {
  if (!octokitInstance) {
    octokitInstance = new Octokit({
      baseUrl: "https://api.github.com",
      auth: token,
    });
  }
  return octokitInstance!;
}
