import { DateTime } from 'luxon';

export class Utils {
  /**
   * Format a luxon time value such as time.seconds.
   *
   * @param time
   */
  static formatTime(time: any): number {
    // toLocaleString is faster than new Intl.NumberFormat.
    // https://www.measurethat.net/Benchmarks/Show/8706/0/intlnumberformat-vs-tolocalstring
    return time.toLocaleString('en', { minimumIntegerDigits: 2 });
  }

  /**
   * Compare the given datetime with the current datetime utc+0.
   *
   * @param datetime must be ISO datetime format
   */
  static getElapsedMilliseconds(datetime: string): number {
    return DateTime.utc()
      .diff(DateTime.fromISO(datetime, { zone: 'utc' }))
      .toObject()
      .milliseconds as number; // milliseconds can return number | undefined, so we force number
  }
}
