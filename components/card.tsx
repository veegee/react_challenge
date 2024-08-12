import Link from "next/link";

export interface CardProps {
  img: string,
  title: string,
  id: string,
  objectData: string,
  key: React.Key
}

export const Card = ({img, title, id, objectData}: CardProps) => {
  return (
    <div className={'my-5'}>
      <Link href={{pathname: `/detail`, query: {data: objectData}}}>
        <div className={'card flex flex-row items-center cols-2 p-5 space-x-10 rounded-3xl'}>
          <img src={img} className={'w-28 h-28 flex-none rounded-full object-cover'}/>
          <h1 className={'flex-1'}>{title}</h1>
        </div>
      </Link>
    </div>
  );
};
