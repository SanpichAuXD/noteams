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


export type TeamData = CreateTeamRequest & {
    team_poster : string;
}

export type TeamSetting = {
    allow_task : boolean;
    allow_file : boolean;
    allow_invite : boolean;

}

export type GetSettingResponse = TeamData & TeamSetting;


export type TeamFile = {
    file_id : string;
    file_name : string;
    file_url : string;
    username : string;
    created_at : string;
}