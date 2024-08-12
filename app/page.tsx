'use client';

import {useSearchParams, useRouter} from 'next/navigation';
import React, {useEffect, useState} from "react";
import {Card, CardProps} from '@/components/card';
import {fetchArtworks, search, formatImageSrc, ApiPaginationState, Base64Encode} from "@/components/api";
import {PaginationBar} from "@/components/pagination";


/**
 * Return a new function which debounces an input function, limiting its maximum execution frequency
 *
 * @param fn Function to debounce
 * @param delay Debounce delay (max frequency of execution is 1/delay Hz)
 */
function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export default function Home() {
  const searchParams = useSearchParams()

  // list of items to be displayed on the page
  const [items, setItems] = useState<CardProps[]>([]);

  // contains pagination state information
  const [pagination, setPagination] = useState<ApiPaginationState>({current_page: 1, total_pages: 0});

  // if a search is performed, contains names of categories
  const [categoryList, setCategoryList] = useState<string[]>([]);

  // if a category is selected to further filter the search results, contains selected category name
  const [filterCategory, setFilterCategory] = useState<string>('')

  // current selected page number, initially set to the `page` URL variable
  const pageNum = parseInt(searchParams.get('page') || '1');

  // current requested search string
  const [searchString, setSearchString] = useState<string>(searchParams.get('q') || '');


  const router = useRouter();

  // fetch initial data on page load
  useEffect(() => {
    console.log('searchString:', searchString);
    if (searchString.length > 0) {
      // search query present, do a search
      search(searchString, pageNum).then(data => {
        const cards = data.data.map(item => ({
          title: item.title,
          img: formatImageSrc(item.image_id),
          id: item.id,
          objectData: Base64Encode({data: item}),
          key: 0
        }));
        setItems(cards);
        setPagination(data.pagination);
      });
    } else {
      // no search query, render default data set
      fetchArtworks(pageNum).then(data => {
        const cards = data.data.map(item => ({
          title: item.title,
          img: formatImageSrc(item.image_id),
          id: item.id,
          objectData: Base64Encode({data: item}),
          key: 0
        }));
        setItems(cards);
        setPagination(data.pagination);
      });
    }
  }, [pageNum, searchString]);

  function handleSearch(text: string) {
    setSearchString(text);
    const params = new URLSearchParams();
    if (text.length > 0) {
      params.append('q', text);
    }
    params.append('page', '1');

    // update the URL query parameters
    history.replaceState(null, '', '?' + params.toString());

    if (text.length > 0) {
      // search query present and updated, do a search
      search(text, pageNum).then(data => {
        const cards = data.data.map(item => ({
          title: item.title,
          img: formatImageSrc(item.image_id),
          id: item.id,
          objectData: Base64Encode({data: item}),
          key: 0
        }));
        setItems(cards);
        setPagination(data.pagination);
      });
    } else {
      // no search query, render default data set
      fetchArtworks(pageNum).then(data => {
        const cards = data.data.map(item => ({
          title: item.title,
          img: formatImageSrc(item.image_id),
          id: item.id,
          objectData: Base64Encode({data: item}),
          key: 0
        }));
        setItems(cards);
        setPagination(data.pagination);
      });
    }
  }

  const debouncedHandleSearch = debounce(handleSearch, 300);

  function onChange(e: React.FormEvent<HTMLInputElement>): void {
    e.preventDefault();
    debouncedHandleSearch((e.target as HTMLInputElement).value)
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
  }

  return (
    <main className="grid grid-cols-1 items-center p-5 sm:p-20 max-w-5xl mx-auto">
      <form className={'mb-10'} onSubmit={onSubmit}>
        <div className="flex rounded-md ring-1 ring-gray-300">
          <span className="flex select-none items-center pl-3 sm:text-sm">Search</span>
          <input type="search" name="search" id="search"
                 className="block flex-1 border-0 bg-transparent py-1.5 pl-2 pr-2 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                 placeholder="" onChange={onChange} defaultValue={searchString}/>
        </div>
      </form>

      <div className={'col-span-full'}>
        {items.map((item, index) => (
          <Card img={item.img} title={item.title} id={item.id} objectData={item.objectData} key={index}/>
        ))}
      </div>

      <PaginationBar currentPage={pagination.current_page} totalPages={pagination.total_pages}
                     searchString={searchString}/>
    </main>
  );
}
