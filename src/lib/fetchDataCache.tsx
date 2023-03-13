import { createContext, useCallback, useState } from "react";

type CacheItem = {
  url: string;
  data: any;
};

export type FetchDataStore = {
  cache: CacheItem[];
  addItem: (url: string, data: any) => void;
  removeItem: (url: string) => void;
  getResultsForUrl: (url: string) => undefined | CacheItem;
};

export const FetchContext = createContext<FetchDataStore>({
  cache: [],
  addItem: () => {
    throw new Error("First wrap the app with <FetchDataCacheProvider>");
  },
  removeItem: () => {
    throw new Error("First wrap the app with <FetchDataCacheProvider>");
  },
  getResultsForUrl: () => {
    throw new Error("First wrap the app with <FetchDataCacheProvider>");
  },
});

export function FetchDataCacheProvider(props: { children?: React.ReactNode }) {
  const [cache, setCache] = useState<CacheItem[]>([]);

  const addItem = useCallback(
    (url: string, data: any) => {
      setCache((currentCache) => {
        const i = currentCache.findIndex((item) => item.url === url);
        if (i >= 0) {
          const updatedCache = currentCache.slice();
          updatedCache.splice(i, 1, { url, data });
          return updatedCache;
        } else {
          return [...currentCache, { url, data }];
        }
      });
    },
    [setCache]
  );

  const removeItem = useCallback(
    (url: string) => {
      setCache((currentCache) => {
        const i = currentCache.findIndex((item) => item.url === url);
        if (i >= 0) {
          const updatedCache = currentCache.slice();
          updatedCache.splice(i, 1);
          return updatedCache;
        } else {
          return currentCache;
        }
      });
    },
    [setCache]
  );
  const getResultsForUrl = (url: string) => {
    return cache.find((item) => item.url === url);
  };

  return (
    <FetchContext.Provider
      value={{ cache, addItem, removeItem, getResultsForUrl }}
    >
      {props.children}
    </FetchContext.Provider>
  );
}
