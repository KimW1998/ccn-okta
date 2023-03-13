import axios from "axios";
import { useEffect, useState } from "react";
import { FetchState } from "../util/fetchstate";

export type FetchDataProps<Data> = {
  url: string;
  children: (fetchState: FetchState<Data>) => JSX.Element;
};

export default function FetchData<Data>({
  url,
  children,
}: FetchDataProps<Data>) {
  const [state, setState] = useState<FetchState<Data>>({
    status: "loading",
  });

  useEffect(() => {
    (async () => {
      setState({ status: "loading" });
      try {
        const res = await axios.get(url);
        setState({ status: "success", data: res.data });
      } catch (error) {
        setState({ status: "error", error });
      }
    })();
  }, [url]);

  return children(state);
}
