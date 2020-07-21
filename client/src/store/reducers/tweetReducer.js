const initialStore = {
    tweets: [],
    // likes: []
    // comments: []
}

export const tweetReducer = (state = initialStore, { type, payload }) => {
    switch (type) {
        case 'GET_TWEETS':
            return { ...state, tweets: payload };
        case 'ADD_TWEET':
            return { ...state, tweets: [payload, ...state.tweets] };
        case 'UPDATE_TWEET':
            let newUpdateTweet = state.tweets.filter(el => el.tweet.id !== payload.id)
            return {
                ...state,
                tweets: [
                    payload,
                    ...newUpdateTweet,
                ],
            }
        case 'DELETE_TWEET':
            return {
                ...state,
                tweets: state.tweets.filter(el => el.id !== payload.id)
            };
        case 'LIKE_TWEET':
            state.tweets.forEach(el => {
                if (el.id === payload.TweetId) {
                    el.Likes.push(payload)
                }
            })

            return {
                ...state,
                tweets: state.tweets
            }
        case 'UNLIKE_TWEET':
            let newTweets = state.tweets.map(el => {
                if (el.id === payload.TweetId) {
                    let tempLikes = el.Likes.filter(like => like.id !== payload.id)
                    el.Likes = tempLikes
                }
                return el
            })
            return {
                ...state,
                tweets: newTweets
            }
        case 'ADD_COMMENT':
            let newTweetsComment = state.tweets.map(el => {
                if (el.id === payload.TweetId) {
                    el.Comments = [...el.Comments, payload]
                }
                return el
            })
            return {
                ...state,
                tweets: newTweetsComment
            }
        case 'DELETE_COMMENT':
            let updateComments = state.tweets.map(el => {
                if (el.id === payload.TweetId) {
                    el.Comments = el.Comments.filter(e => (e.id !== payload.id))
                }
                return el
            })
            return {
                ...state,
                tweets: updateComments
            }
        default:
            return state;
    }
}