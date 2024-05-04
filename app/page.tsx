import { getBinanceItems } from '@/services/symbols.service';
import SimpleSelect from '@/components/simpleSelect';
import Loading from "@/app/loading";
import { Suspense } from 'react';


export const revalidate = 3600;

export default async function MainPage() {

  const item = await getBinanceItems();

  return (
    <div className="min-w-full min-h-screen	">
      <SimpleSelect symbolList={item} />
      <p>Loaded first page</p>
    </div>
  );
}