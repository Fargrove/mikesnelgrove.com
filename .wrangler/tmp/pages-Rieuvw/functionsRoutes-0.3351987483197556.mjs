import { onRequestGet as __api_me_js_onRequestGet } from "/Users/michael/Claude OS/mikesnelgrove.com/functions/api/me.js"
import { onRequestPost as __api_me_js_onRequestPost } from "/Users/michael/Claude OS/mikesnelgrove.com/functions/api/me.js"
import { onRequestGet as __api_picks_js_onRequestGet } from "/Users/michael/Claude OS/mikesnelgrove.com/functions/api/picks.js"
import { onRequestPost as __api_picks_js_onRequestPost } from "/Users/michael/Claude OS/mikesnelgrove.com/functions/api/picks.js"

export const routes = [
    {
      routePath: "/api/me",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_me_js_onRequestGet],
    },
  {
      routePath: "/api/me",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_me_js_onRequestPost],
    },
  {
      routePath: "/api/picks",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_picks_js_onRequestGet],
    },
  {
      routePath: "/api/picks",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_picks_js_onRequestPost],
    },
  ]