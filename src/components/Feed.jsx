import React, { useEffect, useState } from "react";
import Card from "./Card";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import NotifyBar from "./NotifyBar";
import LoadingComponents from "./LoadingComponents";

function Feed() {
  const feedData = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (!feedData) {
      try {
        const res = await axios.get(
          BASE_URL + "/user/feed",

          { withCredentials: true }
        );

        dispatch(addFeed(res?.data?.data));
        console.log('added',feedData);
      } catch (err) {
        console.log(err);
      }
    } else dispatch(addFeed(feedData));
  };

  useEffect(() => {
    getFeed();

  }, []);

  if (!feedData) return;

  if (feedData.length <= 0) {
    return <NotifyBar message={"No person found"} />;
  }

  return (
    feedData && (
      <div className="flex justify-center my-10">
        <Card user={feedData[0]} />
      </div>
    )
  );
}

export default Feed;
