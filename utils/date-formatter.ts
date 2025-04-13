/**
 * Date formatting utilities for the Kilimanjaro Training App
 */

// Format options for different date displays
type DateFormatOptions = {
  showYear?: boolean;
  showWeekday?: boolean;
  showTime?: boolean;
  shortMonth?: boolean;
  shortWeekday?: boolean;
};

/**
 * Format a date as a readable string
 * @param date The date to format
 * @param options Formatting options
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date,
  options: DateFormatOptions = {}
): string => {
  const {
    showYear = false,
    showWeekday = false,
    showTime = false,
    shortMonth = false,
    shortWeekday = false,
  } = options;

  // Date formatting
  const day = date.getDate();

  // Month formatting
  const monthNames = shortMonth
    ? [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]
    : [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
  const month = monthNames[date.getMonth()];

  // Year (only if requested)
  const year = showYear ? `, ${date.getFullYear()}` : "";

  // Weekday (only if requested)
  const weekdayNames = shortWeekday
    ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    : [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
  const weekday = showWeekday ? `${weekdayNames[date.getDay()]}, ` : "";

  // Time (only if requested)
  let timeStr = "";
  if (showTime) {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12; // Convert 0 to 12 for 12 AM
    timeStr = ` at ${hour12}:${minutes} ${ampm}`;
  }

  return `${weekday}${month} ${day}${year}${timeStr}`;
};

/**
 * Format a date range as a string (e.g. "April 1-7, 2025")
 * @param startDate Start date
 * @param endDate End date
 * @param showYear Whether to show the year
 * @returns Formatted date range string
 */
export const formatDateRange = (
  startDate: Date,
  endDate: Date,
  showYear = true
): string => {
  const startMonth = startDate.getMonth();
  const endMonth = endDate.getMonth();
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const year = showYear ? `, ${startDate.getFullYear()}` : "";

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Same month: "April 1-7, 2025"
  if (startMonth === endMonth) {
    return `${monthNames[startMonth]} ${startDay}-${endDay}${year}`;
  }

  // Different months: "April 29-May 5, 2025"
  return `${monthNames[startMonth]} ${startDay}-${monthNames[endMonth]} ${endDay}${year}`;
};

/**
 * Format a duration in seconds to a readable string (e.g. "1h 30m" or "45s")
 * @param seconds Duration in seconds
 * @param options Display options
 * @returns Formatted duration string
 */
export const formatDuration = (
  seconds: number,
  options: { showSeconds?: boolean } = {}
): string => {
  const { showSeconds = true } = options;

  if (seconds < 60 && showSeconds) {
    return `${seconds}s`;
  }

  const minutes = Math.floor(seconds / 60) % 60;
  const hours = Math.floor(seconds / 3600);

  if (hours === 0) {
    return `${minutes}m`;
  }

  return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
};

/**
 * Calculate days remaining until a target date
 * @param targetDate The target date
 * @returns Days remaining (0 if in past)
 */
export const getDaysRemaining = (targetDate: Date): number => {
  const now = new Date();
  const diffTime = targetDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};

/**
 * Format time remaining until a target date
 * @param targetDate The target date
 * @returns Object with days, hours, minutes and seconds remaining
 */
export const getTimeRemaining = (
  targetDate: Date
): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
} => {
  const total = targetDate.getTime() - new Date().getTime();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    days: Math.max(0, days),
    hours: Math.max(0, hours),
    minutes: Math.max(0, minutes),
    seconds: Math.max(0, seconds),
    totalSeconds: Math.max(0, Math.floor(total / 1000)),
  };
};
