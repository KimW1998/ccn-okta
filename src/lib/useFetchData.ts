import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { FetchState } from "../util/fetchstate";
import { FetchContext } from "./fetchDataCache";

export default function useFetchData<Data>(
  url: string
): FetchState<Data> & { refetch: () => void } {
  const [state, setState] = useState<FetchState<Data>>({
    status: "loading",
  });

  const { getResultsForUrl, addItem, removeItem } = useContext(FetchContext);

  const cachedItem = getResultsForUrl(url);

  useEffect(() => {
    if (cachedItem) {
      setState({ status: "success", data: cachedItem.data });
    } else {
      (async () => {
        setState({ status: "loading" });
        try {
          const res = await axios.get(url);
          addItem(url, res.data);
        } catch (error) {
          setState({ status: "error", error });
        }
      })();
    }
  }, [url, cachedItem, addItem]);

  const refetch = () => {
    removeItem(url);
  };

  return { ...state, refetch };
}
