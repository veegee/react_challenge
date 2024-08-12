'use client';

import {useSearchParams, useRouter} from 'next/navigation'
import React, {useEffect, useState} from "react";
import {Card, CardProps} from '@/components/card';
import {fetchArtworks, search, formatImageSrc, ApiPaginationState, Base64Encode} from "@/components/api";
import {PaginationBar} from "@/components/pagination";

export default function Home() {
  function onChange(e: React.FormEvent<HTMLInputElement>): void {
    e.preventDefault();
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
  }

  return (
    <main className="grid grid-cols-1 items-center p-5 sm:p-20 max-w-5xl mx-auto">
      <form className={'grid grid-cols-1 gap-8'} onSubmit={onSubmit}>

        <div className="flex rounded-md ring-1 ring-gray-300">
          <span className="flex select-none items-center pl-3 sm:text-sm">Name</span>
          <input type="input" name="name" id="name"
                 className="block flex-1 border-0 bg-transparent py-1.5 pl-2 pr-2 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                 placeholder="" onChange={onChange}/>
        </div>

        <div className="flex rounded-md ring-1 ring-gray-300">
          <span className="flex select-none items-center pl-3 sm:text-sm">Email</span>
          <input type="email" name="email" id="email"
                 className="block flex-1 border-0 bg-transparent py-1.5 pl-2 pr-2 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                 placeholder="" onChange={onChange}/>
        </div>

        <div className="flex rounded-md ring-1 ring-gray-300">
          <span className="flex select-none items-center pl-3 sm:text-sm">Comment</span>
          <input type="text" name="comment" id="comment"
                 className="block flex-1 border-0 bg-transparent py-1.5 pl-2 pr-2 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                 placeholder="" onChange={onChange}/>
        </div>

        <input type='submit'/>
      </form>
    </main>
  );
}
