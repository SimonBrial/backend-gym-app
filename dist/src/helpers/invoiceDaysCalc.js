"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoiceDaysCalculator = void 0;
const finalDayOfWeek = (dateInput) => {
    const date = new Date(dateInput);
    const daysMonth = date.getDate();
    const finalDay = daysMonth + 7;
    date.setDate(finalDay);
    return date;
};
const invoiceDaysCalculator = (plan) => {
    // TODO: Get totally of days of the current month.
    // TODO: Get the current month and the next month.
    // TODO:-----------------------------------------
    // TODO: if the field plan is "Monthly", the last day variabel will be the last day of the current month.
    // TODO: if the field plan are "Weekly" || "Daily", the last day will be the current day or the current week.
    const dt = new Date();
    /* formatter --> toLocaleDateString('es-ES', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }; */
    const currentMonth = dt.getMonth();
    const nextMonth = (currentMonth + 1) % 12;
    const currentYear = dt.getFullYear();
    const currentDay = dt.getDate();
    const daysOfMonth = new Date(currentYear, nextMonth, 0);
    const totallyDayOfMonth = daysOfMonth.getDate();
    if (!plan) {
        return "Ingrese un tipo de plan";
    }
    if (plan === "monthly") {
        return {
            firstDay: new Date(currentYear, currentMonth, 1) /*.toLocaleDateString('es-ES', options)*/,
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
exports.invoiceDaysCalculator = invoiceDaysCalculator;
//# sourceMappingURL=invoiceDaysCalc.js.map