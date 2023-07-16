import tweetsData from './data.js'

const tweetInput = document.getElementById('tweet-input')

const tweetFeed = document.getElementById('feed')

/*
Challenge:
1. Bring in uuidjs.
*/

import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


document.addEventListener('click', function(e){

    if(e.target.dataset.like){
        handleLikeClick(e.target.dataset.like)
    }

    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    } 
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    }

})


function handleLikeClick(tweetId){

   const targetTweetObj =  tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
   })[0]

     if(targetTweetObj.isLiked){
            targetTweetObj.likes--
          
        
        } else {
            targetTweetObj.likes++
         
        }

        targetTweetObj.isLiked = !targetTweetObj.isLiked

   render()
}


function handleRetweetClick(tweetId){
    const targetRetweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if(targetRetweetObj.isRetweeted){
        targetRetweetObj.retweets--
    } else {
        targetRetweetObj.retweets++
    }

    targetRetweetObj.isRetweeted = !targetRetweetObj.isRetweeted

    render()

}


function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}


function handleTweetBtnClick(){
    console.log(
    /*
        Challenge:
        2. When the Tweet button is clicked, log out an object
        for a new tweet. Make sure you include the text of 
        the tweet (how can you get that?) and a unique 
        identifier using uuidjs.
        
        The handle @Scrimba (or whatever you prefer) and 
        the profile pic scrimbalogo.png can be hard-coded.
        */ 

        {
            handle: `@Scrimba 💎`,
            profilePic: `images/scrimbalogo.jpg`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4(),
        }
    )
}



function getFeedHtml(){
    let feedHtml = ""


    tweetsData.forEach(function(tweet){

       let likeIconClass = tweet.isLiked ? 'liked' : ''
       let retweetIconClass = tweet.isRetweeted ? "retweeted" : ""


        let repliesHtml = ""

        if(tweet.replies.length > 0){

            tweet.replies.forEach(function(reply){
                repliesHtml += `<div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                        </div>
                </div>`

            })
               
        }


        feedHtml += `<div class="tweet">
                        <div class="tweet-inner">
                            <img src="${tweet.profilePic}" class="profile-pic" />
                            <div>
                                <p class="handle">${tweet.handle}</p>
                                <p class="tweet-text">${tweet.tweetText}</p>
                                <div class="tweet-details">
                                    <span class="tweet-detail">
                                        <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                                        ${tweet.replies.length}
                                    </span>
                                    <span class="tweet-detail">
                                        <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                                        ${tweet.likes}
                                        </span>
                                    <span class="tweet-detail">
                                        <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
                                        ${tweet.retweets}
                                    </span>
                                </div>   
                            </div>            
                        </div>
                        <div class="hidden" id="replies-${tweet.uuid}">
                        <!-- REPLIES HERE -->
                            ${repliesHtml}
                        </div> 
                </div>`
            })
            return feedHtml
        }


        
function render(){
    return tweetFeed.innerHTML = getFeedHtml()
}

render()