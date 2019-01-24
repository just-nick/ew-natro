import { HealthProgram } from './../health-program/health-program';
import { Footer } from './../footer/footer';
import { Reducer, AnyAction, ActionCreator } from "redux";
import { Service, ServiceLanding } from "../service/service";
import { ReDoAction, reDo } from "redux-re-do";
import { getApi, Predicates } from "prismic-javascript";
import { Home } from "../home/home";
import { Blog } from "../blog/blog";
import { News } from "../news/news";
import ApiSearchResponse from "prismic-javascript/d.ts/ApiSearchResponse";
import { About } from "../about/about";
import { Contact } from "../contact/contact";

export interface DataState {
    services?: Service[];
    serviceLanding?: ServiceLanding;
    home?: Home;
    blogs?: Blog[];
    news?: News[];
    about?: About;
    contact?: Contact;
    footer?: Footer;
    healthPrograms?: HealthProgram[];
}

export interface DataAction extends DataState {
    type: string;
}

export const DataLoaded = 'DataLoadedAction';
export const DataReducer: Reducer<DataState, AnyAction> = (state = {}, action) => {
    switch(action.type) {
        case DataLoaded:
            return {
                ...state,
                ...action
            }

        default:
            return state;
    }
};

export const GetData: ActionCreator<ReDoAction<DataAction, DataState>> = () => {
    return reDo((dispatch) => {
        function flatDispatchContent(dataType: string) {
            return (content: ApiSearchResponse) => {
                dispatch({
                    type: DataLoaded,
                    [dataType]: content.results.map((result) => ({ ...result, ...result.data }))
                });
            }
        }

        getApi("https://emmawisemannaturopathy.prismic.io/api/v2").then((api) => {
            api.getSingle('home').then((result) => {
                dispatch({
                    type: DataLoaded,
                    home: { ...result, ...result.data }
                })
            });
            
            api.getSingle('about').then((result) => {
                dispatch({
                    type: DataLoaded,
                    about: { ...result, ...result.data }
                })
            });
            
            api.getSingle('contact').then((result) => {
                dispatch({
                    type: DataLoaded,
                    contact: { ...result, ...result.data }
                })
            });
            
            api.getSingle('footer').then((result) => {
                dispatch({
                    type: DataLoaded,
                    footer: { ...result, ...result.data }
                })
            });
            
            api.getSingle('services_landing').then((result) => {
                dispatch({
                    type: DataLoaded,
                    serviceLanding: { ...result, ...result.data }
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

            api.query(
                Predicates.at('document.type', 'health_program'), {}
            ).then(flatDispatchContent('healthPrograms'));
        });
    });
}