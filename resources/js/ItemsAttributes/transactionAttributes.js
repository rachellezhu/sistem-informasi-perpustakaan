export const items = [
  { name: "Semua", route: route("transaction") },
  {
    name: "30 Hari Terakhir",
    route: `${route("transaction")}?filter=30HariTerakhir`,
  },
  { name: "Terlambat", route: `${route("transaction")}?filter=terlambat` },
  {
    name: "Selesai Besok",
    route: `${route("transaction")}?filter=dikembalikanBesok`,
  },
  {
    name: "TA",
    route: `${route("transaction")}?filter=${getAcademicYear()}`,
  },
];

function getAcademicYear() {
  const now = new Date();
  const year = now.getFullYear();
  const from = new Date(`${year}-06-16`);
  const to = new Date(`${year}-06-15`);

  let academicYear = `${year.toString()}-${(year + 1).toString()}`;

  if (now < to) {
    academicYear = `${(year - 1).toString()}-${year.toString()}`;
  } else if (now > from) {
    academicYear = `${year.toString()}-${(year + 1).toString()}`;
  }

  return academicYear;
}
