/**
 * Serialize an object to base64 string
 */
export function Base64Encode(obj: {}): string {
  const json = JSON.stringify(obj);
  const encoded = btoa(encodeURIComponent(json));
  return encoded;
}

/**
 * Deserialize a base64 string into an object
 */
export function Base64Decode(data: string): {} {
  return JSON.parse(decodeURIComponent(atob(data)));
}

export interface ApiPaginationState {
  current_page: number,
  total_pages: number
}

export interface ApiResponse {
  data: {
    artist_display: string,
    date_display: string,
    dimensions: string,
    id: string,
    image_id: string,
    main_reference_number: string,
    thumbnail: {
      alt_text: string,
      height: number,
      width: number,
    },
    title: string,
  }[],
  pagination: ApiPaginationState
}


/**
 * Convert an image_id into a full URL pointing to an image
 */
export function formatImageSrc(imageId: string): string {
  return `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`
}

/**
 * Fetch all artworks, 10 at a time
 *
 * @param page page number
 */
export async function fetchArtworks(page: number): Promise<ApiResponse> {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', '10');
    params.append('fields', 'id,title,artist_display,date_display,main_reference_number,thumbnail,dimensions,image_id')

    const response = await fetch(`https://api.artic.edu/api/v1/artworks?` + params.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
    // const data = await response.json() as ApiResponse;
  } catch (error) {
    console.error("Fetch Error:", error);
    return Promise.reject(error);
  }
}

export interface DetailsResponse {
  data: {
    artist_display: string,
    date_display: string,
    dimensions: string,
    id: string,
    image_id: string,
    main_reference_number: string,
    thumbnail: {
      alt_text: string,
      height: number,
      width: number,
    },
    title: string,
  }
}

export const DefaultDetailsResponseImpl = {
  data: {
    artist_display: '',
    date_display: '',
    dimensions: '',
    id: '',
    image_id: '',
    main_reference_number: '',
    thumbnail: {
      alt_text: '',
      height: 0,
      width: 0,
    },
    title: '',
  }
}

/**
 * Fetch details for a single item
 *
 * @param id item ID
 */
export async function fetchDetails(id: string): Promise<DetailsResponse> {
  try {
    const response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    return Promise.reject(error);
  }
}

/**
 * Search items by name, return up to 10 items per page
 *
 * @param q search query
 * @param page page number
 */
export async function search(q: string, page: number): Promise<ApiResponse> {
  try {
    const params = new URLSearchParams();
    params.append('q', q);
    params.append('size', '10');
    params.append('fields', 'id,title,artist_display,date_display,main_reference_number,thumbnail,dimensions,image_id')
    params.append('from', (Math.max(page - 1, 0) * 10).toString())

    const response = await fetch(`https://api.artic.edu/api/v1/artworks/search?` + params.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
    // const data = await response.json() as ApiResponse;
  } catch (error) {
    console.error("Fetch Error:", error);
    return Promise.reject(error);
  }
}
