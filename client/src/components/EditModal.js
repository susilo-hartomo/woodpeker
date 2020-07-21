import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updatedTweet } from '../store/actions/tweetAction'


function EditModal(props) {
    const dispatch = useDispatch()
    const { id, tweet } = props
    const [updateTweet, setUpdateTweet] = useState(tweet.tweet)

    const onHandleUpdateTweet = () => {
        let newUpdateTweet = {...tweet, tweet: updateTweet}
        dispatch(updatedTweet(newUpdateTweet))
    }

    return (
        <>
            <div className="modal fade" id={id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                                <div className="col-2">
                                    <img style={{ "width": "50px", "height": "50px" }} className="rounded" src={tweet.User.image_url} alt="" />
                                </div>
                                <div className="col-10">
                                    <span className="user-name mr-1">{tweet.User.username}</span> <span className="text-muted" style={{ fontSize: '15px' }}>{tweet.User.email}</span>
                                    <p className="text-small mt-1 text-muted" style={{ fontSize: '11px', fontWeight: "lighter" }}>{tweet.updatedAt.slice(0, 10).split('-').reverse().join('/')}</p>
                                </div>
                            </div>
                            <div>
                                {tweet.media !== 'http://www.coba.com/' && <img src={tweet.media} style={{ "width": "100%", "height": "280px" }} />}
                            </div>
                            <div>
                                <input value={updateTweet} type="text" class="form-control" placeholder="Share your comment.." onChange={(e) => setUpdateTweet(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button onClick={onHandleUpdateTweet} type="button" className="btn btn-primary" data-dismiss="modal">Save Tweet</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditModal
