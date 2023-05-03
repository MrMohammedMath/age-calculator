import { UseFormRegister, FieldValues } from "react-hook-form";
import { IForm } from "../App";

export default function Input(props: {
    label: string,
    className?: string,
    placeholder?: string,
    min?: number,
    max?: number,
    validationMessage: string,
    overRangeMessage?: string,
    register: UseFormRegister<FieldValues | IForm>,
    errorMessage?: string
    validate?: (value: number) => string | boolean
}) {

    return (
        <div className={`flex flex-col ${props.className}`}>
            <label className={`text-xs md:text-sm font-bold tracking-[0.25em] uppercase font-poppins text-gray-500  ${props.errorMessage ? 'text-red-400' : ''}`} htmlFor={props.label}>{props.label}</label>
            
            {/* fix outline reduis in mobile mode */}
            <input className={`font-poppins font-bold text-xl md:text-[2rem] tracking-[0.01em] py-3 pl-4 pr-4 md:pl-6 outline-none border border-gray-300 hover:border-purple focus:border-purple rounded-lg mt-1 md:mt-2 w-full placeholder:text-gray-500 cursor-pointer caret-purple ${props.errorMessage ? 'border-red-500 focus:border-red-500' : ''}`}
                type="number"
                placeholder={props.placeholder}
                {...props.register(props.label, {
                    required: 'This field is required',
                    min: { value: props.min as number, message: props.overRangeMessage as string },
                    max: { value: props.max as number, message: props.overRangeMessage as string },
                    validate: props.validate
                })}
            />

            {/* Error message */}
            <p className={`font-poppins italic text-sm md:text-base text-red-500 mt-1 md:mt-2 ${props.errorMessage ? 'visible' : 'invisible'}`}> {props.errorMessage} </p>
        </div>
    )
}