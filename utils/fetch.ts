export default async function fetchData(type: string, id: string) {
    const url1 = window.location.href.split('/')[2]
    const url = `https://${url1}/api/${type}/${id}`
    const res = await fetch(url);
    const data = await res.json();
    return data;
}