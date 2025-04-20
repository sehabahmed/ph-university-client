import { TAcademicSemester } from "./academicManagement.type";

export type TSemesterRegistration = {
  _id: string;
  academicSemester: TAcademicSemester;
  status: string;
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
  createdAt: string;
  updatedAt: string;
};

export type PreRequisiteCourse = {
  course: string;
  isDeleted: boolean;
};
export type TCourses = {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted: boolean;
  preRequisiteCourses: PreRequisiteCourse[];
};
