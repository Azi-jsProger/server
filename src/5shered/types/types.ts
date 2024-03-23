import {TManga} from "./MangaTypes";

export interface IPropsForTManga extends TManga{
    oneManga: TManga | null
    desc?: boolean
}