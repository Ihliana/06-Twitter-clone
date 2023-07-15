import tweetsData from './data.js'

const tweetBtn = document.getElementById('tweet-btn')
const tweetInput = document.getElementById('tweet-input')

const tweetFeed = document.getElementById('feed')

tweetBtn.addEventListener('click', function(){
    console.log(tweetInput.value)
})


document.addEventListener('click', function(e){
    if(e.target.dataset.like){
        handleLikeClick(e.target.dataset.like)
    }

    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
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


function getFeedHtml(){
    let feedHtml = ""


    tweetsData.forEach(function(tweet){

        /*
        Challenge:
        1. Use an if statement to set the value of 
        'likeIconClass' to the string 'liked' 
        if the tweet has been liked. 
        2. In the like icon tag, add 'likeIconClass' 
        to the list of classes.
        */  
       
       let likeIconClass = tweet.isLiked ? 'liked' : ''

        
            /*
        Challenge:
        1. Use an if statement to set the value of 
        'retweetIconClass' to the string 
        'retweeted' if the tweet has been retweeted. 
        2. In the retweet icon tag, add 'retweetIconClass' 
        to the list of classes.
        */

        let retweetIconClass = tweet.isRetweeted ? "retweeted" : ""




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
                </div>`
            })
            return feedHtml
        }


        
function render(){
    return tweetFeed.innerHTML = getFeedHtml()
}

render()