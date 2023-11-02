export type Role =
  | "ADMMIN"
  | "SPECIALIST"
  | "RESIDENT"
  | "NURSE"
  | "RECEPTIONIST";

export type RoleType = {
  ADMIN: "관리자";
  SPECIALIST: "전문의";
  RESIDENT: "전공의";
  NURSE: "간호사";
  RECEPTIONIST: "응급구조사";
};
