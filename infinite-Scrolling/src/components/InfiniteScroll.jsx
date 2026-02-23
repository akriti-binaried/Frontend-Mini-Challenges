import React, { useEffect, useState, useRef, useCallback } from 'react'
import ClipLoader from "react-spinners/ClipLoader";

const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const loaderRef = useRef(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getData = async (page) => {
    try {
      const url = `https://picsum.photos/v2/list?page=${page}&limit=10`;
      const res = await fetch(url);
      return await res.json();
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const firstPage = async () => {
    const datas = await getData(1);
    setData(datas);
  };

  useEffect(() => {
    firstPage();
  }, []);

  const loadMore = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    const datas = await getData(page + 1);

    setData((prev) => [...prev, ...datas]);
    setPage((prev) => prev + 1);
    setLoading(false);

  }, [page, loading]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });

    const current = loaderRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loadMore]);

  return (
    <div>
      <div className="images">
        {data.map((curItem, index) => (
          <div key={index}>
            <img src={curItem.download_url} alt="img" />
          </div>
        ))}
      </div>

      <div ref={loaderRef} style={{ textAlign: "center", padding: 20 }}>
        {loading && <ClipLoader color="blue" size={50} />}
      </div>
    </div>
  );
};

export default InfiniteScroll;
