"use client";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { fetchItems } from "@/lib/itemsSlice";
import { useRouter } from "next/navigation";


export default function Home() {
  const dispatch =  useAppDispatch();
  const router = useRouter();
  const { data, status } = useAppSelector((state) => state.items);
  console.log("Items state:", { data, status });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchItems());
    }
  }, [dispatch, status]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Table>
          <TableCaption>A list of items from API endpoint</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">GUID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Path</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

            {data.map((item) => (
              <TableRow
                key={item.guid}
                className="cursor-pointer hover:bg-zinc-100 hover:text-black"
                onClick={() => {
                  console.log("Navigating to item:", item.guid);
                  router.push(`/items/${item.guid}`);
                }}
              >
                <TableCell className="font-medium">{item.guid}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.path.join(" / ")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
