// Settings module.

export function getSettings() {
  const metric = document.getElementById("metric");
  const us = document.getElementById("us");
  const today = document.getElementById("today");
  const tomorrow = document.getElementById("tomorrow");
  const next7days = document.getElementById("next7days");
  const next15days = document.getElementById("next15days");

  const isChecked = [metric, us, today, tomorrow, next7days, next15days]
    .filter((setting) => setting.checked === true)
    .map((setting) => setting.id);

  const settings = {
    metric: metric.checked,
    us: us.checked,
    today: today.checked,
    tomorrow: tomorrow.checked,
    next7days: next7days.checked,
    next15days: next15days.checked,
  };

  return { checkedSettings: isChecked, allSettings: settings };
}

export function updateSettings(settings) {
  document.getElementById("metric").checked = settings.metric;
  document.getElementById("us").checked = settings.us;
  document.getElementById("today").checked = settings.today;
  document.getElementById("tomorrow").checked = settings.tomorrow;
  document.getElementById("next7days").checked = settings.next7days;
  document.getElementById("next15days").checked = settings.next15days;
}
