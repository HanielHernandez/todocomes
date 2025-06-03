
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import Image from 'next/image'

type Category = {
  imageUrl: string;
  id: string
  description: string;
  name: string;
}

type MlCategoriesProps  ={
  data: Category[];
}

export async function MlCategories({data}:MlCategoriesProps) {
 

  return (
    <div>

      {data && (
        <Table className="w-full" >
        <TableCaption> Categories table </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Icon</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                 <Image src={category.imageUrl} width={128} height={128} className="rounded-md" alt={category.name}  />
                </TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
