import {FreshContext} from "$fresh/server.ts";

export default async function App(req: Request, ctx: FreshContext) {
    return (
        <body>
        <ctx.Component/>
        </body>
    );
}
