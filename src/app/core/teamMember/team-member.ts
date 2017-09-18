export interface TeamMember {
  TeamMemberId: number;
  UserName: string;
  FirstName: string;
  LastName: string;
  LastFirstName: string;
  IsAccountDirector: boolean;
  IsManager: boolean;
  IndustryTeams: string[];
  IsShareHolder: boolean;
  IsChargable: boolean;
  IsCoach: boolean;
  IsShareHolderCoach: boolean;
  IsGreenBay: boolean;
  IsShareholderGoalEdit: boolean;
  IndustryTeam1: number;
  IndustryTeam2: number;
  IndustryTeam3: number;
  IndustryTeam4: number;
  StaffTypeId: number;
}
