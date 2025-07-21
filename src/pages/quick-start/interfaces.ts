import { ReactNode } from "react";

export interface IntegrationStep {
  title: string;
  content: ReactNode;
  pointer?: {
    filename: string;
    variableName: string;
    fileContent: string;
    range: string;
  };
}

export interface Integration {
  filenames: string[];
  files: Record<string, string>;
  steps: IntegrationStep[];
  stepIndex: number;
  embedLink: string;
  sourceCodeLink: string;
}

export interface DisplayChoice {
  key: string;
  displayName: string;
}

export interface IntegrationBuilder {
  displayName: string;

  options: Record<
    string,
    {
      displayName: string;
      default: string;
      type: "dropdown";
      choices: DisplayChoice[];
    }
  >;

  build(values: Record<string, string>, files: Record<string, any>, stepIndex: number): Integration;
}
