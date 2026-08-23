const COLORS = ["bg-[#7C3AED]","bg-[#3B82F6]","bg-[#10B981]","bg-[#F97316]","bg-[#EC4899]","bg-[#14B8A6]"]

const getColor=(n:string)=>{let h=0;for(let i=0;i<n.length;i++)h=n.charCodeAt(i)+((h<<5)-h);return COLORS[Math.abs(h)%COLORS.length]}
    export const ContactCell=({ name }:{ name:string })=>(
    <div className="flex items-center gap-3">
        <div className={`h-7 w-7 rounded-full grid place-items-center text-[9px] font-bold text-white ${getColor(name)}`}>
            {name.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase()}
        </div>
        <div><p className="text-sm font-medium">{name}</p></div>
    </div>
)