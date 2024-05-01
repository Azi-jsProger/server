export type TManga = {
    manga4?:boolean;
    id?:number;
    _id?:string | number;
    photo?: string;
    name?: string;
    otherNames?: string[];
    status?: string;
    rating?: {
        total: number,
        people: number
    };
    like?: number;
    views?: number;
    tabs?: number;
    chapters?: number;
    tags?:[];
    category?: "Манга" | "Маньхуа" | "Манхва" | "Западный комикс" | "Рукомикс" | "Индонезийский комикс";
    description?: string;
    numberOfChapters?: number;
    data?: number;
    translator?: string[];
    author?: string;
    genres?: string[];
    comments?: { author:string,comment:string,like:number,disLike:number }[],
    chaptersLists?: [{translator:string,img:string[],like:number,data:string}] | [];
};
