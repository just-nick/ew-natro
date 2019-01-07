import { Reducer, AnyAction, ActionCreator } from "redux";
import { Service } from "./service";
import { ReDoAction, reDo } from "redux-re-do";
import { getApi, Predicates } from "prismic-javascript";
import { Home } from "../home/home";
import { Blog } from "../blog/blog";
import { News } from "../news/news";
import ApiSearchResponse from "prismic-javascript/d.ts/ApiSearchResponse";

export interface DataState {
    services?: Service[];
    home?: Home;
    blogs?: Blog[];
    news?: News[];
}

export interface DataAction extends DataState {
    type: string;
}

export const ServiceLoaded = 'ServiceLoaded';
export const ServiceReducer: Reducer<DataState, AnyAction> = (state = {}, action) => {
    switch(action.type) {
        case ServiceLoaded:
            console.log('Got', action);
            return {
                ...state,
                ...action
            }

        default:
            return state;
    }
};

export const GetServices: ActionCreator<ReDoAction<DataAction, DataState>> = () => {
    return reDo((dispatch) => {
        function flatDispatchContent(dataType: string) {
            return (content: ApiSearchResponse) => {
                console.log('Got:', dataType, content);
                dispatch({
                    type: ServiceLoaded,
                    [dataType]: content.results.map((result) => ({ ...result, ...result.data }))
                });
            }
        }

        getApi("https://emmawisemannaturopathy.prismic.io/api/v2").then((api) => {
            api.getSingle('home').then((result) => {
                dispatch({
                    type: ServiceLoaded,
                    home: { ...result, ...result.data }
                })
            });

            api.query(
                Predicates.at('document.type', 'blog_post'), {}
            ).then(flatDispatchContent('blogs'));

            api.query(
                Predicates.at('document.type', 'service'), {}
            ).then(flatDispatchContent('services'));

            api.query(
                Predicates.at('document.type', 'news_item'), {}
            ).then(flatDispatchContent('news'));
        });
    });
}