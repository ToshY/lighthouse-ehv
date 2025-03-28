import {Head} from "$fresh/runtime.ts";
import {HandlerContext, PageProps} from "$fresh/server.ts";

export async function mergeJsonFiles(directory: string = Deno.env.get('DATA_DIRECTORY') ?? `/data`): Promise<any[]> {
    const mergedArray: any[] = [];

    // Read all files in the directory
    for await (const entry of Deno.readDir(directory)) {
        if (!entry.isFile || !entry.name.endsWith(".json")) {
            continue;
        }

        const filePath = `${directory}/${entry.name}`;
        const fileContent = await Deno.readTextFile(filePath);
        const jsonData = JSON.parse(fileContent);

        if (Array.isArray(jsonData)) {
            mergedArray.push(...jsonData);
            continue;
        }
        mergedArray.push(jsonData);
    }

    return mergedArray;
}

export const handler: { GET(req: Request, ctx: HandlerContext): Promise<Response> } = {
    async GET(req, ctx) {
        const data = await mergeJsonFiles();
        return ctx.render(data);
    },
};

export default function Home({data}: PageProps<{ units: Unit[] }>) {
    const sortedUnits = [...data].sort((a, b) => a.price - b.price);

    return (
        <>
            <Head>
                <title>Lighthouse Unit Listing</title>
            </Head>
            <div className="container-fluid py-2">
                <div className="row">
                    {sortedUnits.map((unit) => {
                        const planImage = unit.unit_type?.unit_type_assets?.find(
                            (asset) => asset.project_asset?.content_type === "plan"
                        )?.project_asset?.cloudinary_asset?.md_secure_url;

                        const getFieldValue = (key: string) =>
                          unit.fields?.find((field) => field.project_field?.external_identifier === key)?.value || "N/A";

                        const livingArea = getFieldValue("livingArea");
                        const numberOfRooms = getFieldValue("numberOfRooms");
                        const serviceCosts = getFieldValue("serviceCosts");
                        const unitType = unit?.unit_type?.type || "N/A";
                        const subType = getFieldValue("subtype");

                        return (
                            <div key={unit.id} className="col-md-2 mb-4">
                                <div className="card shadow-sm h-100 d-flex flex-column">
                                    {planImage && (
                                        <img
                                            src={planImage}
                                            className="card-img-top lazyload"
                                            alt={`Thumbnail for ${unit.name}`}
                                            style={{ "aspect-ratio": "auto 673 / 953", height: "400px", objectFit: "cover" }}
                                        />
                                    )}
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{unit.name}</h5>
                                        <hr />
                                        <div>
                                            <table className="table table-sm">
                                                <tbody>
                                                <tr>
                                                    <td><strong>Price:</strong></td>
                                                    <td className="text-end">€{Number(unit.price).toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Service Costs:</strong></td>
                                                    <td className="text-end">€{Number(serviceCosts).toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Total:</strong></td>
                                                    <td className="text-end">€{(Number(unit.price) + Number(serviceCosts)).toFixed(2)}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            <table className="table table-sm">
                                                <tbody>
                                                <tr>
                                                    <td><strong>Type:</strong></td>
                                                    <td className="text-end">{unitType}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Subtype:</strong></td>
                                                    <td className="text-end">{subType}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Bedrooms:</strong></td>
                                                    <td className="text-end">{numberOfRooms}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Living Area:</strong></td>
                                                    <td className="text-end">{livingArea}m²</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Floor:</strong></td>
                                                    <td className="text-end">{unit.floor_number}</td>
                                                </tr>
                                                                                                <tr>
                                                    <td><strong>Availability:</strong></td>
                                                    <td className="text-end">{unit.availability}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="mt-auto">
                                            <a
                                                href={`https://lighthouse.presendoo.app/lighthouse2/${unit.id}`}
                                                className="btn btn-primary w-100"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                View Details
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
