import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

import { getPosts, Post } from "../api/Posts";
import PostComponent from "../components/RedditDataRepresentations/Post/PostComponent";
import Scroller from "../components/UI/Scroller";
import SearchBar from "../components/UI/SearchBar";
import { ThemeContext, t } from "../contexts/SettingsContexts/ThemeContext";
import RedditURL, { PageType } from "../utils/RedditURL";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackPageProps, StackParamsList } from "../app/stack";


export default function PostsPage({ route, navigation }: StackPageProps<"PostsPage" | "Home">) {
  const { theme } = useContext(ThemeContext);

  const [posts, setPosts] = useState<Post[]>([]);
  const search = useRef<string>("");

  const { url } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: new RedditURL(url).getPageName() ?? "Posts",
    });
  });

  const isSubredditPage =
    new RedditURL(url).getPageType() === PageType.SUBREDDIT;

  const loadMorePosts = async (refresh = false) => {
    const newPosts = await getPosts(url, {
      after: refresh ? undefined : posts.slice(-1)[0]?.after,
      search: search.current,
    });
    if (refresh) {
      setPosts(newPosts);
    } else {
      setPosts([...posts, ...newPosts]);
    }
  };

  return (
    <View
      style={t(styles.postsContainer, {
        backgroundColor: theme.background,
      })}
    >
      <Scroller
        loadMore={loadMorePosts}
        maintainVisibleContentPosition={!!posts.length}
        headerComponent={
          isSubredditPage && (
            <SearchBar
              onSearch={(text) => {
                search.current = text;
                loadMorePosts(true);
              }}
            />
          )
        }
      >
        {posts.map((post, index) => (
          <PostComponent key={`${post.id}-${index}`} initialPostState={post} />
        ))}
      </Scroller>
    </View>
  );
}

const styles = StyleSheet.create({
  postsContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
