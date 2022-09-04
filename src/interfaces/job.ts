type seniorityTypes = "entry" | "junior" | "intermediate" | "senior";
type jobTypes = "office" | "remote" | "hybrid";

export interface ISalaryRange {
  min: number;
  max: number;
}
export interface IJob {
  title: string;
  description: string;
  seniority: seniorityTypes;
  type: jobTypes;
  salaryRange: ISalaryRange;
  link: string;
  openingDate: Date;
  closingDate: Date;
  companyID: any;
}
