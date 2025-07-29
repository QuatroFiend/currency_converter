export const fetchHints = async (
    setHints:(hints:string[])=>void
)=>{
    try{
        const res = await fetch('https://api.frankfurter.dev/v1/currencies')
        const data = await res.json();
        const hints=Object.entries(data).map(([key, value]) => `${key} - ${value}`);
        setHints(hints);
    }catch(err){
        alert('Error fetching hints.');
    }
}