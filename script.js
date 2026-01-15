const tgpaRows = document.getElementById("tgpa-rows");
const cgpaRows = document.getElementById("cgpa-rows");

const tgpaResult = document.querySelector("#tgpa-result .result-value");
const tgpaResultMeta = document.querySelector("#tgpa-result .result-meta");
const cgpaResult = document.querySelector("#cgpa-result .result-value");
const cgpaResultMeta = document.querySelector("#cgpa-result .result-meta");

const tgpaCreditsEl = document.getElementById("tgpa-credits");
const tgpaWeightedEl = document.getElementById("tgpa-weighted");
const cgpaCreditsEl = document.getElementById("cgpa-credits");
const cgpaWeightedEl = document.getElementById("cgpa-weighted");

const createRow = ({ label, credits, value }, type) => {
  const row = document.createElement("div");
  row.className = "table-row";

  row.innerHTML = `
    <input type="text" value="${label}" placeholder="${
      type === "tgpa" ? "Subject name" : "Semester name"
    }" />
    <input type="number" min="0" step="0.5" value="${credits}" placeholder="Credits" />
    <input type="number" min="0" step="0.1" value="${value}" placeholder="${
      type === "tgpa" ? "Grade point" : "SGPA"
    }" />
    <button type="button" aria-label="Remove row">✕</button>
  `;

  row.querySelector("button").addEventListener("click", () => row.remove());
  return row;
};

const seedRows = () => {
  [
    { label: "Mathematics", credits: 4, value: 9 },
    { label: "Programming Lab", credits: 2, value: 10 },
    { label: "Communication", credits: 3, value: 8.5 },
  ].forEach((row) => tgpaRows.appendChild(createRow(row, "tgpa")));

  [
    { label: "Semester 1", credits: 20, value: 8.6 },
    { label: "Semester 2", credits: 21, value: 8.9 },
  ].forEach((row) => cgpaRows.appendChild(createRow(row, "cgpa")));
};

const parseRows = (container) => {
  const rows = [...container.querySelectorAll(".table-row")];
  return rows.map((row) => {
    const inputs = row.querySelectorAll("input");
    return {
      label: inputs[0].value.trim(),
      credits: parseFloat(inputs[1].value),
      score: parseFloat(inputs[2].value),
    };
  });
};

const calculate = (rows) => {
  let totalCredits = 0;
  let weightedScore = 0;

  rows.forEach((row) => {
    if (!Number.isFinite(row.credits) || !Number.isFinite(row.score)) {
      return;
    }
    totalCredits += row.credits;
    weightedScore += row.credits * row.score;
  });

  const result = totalCredits > 0 ? weightedScore / totalCredits : 0;
  return { totalCredits, weightedScore, result };
};

const updateTgpa = () => {
  const rows = parseRows(tgpaRows);
  const { totalCredits, weightedScore, result } = calculate(rows);

  tgpaCreditsEl.textContent = totalCredits.toFixed(1);
  tgpaWeightedEl.textContent = weightedScore.toFixed(2);

  if (totalCredits === 0) {
    tgpaResult.textContent = "—";
    tgpaResultMeta.textContent = "Add credits and grade points to calculate.";
    return;
  }

  tgpaResult.textContent = result.toFixed(2);
  tgpaResultMeta.textContent = `Total credits: ${totalCredits.toFixed(
    1
  )} | Weighted score: ${weightedScore.toFixed(2)}`;
};

const updateCgpa = () => {
  const rows = parseRows(cgpaRows);
  const { totalCredits, weightedScore, result } = calculate(rows);

  cgpaCreditsEl.textContent = totalCredits.toFixed(1);
  cgpaWeightedEl.textContent = weightedScore.toFixed(2);

  if (totalCredits === 0) {
    cgpaResult.textContent = "—";
    cgpaResultMeta.textContent = "Add semesters and SGPA values to calculate.";
    return;
  }

  cgpaResult.textContent = result.toFixed(2);
  cgpaResultMeta.textContent = `Total credits: ${totalCredits.toFixed(
    1
  )} | Weighted score: ${weightedScore.toFixed(2)}`;
};

document.getElementById("add-subject").addEventListener("click", () => {
  tgpaRows.appendChild(
    createRow({ label: "", credits: "", value: "" }, "tgpa")
  );
});

document.getElementById("add-semester").addEventListener("click", () => {
  cgpaRows.appendChild(
    createRow({ label: "", credits: "", value: "" }, "cgpa")
  );
});

document.getElementById("calculate-tgpa").addEventListener("click", updateTgpa);
document.getElementById("calculate-cgpa").addEventListener("click", updateCgpa);

seedRows();
updateTgpa();
updateCgpa();
