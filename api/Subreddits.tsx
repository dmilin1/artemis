import 'react-native-url-polyfill/auto'
import { api } from "./RedditApi";
import Time from '../utils/Time';

export type Subreddit = {
    id: string,
    name: string,
    url: string,
    moderating: boolean,
    subscribed: boolean,
    description?: string,
    iconURL?: string,
    subscribers: number,
    timeSinceCreation: string,
}

export type Subreddits = {
    moderator: Subreddit[],
    subscriber: Subreddit[],
}

type GetSubredditsOptions = {
    limit?: string,
    after?: string,
}

export function formatSubredditData(child: any): Subreddit {
    return {
        id: child.data.id,
        name: child.data.display_name,
        url: `https://www.reddit.com${child.data.url}`,
        moderating: child.data.user_is_moderator,
        subscribed: child.data.user_is_subscriber,
        description: child.data.public_description,
        iconURL: child.data.community_icon,
        subscribers: child.data.subscribers,
        timeSinceCreation: new Time(child.data.created_utc * 1000).prettyTimeSince() + ' old',
    };
}

export async function getSubreddits(options: GetSubredditsOptions = {}): Promise<Subreddits> {
    const searchParams = new URLSearchParams(options);
    const subredditsPromise = api(`https://www.reddit.com/subreddits/mine.json?limit=100&${searchParams.toString()}`, {}, { depaginate: true});
    const moderatorsPromise = api(`https://www.reddit.com/subreddits/mine/moderator.json?limit=100&${searchParams.toString()}`, {}, { depaginate: true});
    const [subredditsData, moderatorsData] = await Promise.all([subredditsPromise, moderatorsPromise]);
    const subreddits = {
        moderator: moderatorsData.map((child: any) => formatSubredditData(child)),
        subscriber: subredditsData.map((child: any) => formatSubredditData(child)),
    };
    return subreddits;
}

export async function getTrending(): Promise<Subreddit[]> {
    const data = await api('https://www.reddit.com/subreddits.json?limit=10');
    return data.data.children.map((child: any) => formatSubredditData(child));
}