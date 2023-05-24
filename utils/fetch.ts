export default async function fetchData(type: string, id: string) {
    const url = `http://localhost:3000/api/${type}/${id}`
    const res = await fetch(url);
    const data = await res.json();
    return data;
}