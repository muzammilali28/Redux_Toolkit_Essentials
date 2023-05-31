import { useSelector } from "react-redux";
import { selectAllPosts } from "../slice/postsSlice";
import PostsAuthor from "./PostsAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostsList = () => {

    const posts = useSelector(selectAllPosts)

    const shallowCopyArray = posts.slice();  // This will create a same shallow copy of the array received from the slice
    const postsOrderAscend = shallowCopyArray.sort((a, b) => b.date.localeCompare(a.date));  // Sort that array in Ascending Order of Dates, so latest appears on top

    return (
        <div>
            <h2>Posts</h2>
            {
                postsOrderAscend.map((post) => (
                    <article key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.content.substring(0, 100)}</p>
                        <p className="postCredit">
                            <PostsAuthor userId={post.userId} />
                            <TimeAgo timestamp={post.date} />
                        </p>
                        <ReactionButtons post={post} />
                    </article>
                ))
            }
        </div>
    )
}

export default PostsList