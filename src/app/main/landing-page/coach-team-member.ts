export class CoachTeamMember {
  CoachId: number;
  CoachFirstName: string;
  CoachLastName: string;
  TeamMemberId: number;
  TeamMemberFirstName: string;
  TeamMemberLastName: string;
}

export class TeamMemberCoachModel {
  CoachId: number;
  TeamMemberId: number;
}
