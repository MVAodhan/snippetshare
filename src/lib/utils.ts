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

/**
 * if (res?.data?.payload) {
      const json = JSON.parse(res?.data?.payload);
      const deps = Object.keys(json.dependencies);

      let namespaceDependencies = [] as Array<string>;
      let nonNamespaceDependencies = [] as Array<string>;

      for (const dependency of deps) {
        if (dependency.startsWith("@")) {
          const paths = dependency.split("/");
          namespaceDependencies = [
            ...namespaceDependencies,
            paths[0].split("@")[1],
          ];
        } else {
          nonNamespaceDependencies = [...nonNamespaceDependencies, dependency];
        }
      }

      let noTypesDependecies: Array<string> = [];
      for (const dependency of namespaceDependencies) {
        if (dependency !== "types") {
          noTypesDependecies = [...noTypesDependecies, dependency];
        }
      }

      const allDependencies = [
        ...nonNamespaceDependencies,
        ...noTypesDependecies,
      ];

      const technology = {
        name: "tailwind",
        dependencies: ["tailwindcss", "postcss", "autoprefixer"],
      };

      let finalDependencies: Array<string> = [];
      const stackDependencyInDependencies = areStackDependenciesInDependencies(
        allDependencies,
        technology.dependencies
      );

      if (stackDependencyInDependencies.every((dep) => dep === true)) {
        finalDependencies = filterOutTechnologyDependencies(
          allDependencies,
          technology.dependencies
        );
        finalDependencies.push(technology.name);
      }
      const savedRepo = await saveRepoAction({
        userId: clerkUser?.id as string,
        name: repoName,
        dependencies: finalDependencies!,
        owner: repoOwner,
      });

      console.log(savedRepo);
    }
 */
