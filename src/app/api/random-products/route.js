import { dbConnect, collectionNames } from "@/lib/dbConnect";

export async function GET() {
  try {
    const productsCollection = dbConnect(collectionNames.productsCollection);
    const products = await productsCollection
      .aggregate([{ $sample: { size: 3 } }])
      .toArray();

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to fetch products" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
