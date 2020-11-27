export interface IApiStation {
    name: string;
    display_name: string;
    page_url: string;
    stream_url: string;
    format: string;
    description: string;
    djs: string;
    location: string;
    lat: number;
    lng: number;
    color: string;
    updated_at: string;
    genres: string[];
    active: boolean;
    third_parties?: IApiThirdPartyInfo
    images: IApiImages,
    current_playlist: IApiPlaylist;
    next_playlists?: IApiPlaylist;
    top_artists: string[];
    position: number;
}

export interface IApiArtist {
    name: string;
    laut_id?: number;
    url?: string;
    laut_url?: string;
    image?: string;
    thumb?: string;
}

interface IApiSong {
    id: number;
    'type': string;
    title: string;
    album?: string;
    length: number;
    genre?: string;
    releaseyear?: number;
    created_at: string;
    starts_at: string;
    ends_at: string
    artist?: {
        name: string;
    };
}

export type IApiCurrentSong = IApiSong

export type IApiLastSongs = IApiSong[]

export interface IApiImages {
    station?: string;
    station_80x80?: string;
    station_120x120?: string;
    station_640x640?: string;
    background?: string;
    background_1024x768?: string;
    background_768x1024?: string;
    website?: string;
    website_640x640?: string;
}

export interface IApiThirdPartyInfo {
    amazon?: {
        skill_name?: string;
        invocation_name?: string;
    };
    facebook?: {
        page?: string;
    };
    twitter?: {
        name?: string;
        url?: string;
    };
    website?: {
        url?: string;
    };
    phonostar?: {
        url?: string;
    };
    radiode?: {
        url?: string;
    };
}

interface IPlaylistSlot {
    day: string,
    hour: number,
    end_time: number,
}

interface IPlaylistBase {
    id: number;
    name: string;
    description?: string;
    color: string;
    length: number;
}

export interface IApiScheduleItem extends IPlaylistBase {
    airtimes: IPlaylistSlot[];
}

export interface IApiPlaylist extends IPlaylistBase, IPlaylistSlot {
    shuffled: boolean
}

export interface IApiGenre {
    name: string;
    score: number;
    related: string[];
}
