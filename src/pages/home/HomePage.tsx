import { Typography, Container, Grid, Card, CardContent } from "@mui/material";
import { useContext } from "react";
// import FetchData from "../../components/FetchData";
import { PostsResponse } from "../../lib/model";
import { ThemeContext } from "../../lib/theme";
// import withFetchData from "../../lib/withFetchData";
// import { FetchState } from "../../util/fetchstate";

import useFetchData from "../../lib/useFetchData";

export default function HomePage() {
  const state = useFetchData<PostsResponse>(
    "https://coders-network-api.herokuapp.com/posts"
  );

  const { theme } = useContext(ThemeContext);
  return (
    <Container fixed>
      <Typography variant="h3" component="h1">
        Codaisseur Coders Network
      </Typography>
      <p>
        <button onClick={state.refetch}>refetch data</button>
      </p>
      {state.status === "loading" && <p>Loading...</p>}
      {state.status === "error" && <p>ERROR!</p>}
      {state.status === "success" && (
        <Grid container spacing={3}>
          {state.data.rows.map((post) => {
            return (
              <Grid key={post.id} item xs={4}>
                <Card>
                  <CardContent
                    style={{ maxHeight: "15rem", overflow: "hidden" }}
                  >
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
        </Grid>
      )}
    </Container>
  );
}
