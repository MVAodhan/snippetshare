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

export function areStackDependenciesInDependencies(
  allDependencies: Array<string>,
  stackDependencies: Array<string>
) {
  let stackDependencyInDependencies: Array<boolean> = [];
  for (let i = 0; i <= stackDependencies.length; i++) {
    if (allDependencies.includes(stackDependencies[i])) {
      stackDependencyInDependencies = [...stackDependencyInDependencies, true];
    }
  }

  return stackDependencyInDependencies;
}
export function filterOutTechnologyDependencies(
  allDependencies: Array<string>,
  stackDependencies: Array<string>
) {
  return allDependencies.filter(
    (dependency) => !stackDependencies.includes(dependency)
  );
}
