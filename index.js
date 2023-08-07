import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

document.addEventListener("click", (e) => {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet);
  } else if (e.target.dataset.reply) {
    handleReplyClick(e.target.dataset.reply);
  } else if (e.target.id === "tweet-btn") {
    handleTweetBtnClick();
  } else if (e.target.dataset.replyButton) {
    handleReplyBtnClick(e.target.dataset.replyButton);
  } else if (e.target.dataset.deleteTweet) {
    handleDeleteTweetClick(e.target.dataset.deleteTweet);
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

function handleTweetBtnClick() {
  const tweetInputText = document.getElementById("tweet-input-text");

  if (tweetInputText.value) {
    const newTweetObj = {
      handle: `@diii`,
      profilePic: `images/scrimbalogo.png`,
      likes: 0,
      retweets: 0,
      tweetText: tweetInputText.value,
      replies: [],
      isLiked: false,
      isRetweeted: false,
      uuid: uuidv4(),
    };
    tweetsData.unshift(newTweetObj);

    renderHtml();
    tweetInputText.value = "";
  }
}

function handleReplyBtnClick(tweetId) {
  const targetTweetObj = tweetsData.filter(
    (tweet) => tweet.uuid === tweetId
  )[0];

  const replyInputText = document.getElementById(`reply-input-text-${tweetId}`);

  if (replyInputText.value) {
    const newReplyObj = {
      handle: `@diii`,
      profilePic: `images/scrimbalogo.png`,
      tweetText: replyInputText.value,
    };

    targetTweetObj.replies.unshift(newReplyObj);

    renderHtml();
    replyInputText.value = "";
    document.getElementById(`replies-${tweetId}`).classList.toggle("hidden");
  }
}

function handleDeleteTweetClick(tweetId) {
  const targetTweetObj = tweetsData.filter(
    (tweet) => tweet.uuid === tweetId
  )[0];
  tweetsData.splice(targetTweetObj, 1);
  renderHtml();
}


function getFeedHtml() {
  let feedHtml = "";

  tweetsData.forEach((tweet) => {
    let repliesHtml = "";

    let likeClass = "";
    let retweetClass = "";
    let deleteTweetClass = "";

    tweet.isLiked ? (likeClass = "liked") : likeClass;
    tweet.isRetweeted ? (retweetClass = "retweeted") : retweetClass;
    tweet.handle === "@diii" ? deleteTweetClass : (deleteTweetClass = "hidden");

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
              <span class="tweet-detail ${deleteTweetClass}">
								<i class="fa-solid fa-trash-can" data-delete-tweet="${tweet.uuid}"></i>
							</span>
						</div>   
				</div>            
			</div>
			<div class="hidden" id="replies-${tweet.uuid}">
      	<div class="tweet-reply">
          <textarea id="reply-input-text-${tweet.uuid}" class="smaller" placeholder="Write your reply"></textarea>
          <button data-reply-button="${tweet.uuid}" class="smaller">Reply</button>
        </div>
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
