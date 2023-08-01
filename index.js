import { tweetsData } from "./data.js";

function getFeedHtml() {
	let feedHtml = "";
	tweetsData.forEach((tweet) => {
		feedHtml +=`
		<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
</div>`;

	})
return feedHtml
}

function renderHtml() {
	document.getElementById("feed").innerHTML = getFeedHtml()
}

renderHtml()

