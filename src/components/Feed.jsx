import React, { useEffect } from "react";
import Card from "./Card";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import NotifyBar from "./NotifyBar";

function Feed() {
  const feedData = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  // console.log(feedData);
  const getFeed = async () => {
    if (!feedData) {
      try {
        const res = await axios.get(
          BASE_URL + "/user/feed",

          { withCredentials: true }
        );

        dispatch(addFeed(res?.data?.data));
      } catch (err) {
        console.log(err);
      }
    } else dispatch(addFeed(feedData));
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feedData) {
    return <NotifyBar message={"No person found"} />;
  }
  if (feedData.length === 0) {
    return <NotifyBar message={"No person found"} />;
  }
  return (
    feedData[0] && (
      <div className="flex justify-center my-10">
        <Card user={feedData[0]} />
      </div>
    )
  );
}

export default Feed;
