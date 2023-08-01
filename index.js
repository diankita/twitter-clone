import { tweetsData } from "./data.js";

document.addEventListener("click", (e) => {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet);
  } else if (e.target.dataset.reply) {
		handleReplyClick(e.target.dataset.reply)
	}
});

function handleLikeClick(tweetId) {
  const targetTweetObj = tweetsData.filter(
    (tweet) => tweet.uuid === tweetId
  )[0];

  targetTweetObj.isLiked ? targetTweetObj.likes-- : targetTweetObj.likes++;
  targetTweetObj.isLiked = !targetTweetObj.isLiked;

  renderHtml();
}

function handleRetweetClick(tweetId) {
  const targetTweetObj = tweetsData.filter(
    (tweet) => tweet.uuid === tweetId
  )[0];
  targetTweetObj.isRetweeted
    ? targetTweetObj.retweets--
    : targetTweetObj.retweets++;
  targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;

  renderHtml();
}

function handleReplyClick(tweetId) {
	document.getElementById(`replies-${tweetId}`).classList.toggle("hidden");
}

function getFeedHtml() {
  let feedHtml = "";

  tweetsData.forEach((tweet) => {
    let likeClass = "";
    let retweetClass = "";
    let repliesHtml = "";
		
    tweet.isLiked ? (likeClass = "liked") : likeClass;
    tweet.isRetweeted ? (retweetClass = "retweeted") : retweetClass;

    if (tweet.replies) {
      tweet.replies.forEach((reply) => {
        repliesHtml += `
				<div class="tweet-reply">
    			<div class="tweet-inner">
        		<img src="${reply.profilePic}" class="profile-pic">
            <div>
							<p class="handle">${reply.handle}</p>
							<p class="tweet-text">${reply.tweetText}</p>
            </div>
        	</div>
				</div>`;
      });
    }

    feedHtml += `
		<div class="tweet">
			<div class="tweet-inner">
				<img src="${tweet.profilePic}" class="profile-pic">
				<div>
					<p class="handle">${tweet.handle}</p>
					<p class="tweet-text">${tweet.tweetText}</p>
						<div class="tweet-details">
							<span class="tweet-detail">
								<i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
								${tweet.replies.length}
							</span>
							<span class="tweet-detail">
								<i class="fa-solid fa-heart ${likeClass}" data-like="${tweet.uuid}"></i>
								${tweet.likes}
							</span>
							<span class="tweet-detail">
								<i class="fa-solid fa-retweet ${retweetClass}" data-retweet="${tweet.uuid}"></i>
								${tweet.retweets}
							</span>
						</div>   
				</div>            
			</div>
			<div class="hidden" id="replies-${tweet.uuid}">
				${repliesHtml}
			</div>
		</div>`;
  });
  return feedHtml;
}

function renderHtml() {
  document.getElementById("feed").innerHTML = getFeedHtml();
}

renderHtml();
