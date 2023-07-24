export const highlightMonthly = () => {
  const reportLimitDateElements = document.querySelectorAll(".report_limit_date");
  const reportLimitDates = [...reportLimitDateElements].flatMap((element) => {
    const dateMatch = element.textContent.match(/(\d+)\/(\d+)/);

    if (!dateMatch) {
      return [];
    }

    return [{
      element,
      month: Number(dateMatch[1])
    }];
  });

  const reportLimitMonths = [...new Set(
    reportLimitDates.map(({ month }) => month)
  )];

  reportLimitMonths.sort((a, b) => a - b);

  const reportLimitMonthTypes = reportLimitMonths.length;

  const monthColors = reportLimitMonths.map((month, index) => ({
    month,
    color: `hsl(${360 / reportLimitMonthTypes * index}deg, 100%, 93%)`
  }));

  for (const date of reportLimitDates) {
    const { color } = monthColors.find(({ month }) => month === date.month);
    date.element.style.backgroundColor = color;
  }
};
