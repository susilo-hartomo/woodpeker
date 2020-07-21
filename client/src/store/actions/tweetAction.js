import axios from 'axios'
// const URL = 'http://localhost:3000/tweet'
const URL = "https://fast-atoll-37773.herokuapp.com/tweet"

export const getTweets = () => {
    return (dispatch) => {
        axios({
            method: 'GET',
            url: URL + '/all',
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
            .then(result => {
                dispatch({
                    type: 'GET_TWEETS',
                    payload: result.data
                })
            })
            .catch(err => {
                console.error(err)
            })
    }
}

export const addTweet = (tweet) => {
    // without image
    if (tweet.media === null) {
        return (dispatch) => {
            axios({
                method: 'POST',
                url: URL,
                headers: {
                    access_token: localStorage.getItem('access_token')
                },
                data: {
                    ...tweet,
                    media: 'http://www.coba.com/'
                },
            }).then((result) => {
                dispatch({
                    type: 'ADD_TWEET',
                    payload: result.data
                })
            }).catch((err) => {
                console.log(err)
            });
        }
    } else {
        let formData = new FormData()
        formData.append("image", tweet.media, tweet.media.name)
        return (dispatch) => {
            axios({
                method: 'POST',
                url: "https://cors-anywhere.herokuapp.com/https://api.imgur.com/3/upload",
                headers: {
                    Authorization: "Client-ID 24c11b941941402",
                    "Access-Control-Allow-Origin": "*",
                },
                data: formData,
            })
                .then(result => {
                    return axios({
                        method: 'POST',
                        url: URL,
                        headers: {
                            access_token: localStorage.getItem('access_token')
                        },
                        data: { ...tweet, media: result.data.data.link },
                    })
                }).then((result) => {
                    dispatch({
                        type: 'ADD_TWEET',
                        payload: result.data
                    })
                }).catch((err) => {
                    console.log(err)
                });
        }
    }
}

export const deleteTweet = (id) => {
    return (dispatch) => {
        axios({
            method: 'DELETE',
            url: URL + '/' + id,
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
            .then(result => {
                // dispatch(getTweets())
                dispatch({
                    type: 'DELETE_TWEET',
                    payload: { id }
                })
            })
            .catch(err => {
                console.error(err)
            })
    }
}

export const updatedTweet = (updatTweet) => {
    return (dispatch) => {
        axios({
            method: 'PUT',
            url: URL + '/' + updatTweet.id,
            headers: {
                access_token: localStorage.getItem('access_token')
            },
            data: updatTweet
        })
            .then((result) => {
                
                dispatch({
                    type: 'UPDATE_TWEET',
                    payload: result.data
                })
            }).catch((err) => {
                console.log(err)
            });
    }
}

export const likeTweet = (TweetId) => {
    return (dispatch) => {
        axios({
            method: 'POST',
            url: URL + '/like',
            headers: {
                access_token: localStorage.getItem('access_token')
            },
            data: {
                TweetId
            }
        })
            .then((result) => {
                dispatch({
                    type: 'LIKE_TWEET',
                    payload: result.data
                })
            }).catch((err) => {
                console.log(err)
            });
    }
}

export const unlikeTweet = (TweetId) => {
    return (dispatch) => {
        axios({
            method: 'POST',
            url: URL + '/unlike',
            headers: {
                access_token: localStorage.getItem('access_token')
            },
            data: {
                TweetId
            }
        })
            .then((result) => {
                // console.log(result.data)
                dispatch({
                    type: 'UNLIKE_TWEET',
                    payload: result.data
                })
            }).catch((err) => {
                console.log(err)
            });
    }
}

export const addComment = (comment) => {
    return (dispatch) => {
        axios({
            method: 'POST',
            url: URL + '/comment',
            headers: {
                access_token: localStorage.getItem('access_token')
            },
            data: comment
        })
            .then((result) => {
                console.log(result.data)
                dispatch({
                    type: 'ADD_COMMENT',
                    payload: result.data
                })
            }).catch((err) => {
                console.log(err)
            });
    }
}

export const deleteComment = (id) => {
    return (dispatch) => {
        axios({
            method: 'DELETE',
            url: URL + '/comment/' + id,
            headers: {
                access_token: localStorage.getItem('access_token')
            },
        })
            .then((result) => {
                dispatch({
                    type: 'DELETE_COMMENT',
                    payload: result.data
                })
            }).catch((err) => {
                console.log(err)
            });
    }
}