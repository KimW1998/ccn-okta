import axios from "axios";
import { useEffect, useState } from "react";
import { FetchState } from "../util/fetchstate";

export default function withFetchData<Data>(url: string) {
  return function hoc<P>(
    Wrapped: React.FC<P & { fetchState: FetchState<Data> }>
  ) {
    return function HocWrapperComponent(props: P) {
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
      }, []);

      return <Wrapped {...props} fetchState={state} />;
    };
  };
}
