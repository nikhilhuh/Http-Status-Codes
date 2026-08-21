export type StatusCategory =
  | 'informational'
  | 'success'
  | 'redirection'
  | 'client-error'
  | 'server-error';

export interface StatusCode {
  code: number;
  name: string;
  category: StatusCategory;
  description: string;
  whenToUse: string[];
  whenNotToUse: string[];
  exampleScenario: string;
  developerMessage: string;
  productionMessage: string;
  responseExample?: string;
  hasBody: boolean;
  common: boolean;
  deprecated?: boolean;
  notes?: string[];
  relatedCodes?: number[];
}

export interface Scenario {
  id: string;
  question: string;
  answerCode: number;
  explanation: string;
  wrongOptions: {
    code: number;
    why: string;
  }[];
}

export interface Comparison {
  id: string;
  title: string;
  codes: number[];
  description: string;
  differences: {
    code: number;
    meaning: string;
  }[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: number[];
  correctCode: number;
  explanation: string;
}
