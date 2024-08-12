'use client';

import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {
  fetchDetails,
  DetailsResponse,
  DefaultDetailsResponseImpl,
  formatImageSrc,
  Base64Decode
} from "@/components/api";


export default function Home() {
  const [data, setData] = useState<DetailsResponse>(DefaultDetailsResponseImpl);
  const searchParams = useSearchParams()

  // parse initial data on page load
  useEffect(() => {
    const encodedObjectData = searchParams.get('data') || '';
    setData(Base64Decode(encodedObjectData) as DetailsResponse);
  }, []);


  return (
    <main className="grid grid-cols-2 gap-4 items-center p-5 sm:p-20 max-w-5xl mx-auto">
      <div className={'col-span-full mb-20'}>
        <img src={formatImageSrc(data.data.image_id)} className={'w-full rounded'}/>
      </div>

      <div className={'col-span-full flex flex-row flex-wrap gap-8'}>
        <div className={'basis-1/4'}>Title</div>
        <div className={'basis-2/3'}>{data.data.title}</div>

        <div className={'basis-1/4'}>Artist</div>
        <div className={'basis-2/3'}>{data.data.artist_display}</div>

        <div className={'basis-1/4'}>Date</div>
        <div className={'basis-2/3'}>{data.data.date_display}</div>

        <div className={'basis-1/4'}>Reference Number</div>
        <div className={'basis-2/3'}>{data.data.main_reference_number}</div>

        <div className={'basis-1/4'}>Dimensions</div>
        <div className={'basis-2/3'}>{data.data.dimensions}</div>
      </div>

    </main>
  );
}
