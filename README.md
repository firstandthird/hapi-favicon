# hapi-favicon

A simple [hapi](https://hapi.dev/) plugin that serves the favicon.ico route
for you.  This is the icon that will appear in browser tabs.

## Installation

```
npm install hapi-favicon
```

## Basic Icons

Just register the plugin with your hapi server:

```js
 await server.register({
   plugin: require('hapi-favicon'),
   options: {
     path: '/path/to/standard/icons/standard.ico'
   }
 });
```

where _path_ is the local file path to your favicon image.  This will register a route with hapi at
the standard _/favicon.ico_ route that returns your icon with the _image/x-icon_ mime header type. Leaving _path_ blank will just serve a blank image.

## Apple Touch Icons

You can tell hapi-favicon to also serve Apple touch icons for Apple-specific devices, in addition to the standard .ico icons:   

```js
 await server.register({
   plugin: require('hapi-favicon'),
   options: {
     path: '/path/to/standard/icons/standard.ico',
     appleTouch: '/path/to/apple/icons/'
   }
);
```

This will register a route at _'/apple-touch-icon{size?}.png'_ that serves the corresponding PNG icon from the _/path/to/apple/icons_ folder.  Sizes supported are the Apple-standard dimensions: 57x57, 60x60, 72x72, 76x76, 114x114, 120x120, 144x144, 152x152.  If the client requests dimensions other than these standard dimensions, the plugin will default to the next-lowest size.  For example if you request _/apple-touch-icon65x65.png_, you will get the _apple-touch-icon60x60.png_ icon instead.

Setting the _appleTouch_ icon to _true_ instead of a file path will result in the _'/apple-touch-icon{size?}.png'_ route serving an empty _image/x-icon_ for all requested image sizes.

## Auth option

If you want your favicon.ico route to be protected by your hapi [auth](https://hapi.dev/api/?v=20.1.0#-routeoptionsauth) scheme, you can specify the auth config like so:

```js
await server.register({
  plugin: require('hapi-favicon'),
  options: {
    path: '/path/to/standard/icons/standard.ico',
    auth: {
      strategy: 'cookie',
      mode: 'try'
    }
  }
);
```

This only applies to the favicon.ico route, Apple touch icons will be publicly available. 
