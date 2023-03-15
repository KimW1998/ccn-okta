import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
} from "@mui/material";

import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ThemeContext } from "../../lib/theme";

import { fetchDataFromTag } from "../../store/homepage/actions";
import { selectHomepageFeed } from "../../store/homepageFeed/selectors";

import { AppDispatch } from "../../store/types";

//this is replaced by a selector
// const selectHomepageFeed = (reduxState: State) => {
//   return reduxState.homepageFeed;
// };

export default function HomePage() {
  const state = useSelector(selectHomepageFeed);
  const dispatch = useDispatch<AppDispatch>();

  const { theme } = useContext(ThemeContext);
  const tags = [
    "github",
    "react",
    "hooks",
    "sequelize",
    "useMemo",
    "bundling",
    "tech",
  ];
  const [tag, setTag] = useState(tags[0]);

  useEffect(() => {
    dispatch(fetchDataFromTag(tag));
  }, [dispatch, tag]);

  return (
    <Container fixed>
      <Typography variant="h3" component="h1">
        Codaisseur Coders Network
      </Typography>

      <Select value={tag} onChange={(e) => setTag(e.target.value as string)}>
        {tags.map((tag) => {
          return (
            <MenuItem key={tag} value={tag}>
              {tag}
            </MenuItem>
          );
        })}
      </Select>

      {state.status === "loading" && <p>Loading...</p>}
      {state.status === "error" && <p>ERROR!</p>}
      {state.status === "success" &&
        state.data.rows.map((post) => {
          return (
            <Grid key={post.id} item xs={4}>
              <Card>
                <CardContent style={{ maxHeight: "15rem", overflow: "hidden" }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{ color: theme.colors.textColor }}
                  >
                    {post.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
    </Container>
  );
}
