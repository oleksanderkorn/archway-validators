import BN from "bn.js";

const roundBalance = (amount: string) => {
  return formatTokenValue(amount);
};

export const isDefined = <T extends any>(
  something: T | undefined
): something is T => typeof something !== "undefined";

export const isNumber = (something: unknown): something is number =>
  typeof something === "number";

export const isString = (something: unknown): something is string =>
  typeof something === "string";

const NUMBER_SEPARATOR_REG_EXP = /\B(?=(\d{3})+(?!\d))/g;

export const formatTokenValue = (
  value: BN | number | string | undefined | null
) => {
  if (!isDefined(value) || value === null || Number.isNaN(value)) {
    return "-";
  }
  if (typeof value !== "string") {
    value = new BN(value || 0).divRound(new BN(1000000)).toString();
  }
  return value.replace(NUMBER_SEPARATOR_REG_EXP, " ");
};

export { roundBalance };
