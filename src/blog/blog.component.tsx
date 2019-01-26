import React from "react";
import { connect, DispatchProp } from "react-redux";
import { RouteComponentProps, Redirect, Link } from "react-router-dom";
import { writeText } from "../common/content";
import { LoaderComponent } from "../loader/loader.component";
import { DataState } from "../common/reducer";
import { PageHeroComponent } from "../page-hero/page-hero.component";
import { Blog } from "./blog";
import { SharePanelComponent } from "../share-panel/share-panel.component";

const Component: React.StatelessComponent<DataState & DispatchProp & RouteComponentProps<any>> = (props) => {
    if (props.blogs) {
        const blog = getBlog(props.match.params.id, props.blogs);

        if (blog) {
            const similar = props.blogs
                .filter((b) => (
                    b.category === blog.category
                    && b.id !== blog.id
                ))
                .slice(0, 4);
            console.log('similar', similar);

            return <section className="container">

                <PageHeroComponent heading={blog.title} image={blog.feature_image.url} />

                <h2>{blog.title}</h2>

                {writeText(blog.body)}

                <SharePanelComponent title={blog.title} />

                { similar && similar.length > 0 ? <>
                    <h2>Similar Blog Posts</h2>

                    <div className="similar-blogs">
                        {similar.map((similarBlog, i) => 
                            <Link to={`/blog/${similarBlog.id}`} key={i} style={{backgroundImage: `url('${similarBlog.thumbnail.url}')`}}>
                                <span>
                                    <strong>{similarBlog.category}:</strong>
                                    {similarBlog.title}
                                </span>
                            </Link>
                        )}
                    </div>
                </> : null }
            </section>;
        }

        return <Redirect to="/blogs" />;
    }

    return <LoaderComponent />
}

function getBlog(id: string, blogs: Blog[]): Blog | null {
    for (const blog of blogs) {
        if (blog.id === id) {
            return blog;
        }
    }

    return null;
}

export const BlogComponent = connect<DataState, RouteComponentProps, DataState>((state) => state)(Component);