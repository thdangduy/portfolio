import connectToDB from "@/lib/mongo.db";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const { slug } = await params
		const db = await connectToDB()
		const dummy = await db.collection("projects").findOne({ slug });
		return new Response(JSON.stringify(dummy), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response("Failed to fetch data", { status: 500 });
	}
}
