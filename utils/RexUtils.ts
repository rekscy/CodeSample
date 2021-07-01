// @ts-ignore
import hash from "string-hash-64";
import * as util from "util";
import RexLogger from "./RexLogger";
import { RexError, RexResponse } from "../core/RexTypes";

export type TimestampsDate = {
  secondsTimestamp: number;
  minutesTimestamp: number;
  hoursTimestamp: number;
  daysTimestamp: number;
};

export default {
  /**
   * Crée un nom avec la date du jour (utilisé pour les logs).
   */
  generateCurrentDateFileName() {
    const today = new Date();
    return `${today.getFullYear()}_${today.getMonth() + 1}_${today.getDate()}`;
  },

  /**
   * Hache une clé donnée.
   *
   * @param {string} key -  - Clé à hacher.
   */
  hashString(key: string): string {
    return hash(key);
  },

  /**
   * Génère un id au hasard.
   *
   * @param length
   */
  generateShortId(length?: number) {
    return `_${Math.random()
      .toString(36)
      .substr(2, length || 9)}`;
  },

  /**
   * Hache une clé donnée.
   *
   * @param {string} error -  - Message à logger.
   */
  logError(error: RexError | string) {
    console.error(error);
    if (error) {
      RexLogger.error(error.toString());
    }
  },

  debug(object: any) {
    console.log(util.inspect(object, { showHidden: false, depth: null }));
  },
  sleepAsync: (timeout: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  },
  parsePromiseAllErrors: (arrayOfPromiseResponses: RexResponse<any>[]) => {
    const errors = [];
    for (let i = 0; i < arrayOfPromiseResponses.length; i++) {
      const promiseResponse = arrayOfPromiseResponses[i];
      if (!promiseResponse.success) {
        errors.push(promiseResponse.error);
      }
    }
    return errors;
  },
  standardDeviation: (arr: number[], usePopulation: boolean = false) => {
    const mean =
      arr.reduce((acc: number, val: number) => acc + val, 0) / arr.length;
    return Math.sqrt(
      arr
        .reduce(
          (acc: number[], val: number) => acc.concat((val - mean) ** 2),
          []
        )
        .reduce((acc, val) => acc + val, 0) /
        (arr.length - (usePopulation ? 0 : 1))
    );
  }
};
