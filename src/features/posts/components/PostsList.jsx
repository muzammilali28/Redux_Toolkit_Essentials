import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from "../slice/postsSlice";
import { useEffect } from "react";

// import PostsAuthor from "./PostsAuthor";
// import TimeAgo from "./TimeAgo";
// import ReactionButtons from "./ReactionButtons";
import PostsDisplayed from "./PostsDisplayed";

const PostsList = () => {

    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    useEffect(() => {
        if (postsStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postsStatus, dispatch])

    let content;

    if (postsStatus === 'loading') {

        content = <p>Loading ...</p>
    }
    else if (postsStatus === 'succeeded') {

        const shallowCopyArray = posts.slice(); // If no Parameters are passed in slice, it creates the copy of the actualy array.
        const postsFetchedAscend = shallowCopyArray.sort((a, b) => b.date.localeCompare(a.date));

        content = postsFetchedAscend.map(
            (post) => (
                console.log(post),
                <PostsDisplayed key={post.id} post={post} />
            ))
    }
    else if (postsStatus === 'failed') {
        content = <p>{error}</p>
    }

    // const shallowCopyArray = posts.slice();  // This will create a same shallow copy of the array received from the slice, if no parameters are passed it will generate a copy of the exact same array.
    // const postsOrderAscend = shallowCopyArray.sort((a, b) => b.date.localeCompare(a.date));  // Sort that array in Ascending Order of Dates, so latest appears on top

    return (
        <section>
            <h2>Posts</h2>

            {content}

            {/* {  // We can use a variable to store the data or even React components that
                // need to be rendered here. Like I did above {content} this variable contain
                // different values on different conditions, even a React Node / Component as well.

                postsOrderAscend.map((post) => (
                    
                    <PostsExcerpt key={post.id} />
                    
                    // <article key={post.id}>
                    //     <h3>{post.title}</h3>
                    //     <p>{post.content.substring(0, 100)}</p>
                    //     <p className="postCredit">
                    //         <PostsAuthor userId={post.userId} />
                    //         <TimeAgo timestamp={post.date} />
                    //     </p>
                    //     <ReactionButtons post={post} />
                    // </article>
                ))
            } */}
        </section>
    )
}

export default PostsList