function templatingTweets (template,data) {

    let displayTweet = [];

    data.forEach(tweet => {
        let tweet_obj = {};
        for(let key in tweet) {
            if(key === 'text' || key === 'created_at') tweet_obj[key] = tweet[key];
        }
        displayTweet.push(JSON.stringify(tweet_obj));
    });

    template = template.replace('{{ tweet_object }}', displayTweet);
    return template;
}


module.exports = templatingTweets;