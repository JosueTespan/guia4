const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchClient<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if(!response.ok){
        throw new Error(`Error ${response.status}: ${response.statusText}`
          
        );
    }
    return await response.json();
}
