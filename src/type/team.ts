export type GetTeamsType = {
    team_id : string;
    team_name: string;
    team_poster: string;
}

export type GetTeamType = GetTeamsType & {user_role : 'OWNER' | 'MEMBER' }

export type CreateTeamRequest = {
    team_name: string;
    team_desc: string;
    team_code : string;
    owner_id? : string;
}

export type CreateTeamResponse = {
    team_id : string;
    team_name : string;
    team_poster : string;
}

export type JoinTeamRequest = {
    team_code : string;
    user_id : string;
}

export type TeamRequest = {
    team_id : string;
    token : string;
}

export type SettingRequest = {
    permissionType : 'task' | 'file' | 'invite';
    value : boolean;
}