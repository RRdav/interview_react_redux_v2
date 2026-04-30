import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Item } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default async function ItemPage({ params }: { params: Promise<{ guid: string }> }) {
    const { guid } = await params;

    // Fetch all items and filter since the API doesn't support single get by guid
    const mainRes = await fetch(`http://localhost:8081/items`);
    const item : Item[] = await mainRes.json();

    const data = item.filter((item) => item.guid === guid);

    // Fetch img
    const imgRes = await fetch(`http://localhost:8081/items/${guid}`);
    const imgData = await imgRes.json();

    console.log("ItemPage guid:", data);
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full max-w-3xl flex-col  py-32 px-16 bg-white dark:bg-black sm:items-start">
                <Link href="/" className="mb-4 text-sm text-blue-500 hover:underline">
                    &larr; Back to Home
                </Link>
                <Tabs defaultValue="properties" className="w-[400px] flex-col">
                    <TabsList>
                        <TabsTrigger className="hover:cursor-pointer" value="properties">Properties</TabsTrigger>
                        <TabsTrigger className="hover:cursor-pointer" value="image">Image</TabsTrigger>
                    </TabsList>
                    <TabsContent value="properties">
                        <Card>
                        <CardHeader>
                            <CardTitle>Properties</CardTitle>
                            <CardDescription>
                                {data ? Object.entries(data[0].properties).map(([key, value]) => (
                                    <div key={key}>
                                        <strong>{key}:</strong> {Array.isArray(value) ? value.join(", ") : value.toString()}
                                    </div>
                                )) : "No properties available"}
                            </CardDescription>
                        </CardHeader>
                        </Card>
                    </TabsContent>
                    <TabsContent value="image">
                        <Card>
                        <CardHeader>
                            <CardTitle>Image (Endpoint is empty)</CardTitle>
                            <CardDescription>
                                {imgData ? <Image src={imgData.url} alt="alt" width={500} height={500} /> : "The API endpoint is actually empty :("}
                            </CardDescription>
                        </CardHeader>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}