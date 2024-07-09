import { useState, useEffect } from "react";

const useInfiniteScroll = (fetchNext: any, fetchPrevious: any, offset: number) => {
  const [loading, setLoading] = useState(false);
  const handleScroll = () => {
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (!loading) {
      if (scrollTop + window.innerHeight >= documentHeight - offset) {
        setLoading(true);
        fetchNext().then(() => {
          setLoading(false);
        });
      } else if (scrollTop === 0) {
        setLoading(true);
        fetchPrevious().then(() => {
          setLoading(false);
        });
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return loading;
};

export default useInfiniteScroll;
