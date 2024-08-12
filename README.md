# React Challenge

This project is created using **TypeScript** and the **nextjs** framework. 
TailwindCSS is used for styling.


## Project Structure

There are three main pages: main, detail, and comment which are routed
to `/`, `/detail`, and `/comment` respectively. 

Reusable components and common logic is contained in the `components`
subdirectory. 

- The `Card` component is the main list item in the main page.
- The `Pagination` component is used to render the page navigation 
  buttons at the bottom of the page.
- The `api.tsx` module contains functions to facilitate calling 
  application server endpoints 


**Main Page**

`app/page.tsx` contains the logic for the main page.

The three main components of this page

On initial page load, the application determines whether a search query
is requested and proceeds to execute the appropriate network request.
Since the main items endpoint returns all required data for the details
view, each item in the list is packed with a base64-encoded JSON string
containing all of its data. This data is forwarded to the details view
if the item is clicked.

Search functionality is also implemented on this page. The search 
functionality is implemented with a simple text box that automatically
reacts to typed text without requiring the user to press a submit
button. To do this efficiently, a "debounce" function is used to limit
the maximum frequency of network requests to 300ms. The pagination
and data packing mechanism for the details page is reused.


**Details Page**

`app/detail/page.tsx` contains the logic for the detailed view page.

This page receives all data as a base64-encoded JSON string in the URL
parameters and does not issue any network requests for efficiency. This
is possible because the API returns all the required data for all
items.


**Comments Page**

`app/comment/page.tsx` contains the basic layout for the comment page.
This does not contain any particular additional logic for validation, other
than the validation done by the browser itself for the email field. This
was done intentionally since validation must **always** be done by the
application server. The name field should normally allow almost any 
kind of input due to the nature of non-English names.
