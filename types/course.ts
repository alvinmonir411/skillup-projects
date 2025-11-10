
export interface CourseData {
  _id: { $oid: string } | string; 
  title: string;
  thumbnailUrl: string;
  category: string;
  level: string;
  durationHours: { $numberInt: string } | number;
  language: string;
  courseType: string;
  learningOutcomes: string;
  prerequisites: string;
  trailerUrl: string;
  status: string;
  isfetured: boolean;
  createdAt: { $date: { $numberLong: string } } | Date;
}

// Client side use-er jonno, jekhane shob kichu simple types hobe
export interface CourseFormData {
  _id: string;
  title: string;
  thumbnailUrl: string;
  category: string;
  level: string;
  durationHours: number;
  language: string;
  courseType: string;
  learningOutcomes: string;
  prerequisites: string;
  trailerUrl: string;
  status: string;
  isfetured: boolean;
}
