# React Challenge

This project is created using **TypeScript** and the **nextjs** framework. 
TailwindCSS is used for styling.


## Project Structure

There are three main pages: main, detail, and comment which are routed
to `/`, `/detail`, and `/comment` respectively. 


**Main Page**

`app/page.tsx` contains the logic for the main page.

On initial page load, the application determines whether a search query
is requested and proceeds to execute the appropriate network request.
If a search query is requested


**Details Page**

`app/detail/page.tsx` contains the logic for the detailed view page.

This page receives all data as a base64-encoded JSON string in the URL
parameters and does not issue any network requests for efficiency. This
is possible because the API returns all the required data in the all
items and search endpoints.


**Comments Page**

`app/comment/page.tsx` contains the basic layout for the comment page.
This does not contain any particular additional logic for validation, other
than the validation done by the browser itself for the email field. This
was done intentionally since validation must **always** be done by the
application server. The name field should normally allow almost any 
kind of input due to the nature of non-English names.
