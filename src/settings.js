// Settings module.

// export function toggleUnits(targetEl) {
//   const metric = document.getElementById("metric");
//   const us = document.getElementById("us");
// if (targetEl.checked) u
//   metric.checked = !metric.checked;
//   us.checked = !us.checked;
// }

export function getSettings() {
  const metric = document.getElementById("metric").checked;
  const us = document.getElementById("us").checked;
  const today = document.getElementById("today").checked;
  const tomorrow = document.getElementById("tomorrow").checked;
  const next7days = document.getElementById("next7days").checked;
  const next15days = document.getElementById("next15days").checked;

  const settings = {
    metric: metric,
    us: us,
    today: today,
    tomorrow: tomorrow,
    next7days: next7days,
    next15days: next15days,
  };
  return settings;
}

export function setSettings(settings) {
  document.getElementById("metric").checked = settings.metric;
  document.getElementById("us").checked = settings.us;
  document.getElementById("today").checked = settings.today;
  document.getElementById("tomorrow").checked = settings.tomorrow;
  document.getElementById("next7days").checked = settings.next7days;
  document.getElementById("next15days").checked = settings.next15days;
}
