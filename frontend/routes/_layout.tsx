import {asset} from "$fresh/runtime.ts";

export default function Layout({ Component, state }: PageProps) {
    return (
        <html data-bs-theme={"dark"}>
        <head>
            <title>Layout</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link href={asset("/vendor/css/bootstrap/5.3.3/bootstrap.min.css")} rel="stylesheet"/>
            <script src={asset("/vendor/js/bootstrap/5.3.3/bootstrap.bundle.min.js")} defer></script>
            <script src={asset("/vendor/js/lazysizes/5.3.2/lazysizes.min.js")} defer></script>
            <script src={asset("/vendor/js/lazysizes/5.3.2/unveilhooks.min.js")} defer></script>
        </head>
        <body>
        <Component />
        </body>
        </html>
    );
}
