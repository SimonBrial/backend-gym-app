import { InvoiceDaysCalculator } from "../interface/interface";
import { trainerPlan } from "../types/types";

const finalDayOfWeek = (dateInput: Date): Date => {
  const date = new Date(dateInput);
  const daysMonth:number = date.getDate();
  const finalDay: number = daysMonth + 7;
  date.setDate(finalDay);

  return date;
};

export const invoiceDaysCalculator = (
  plan: trainerPlan | string,
): string | InvoiceDaysCalculator => {
  // TODO: Get totally of days of the current month.
  // TODO: Get the current month and the next month.
  // TODO:-----------------------------------------
  // TODO: if the field plan is "Monthly", the last day variabel will be the last day of the current month.
  // TODO: if the field plan are "Weekly" || "Daily", the last day will be the current day or the current week.

  const dt: Date = new Date();
  /* formatter --> toLocaleDateString('es-ES', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }; */
  const currentMonth: number = dt.getMonth();
  const nextMonth: number = (currentMonth + 1) % 12;
  const currentYear: number = dt.getFullYear();

  const currentDay: number = dt.getDate();
  const daysOfMonth: Date = new Date(currentYear, nextMonth, 0);
  const totallyDayOfMonth: number = daysOfMonth.getDate();

  if (!plan) {
    return "Ingrese un tipo de plan";
  }

  if (plan === "monthly") {
    return {
      firstDay: new Date(
        currentYear,
        currentMonth,
        1,
      ) /*.toLocaleDateString('es-ES', options)*/,
      lastDay: new Date(currentYear, currentMonth, totallyDayOfMonth),
    };
  }

  if (plan === "weekly") {
    return {
      firstDay: new Date(currentYear, currentMonth),
      lastDay: finalDayOfWeek(new Date(currentYear, currentMonth, currentDay)),
    };
  }

  if (plan === "daily") {
    return {
      firstDay: new Date(currentYear, currentMonth, currentDay),
      lastDay: new Date(currentYear, currentMonth, currentDay),
    };
  }

  return "El tipo de plan no es válido.";
};
