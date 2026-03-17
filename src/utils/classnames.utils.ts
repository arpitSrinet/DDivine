/**
 * @file classnames.utils.ts
 * @description Utility for joining conditional class names without introducing a dependency.
 * @module src/utils/classnames
 */
type ClassInput = string | false | null | undefined | ClassInput[];

const flattenClassInputs = (inputs: readonly ClassInput[]): string[] =>
  inputs.flatMap((input) => {
    if (!input) {
      return [];
    }

    if (Array.isArray(input)) {
      return flattenClassInputs(input);
    }

    return [input];
  });

export const cn = (...inputs: ClassInput[]): string => flattenClassInputs(inputs).join(' ');
