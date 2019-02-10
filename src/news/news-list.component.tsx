import React from "react";
import { connect, DispatchProp } from "react-redux";
import { LoaderComponent } from "../loader/loader.component";
import { DataState } from "../common/reducer";
import { Link } from "react-router-dom";
import './news.scss';

const Component: React.StatelessComponent<DataState & DispatchProp> = (props) => {
    if (props.news) {
        return <div className="container news">

            <h2>The Latest News</h2>

            {props.news.map((news, i) => {
                return (
                    <div className="block-item" key={i}>
                        <div className="feature" style={{backgroundImage: `url('${news.feature_image.url}')`}}></div>
                        <div className="content">
                            <div>
                                <h2>{news.title}</h2>
                                <p>{news.summary}</p>
                            </div>
                            <Link to={`/news/${news.id}`}>More Info</Link>
                        </div>
                    </div>
                );
            })}
        </div>
    }

    return <LoaderComponent />
}

export const NewsListComponent = connect<DataState, {}, {}, DataState>((state) => state)(Component);
