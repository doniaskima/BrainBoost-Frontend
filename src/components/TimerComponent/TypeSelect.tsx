import { button } from "@material-tailwind/react";
import React, {memo} from "react";

interface TypeSelectProps {
    types : { name:string ; time:number}[];
    changeType : (type:{name:string ; time:number})=>void;
    selected : {name:string, time:number};
}

const TypeSelect: React.FC<TypeSelectProps>=({
    types,
    changeType,
    selected
}:TypeSelectProps)=>(
    <div className="TypeSelect">
        {
            types.map((type,index)=>(
                <button
                key={type.name}
                onClick={()=>changeType(type)}
                className={type.name === selected.name ? 'active' : ''}
                >
                    {type.name}
                </button>
            ))
        }
    </div>
)

export default memo(TypeSelect);