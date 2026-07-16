import { createContext, useContext, useEffect, useState } from "react";

const Ctx = createContext(null);
const KEY = "dalil-matar-favs";

export const FavoritesProvider = ({ children }) => {
  const [favs, setFavs] = useState([]);
  useEffect(() => {
    try {
      const s = localStorage.getItem(KEY);
      if (s) setFavs(JSON.parse(s));
    } catch {}
  }, []);
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(favs));
  }, [favs]);

  const toggle = (path) => setFavs((f) => f.includes(path) ? f.filter((p) => p !== path) : [...f, path]);
  const isFav = (path) => favs.includes(path);
  return <Ctx.Provider value={{ favs, toggle, isFav }}>{children}</Ctx.Provider>;
};

export const useFavorites = () => useContext(Ctx);
