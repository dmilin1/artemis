import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { User, UserContent, getUser, getUserContent } from "../api/User";
import { StackPageProps } from "../app/stack";
import PostComponent from "../components/RedditDataRepresentations/Post/PostComponent";
import { CommentComponent } from "../components/RedditDataRepresentations/Post/PostParts/Comments";
import UserDetailsComponent from "../components/RedditDataRepresentations/User/UserDetailsComponent";
import RedditDataScroller from "../components/UI/RedditDataScroller";
import { ThemeContext, t } from "../contexts/SettingsContexts/ThemeContext";
import URL from "../utils/URL";
import useRedditDataState from "../utils/useRedditDataState";

export default function UserPage({ route }: StackPageProps<"UserPage">) {
  const url = route.params.url;

  const { theme } = useContext(ThemeContext);

  const [user, setUser] = useState<User>();

  const {
    data: userContent,
    setData: setUserContent,
    modifyData: modifyUserContent,
    deleteData: deleteUserContent,
    fullyLoaded,
  } = useRedditDataState<UserContent>();

  const isDeepPath = !!new URL(url).getBasePath().split("/")[5]; // More than just /user/username like /user/username/comments

  const loadUser = async () => {
    const userData = await getUser(url);
    setUser(userData);
  };

  const loadUserContent = async (refresh = false) => {
    const newContent = await getUserContent(url, {
      after: refresh ? undefined : userContent.slice(-1)[0]?.after,
    });
    if (refresh) {
      setUserContent(newContent);
    } else {
      setUserContent([...userContent, ...newContent]);
    }
  };

  useEffect(() => {
    if (!isDeepPath) {
      loadUser();
    }
  }, []);

  return (
    <View
      style={t(styles.userContainer, {
        backgroundColor: theme.background,
      })}
    >
      <RedditDataScroller
        ListHeaderComponent={() => user && <UserDetailsComponent user={user} />}
        loadMore={loadUserContent}
        fullyLoaded={fullyLoaded}
        data={userContent}
        renderItem={({ item: content }) => {
          if (content.type === "post") {
            return (
              <PostComponent
                post={content}
                setPost={(newPost) => modifyUserContent([newPost])}
              />
            );
          }
          if (content.type === "comment") {
            return (
              <CommentComponent
                comment={content}
                index={0}
                displayInList
                changeComment={(newComment) => modifyUserContent([newComment])}
                deleteComment={(comment) => deleteUserContent([comment])}
              />
            );
          }
          return null;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  loaderContainer: {
    marginTop: 20,
  },
});
