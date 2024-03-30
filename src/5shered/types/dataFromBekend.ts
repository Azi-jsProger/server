export type TMangaFromBekend = {
    author?:{
        bio: string
        date_of_birth:string
        id:number
        name:string
    }
    category?:{
        id:number
        title:string
    }
    completed:boolean
    created_date:string
    description:string
    genre?:{
        description:string
        id:number
        name:string
    }
    id:number
    img:string
    title:string
    total_comments:number
    updated_date:string
    comments?:{ author:string,comment:string,like:number,disLike:number }[]
}