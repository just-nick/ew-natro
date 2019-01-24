import { News } from "../news/news";

export interface Event extends News {
    date: string;
    time: string;
}
