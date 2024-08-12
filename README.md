# React Challenge

This project is created using **TypeScript** and the **nextjs** framework. 
TailwindCSS is used for styling.

The frontend is responsive and renders properly on any screen size.

There is no particular code herein that is inefficient. Network requests
are done only when a page is loaded, a search is executed, or a page
navigation event occurs.

In addition to this document, code contains inline comments and docstrings
where appropriate.


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

History is preserved automatically by the React router, so no additional
manipulation is required for the back/forward buttons to work as expected.


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
application server. 

- The name field should normally allow almost any kind of input due to 
  the nature of non-English names. Even exclamation marks are allowed.
- The email field is validated by the browser automatically.
- The comment box does not perform any additional validation.


## Notes:

The filter by category feature was intentionally omitted since the API does
not provide functionality to filter a result set by category. Pagination is
always done on the backend, usually with a database cursor. Without support
from the application server, the only way to implement this functionality
would be to fetch all results, then filter and paginate locally, which is 
impractical for the scope of this challenge. Furthermore, that would not be
correct design in any production application.
