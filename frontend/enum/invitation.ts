

export enum InvitationGroups {
    AI_MANAGER = 'AI Manager',
    AI_DEVELOPER = 'AI Developer',
    AI_AUDITOR_INTERNAL = 'AI Auditor Internal',
    AI_AUDITOR_EXTERNAL = 'AI Auditor External',
}

export const enumIdMap: Record<InvitationGroups, number> = {
    [InvitationGroups.AI_MANAGER]: 3,
    [InvitationGroups.AI_DEVELOPER]: 4,
    [InvitationGroups.AI_AUDITOR_INTERNAL]: 5,
    [InvitationGroups.AI_AUDITOR_EXTERNAL]: 6,
  };
