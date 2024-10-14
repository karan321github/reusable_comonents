import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export const InfiniteScrollComp = ({
  apiUrl, // Base API URL
  pageSize = 10, // Items per page
  renderItem, // Function to render each item
  scrollHeight = 300, // Default scroll height
}) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); 

  // Function to fetch more data
  const fetchMoreData = async () => {
    try {
      const res = await axios.get(`${apiUrl}?_page=${page}&_limit=${pageSize}`);
      if (res.data.length > 0) {
        setItems((prevItems) => [...prevItems, ...res.data]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false); // No more items to load
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMoreData();
  }, []); // Fetch initial data when component mounts

  return (
    <div
      id="scrollableDiv"
      style={{
        height: scrollHeight,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
      >
        {items.map((item, index) => (
          <div key={index}>{renderItem(item)}</div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteScrollComp;
