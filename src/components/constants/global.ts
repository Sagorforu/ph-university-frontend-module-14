export const monthNames = [
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

export const gender = ["Male", "Female", "Other"];
export const bloodGroup = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
export const designation = ["Admin"];
export const designationFaculty = ["Lecturer"];

export const monthOptions = monthNames.map((month) => ({
  value: month,
  label: month,
}));

export const genderOptions = gender.map((item) => ({
  value: item.toLowerCase(),
  label: item,
}));
export const bloodGroupOptions = bloodGroup.map((item) => ({
  value: item,
  label: item,
}));
export const designationOptions = designation.map((item) => ({
  value: item,
  label: item,
}));
export const designationFacultyOptions = designationFaculty.map((item) => ({
  value: item,
  label: item,
}));
