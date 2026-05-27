import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("visualizer/:id", "./routes/visualizer.$id.tsx"),
  route("coming-soon", "routes/coming-soon.tsx"),
  route("/studio/floor-to-3d", "./routes/studio/floor-to-3d.tsx"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
