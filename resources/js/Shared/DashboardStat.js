import { React } from "react";
import Icon from "./Icon";

export default ({title, number, percentage, textColor, iconName}) => {
    return (
        <div class="flex flex-col justify-center px-4 py-4 bg-white border border-gray-300 rounded">
            <div>
                <div>
                    <p class={`flex items-center justify-end text-md ${textColor}` }>
                        <span class="font-bold">{percentage}</span>
                        <Icon name={iconName} className="w-5 h-5 fill-current"/>
                    </p>
                </div>
                <p class="text-3xl font-semibold text-center text-gray-800">{number}</p>
                <p class="text-lg text-center text-gray-500">{title}</p>
            </div>
        </div>
    );
}