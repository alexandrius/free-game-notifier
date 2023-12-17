# Free Games Notifier

A project which was planned to send push notifications whenever a paid game becomes free for a period: Steam, Epic Games Launcher, Xbox Store or Nintendo eShop. But mostly Epic Games Launcher.

I will probably never finish the project so I'm open sourcing it as is.

It includes:

- `src/app` - The mobile appllication written with [Expo](https://expo.dev/)
- `src/manager` - The admin console also written with [Expo](https://expo.dev/) and [Expo Router](https://docs.expo.dev/router/introduction/)
- `src/server` - Running on [Cloudflare Workers](https://workers.cloudflare.com/)

## App Preview

- Animations are implemented with Software Mansion [Reanimated 3](https://docs.swmansion.com/react-native-reanimated/).
- Shared component animations are manually implemented since project, because then current version of Reanimated didn't support it.
- The Tag Cloud and Store Selector components use Reanimated 3 [Layout Animations](https://docs.swmansion.com/react-native-reanimated/docs/category/layout-animations/).

## Server

I started server with Bun but soon after converted it to [Cloudflare Workers](https://workers.cloudflare.com/) due to reasons I don't remember. [Hono](https://hono.dev/) is used for routing

## Manager

Nothing special about manager - it's unfinished Expo web project with bare minimum UI
