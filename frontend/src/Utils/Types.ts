export interface MemberTypes {
  type: string;
  userId: number;
}

export interface RootObject {
  user: number;
  mother: string;
  father: string;
  cousins: string[];
  siblings: string[];
  aunts: string[];
  uncles: string[];
  grandparents: string[];
}

export interface StateType {
  id: number;
  name: string;
  side: string;
  spouse: string;
  user: number;
}

export interface GrandParentType {
  id: number;
  name: string;
  side: string;
  GType: string;
  user: number;
}

export interface names {
  p_gfather: string;
  p_gmother: string;
  m_gfather: string;
  m_gmother: string;
  p_uncle: string;
  p_aunt: string;
  father: string;
  mother: string;
  m_uncle: string;
  m_aunt: string;
  cousins: Array<string>;
}
