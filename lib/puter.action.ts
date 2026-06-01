import puter from "@heyputer/puter.js";
import {
  getOrCreateHostingConfig,
  uploadImageToHosting,
} from "./puter.hosting";
import { isHostedUrl } from "./utils";
import { PUTER_WORKER_URL } from "./constants";

export const signIn = async () => await puter.auth.signIn();

export const signOut = () => puter.auth.signOut();

export const getCurrentUser = async () => {
  try {
    return await puter.auth.getUser();
  } catch {
    return null;
  }
};

export const createProject = async ({
  item,
  visibility = "private",
}: CreateProjectParams): Promise<DesignItem | null | undefined> => {
  if (!PUTER_WORKER_URL) {
    console.warn("Missing VITE_PUTER_WORKER_URL; skip history fetch");
    return null;
  }
  const projectId = item.id;

  const hosting = await getOrCreateHostingConfig();
  const hostedSource = projectId
    ? await uploadImageToHosting({
        hosting,
        url: item.sourceImage,
        projectId,
        label: "source",
      })
    : null;
  const hostedRender =
    projectId && item.renderedImage
      ? await uploadImageToHosting({
          hosting,
          url: item.renderedImage,
          projectId,
          label: "rendered",
        })
      : null;

  const reslovedSource =
    hostedSource?.url ||
    (isHostedUrl(item.sourceImage) ? item.sourceImage : "");

  if (!reslovedSource) {
    console.warn("Failed to host source image, skipping save.");
    return null;
  }

  const resolvedRender = hostedRender?.url
    ? hostedRender.url
    : item.renderedImage && isHostedUrl(item.renderedImage)
      ? item.renderedImage
      : undefined;

  const {
    sourcePath: _sourcePath,
    renderedPath: _renderedPath,
    publicPath: _publicPath,
    ...rest
  } = item;

  const payload = {
    ...rest,
    sourceImage: reslovedSource,
    renderedImage: resolvedRender,
  };

  try {
    const response = await puter.workers.exec(
      `${PUTER_WORKER_URL}/api/projects/save`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project: payload,
          visibility,
        }),
      },
    );

    if (!response.ok) {
      console.error(`Failed to save the project`, await response.text());
      return null;
    }

    const data = (await response.json()) as { project?: DesignItem | null };
    return data?.project ?? null;
  } catch (e) {
    console.error(`Failed to save project: ${e}`);
    return null;
  }
};

export const getProjects = async () => {
  if (!PUTER_WORKER_URL) {
    console.warn("Missing VITE_PUTER_WORKER_URL; skip history fetch");
    return [];
  }

  try {
    const response = await puter.workers.exec(
      `${PUTER_WORKER_URL}/api/projects/list`,
      { method: "GET" },
    );
    if (!response.ok) {
      console.error(`Failed to fetch history`, await response.text());
      return [];
    }
    const data = (await response.json()) as { projects?: DesignItem[] | null };
    return Array.isArray(data?.projects) ? data?.projects : [];
  } catch (e) {
    console.error(`Failed to get projects: ${e}`);
  }
};

export const getProjectById = async ({ id }: { id: string }) => {
  if (!PUTER_WORKER_URL) {
    console.warn("Missing VITE_PUTER_WORKER_URL; skipping project fetch.");
    return null;
  }

  try {
    const response = await puter.workers.exec(
      `${PUTER_WORKER_URL}/api/projects/get?id=${encodeURIComponent(id)}`,
      { method: "GET" },
    );

    if (!response.ok) {
      console.error("Failed to fetch project:", await response.text());
      return null;
    }

    const data = (await response.json()) as {
      project?: DesignItem | null;
    };

    return data?.project ?? null;
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return null;
  }
};

export const deleteProject = async (id: string): Promise<boolean> => {
  if (!PUTER_WORKER_URL) return false;

  try {
    const response = await puter.workers.exec(
      `${PUTER_WORKER_URL}/api/projects/delete?id=${encodeURIComponent(id)}`,
      {
        method: "POST",
      },
    );

    if (!response.ok) {
      console.error("Failed to delete project:", await response.text());
      return false;
    }

    const data = (await response.json()) as { success?: boolean };
    return data?.success ?? false;
  } catch (e) {
    console.error("Delete action failed:", e);
    return false;
  }
};

export const updateProject = async (
  id: string,
  updates: Partial<DesignItem>,
) => {
  if (!PUTER_WORKER_URL) {
    console.warn("Missing VITE_PUTER_WORKER_URL; skipping update.");
    return false;
  }
  try {
    const response = await puter.workers.exec(
      `${PUTER_WORKER_URL}/api/projects/update`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, updates }),
      },
    );
    return response.ok;
  } catch (e) {
    console.error("Update failed:", e);
    return false;
  }
};
