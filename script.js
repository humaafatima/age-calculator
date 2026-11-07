const dobInput = document.getElementById("dob");
const errorEl = document.getElementById("error");
const resultEl = document.getElementById("result");

// Block future dates in the picker
dobInput.max = new Date().toISOString().split("T")[0];

function calculateAge() {
  errorEl.textContent = "";
  resultEl.classList.remove("show");

  if (!dobInput.value) {
    errorEl.textContent = "Please select your date of birth.";
    return;
  }

  const birth = new Date(dobInput.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (birth > today) {
    errorEl.textContent = "Date of birth can't be in the future.";
    return;
  }

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  // Borrow days from the previous month if needed
  if (days < 0) {
    months--;
    const daysInPrevMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    days += daysInPrevMonth;
  }
  // Borrow months from the year if needed
  if (months < 0) {
    years--;
    months += 12;
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.floor((today - birth) / msPerDay);

  // Next birthday
  let next = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
  if (next < today) next.setFullYear(today.getFullYear() + 1);
  const daysToBirthday = Math.round((next - today) / msPerDay);

  document.getElementById("years").textContent = years;
  document.getElementById("months").textContent = months;
  document.getElementById("days").textContent = days;
  document.getElementById("totalDays").textContent = totalDays.toLocaleString();
  document.getElementById("nextBday").textContent =
    daysToBirthday === 0 ? "Today!" : daysToBirthday + " days";

  resultEl.classList.add("show");
}

document.getElementById("calcBtn").addEventListener("click", calculateAge);
dobInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") calculateAge();
});