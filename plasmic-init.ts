import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import { HelloWorld } from "./components/HelloWorld";
import { Collapse } from "./components/Collapse";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "eEGjanx6KZrenFTSRqx9hn", // ID of a project you are using
      token:
        "kE2zDG6f2lxjl3RQEr5AD1QO6douxQJMJi7kqo8c463rXFvSnw9NBvn2zWo3fdeSmdTSVHbqLpH38Eg", // API token for that project
    },
  ],
  // Fetches the latest revisions, whether or not they were unpublished!
  // Disable for production to ensure you render only published changes.
  preview: true,
});

PLASMIC.registerComponent(HelloWorld, {
  name: "HelloWorld",
  props: {
    verbose: "boolean",
    children: "slot",
  },
});

PLASMIC.registerComponent(Collapse, {
  name: "Collapse",
  props: {
    header: {
      type: "slot",
      defaultValue: "This is the Collapse header.",
    },
    children: {
      type: "slot",
      defaultValue: "This is the Collapse children.",
    },
    previewOpen: {
      type: "boolean",
      description: "Force the Collapse to be open when in editing mode.",
    },
  },
});
