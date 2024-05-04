import { getAllCoinsBinance } from '@/services/binance.service';





// const Home: React.FunctionComponent = () => {
//   return (
//     <div className="min-w-full min-h-screen	">
//       <Suspense fallback={<p>Loading feed...</p>}>

//       </Suspense>
//     </div>

//   );
// }




// export default Home



 
export const revalidate = 3600 // revalidate the data at most every hour
 
export default async function Page() {
  const item = await getAllCoinsBinance();
  
  return (
        <div className="min-w-full min-h-screen	">
         <p>Loaded feed...</p>
        </div>
    
      );
}