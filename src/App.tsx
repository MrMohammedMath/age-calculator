import './App.css';
import React, { useState } from 'react';
import Input from './components/Input';
import { getAge, IDate } from './utilities/date';
import { FieldValues, useForm } from 'react-hook-form';

export interface IForm {
  day: number;
  month: number;
  year: number;
}

// TODO: add validate method for day
// TODO: use usestate with react-hook-form

export default function App() {
  const [data, setData] = useState<{ birthday?: IDate, age?: IDate, isValid: boolean }>({ isValid: false });

  const { register, handleSubmit, watch, formState: { errors }, getValues } = useForm<FieldValues | IForm>({
    defaultValues: {
      day: 18,
      month: 1,
      year: 2001
    },
    mode: 'onChange'
  });

  function validateDay(value: number) {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    if (Number(value) > daysInMonth[getValues("month") - 1]) {
      return "Must be a valid day";
    }

    return true;
  }

  function onValid(data: FieldValues | IForm) {
    const birthday: IDate = {
      year: data.year,
      month: data.month,
      day: data.day
    }
    setData({
      ...data,
      isValid: true,
      age: getAge(birthday)
    })
  }

  function onInvalid() {
    setData({
      ...data,
      isValid: false
    });
  }

  return (
    <div className='flex justify-center items-center'>
      <div className='bg-white mt-[5.5em] mb-16 md:mt-[10.6875em] md:mb-24 mx-4 rounded-t-3xl rounded-bl-3xl rounded-br-[100px] py-12 px-6 md:p-14 md:w-[52.5em] md:flex-initial'>
        <form className='flex gap-x-4 md:gap-x-8 pb-16 md:pb-12 border-b border-gray-300 relative'
          onSubmit={handleSubmit(onValid, onInvalid)}>

          <Input
            className='md:max-w-[10em]'
            label='day'
            placeholder='DD'
            min={1}
            max={31}
            register={register}
            validationMessage={''}
            overRangeMessage='Must be a valid day'
            errorMessage={errors.day?.message as string}
          validate={ validateDay}
          />
          <Input
            className='md:max-w-[10em]'
            label='month'
            placeholder='MM'
            min={1}
            max={12}
            register={register}
            validationMessage={''}
            overRangeMessage='Must be a valid month'
            errorMessage={errors.month?.message as string}
          />
          <Input
            className='md:max-w-[10em]'
            label='year'
            placeholder='YYYY'
            max={(new Date()).getFullYear()}
            register={register}
            validationMessage={''}
            overRangeMessage='Must be a valid year'
            errorMessage={errors.year?.message as string}
          />

          {/* arrow-down btn*/}
          <button className='bg-purple hover:bg-black w-16 md:w-24 h-16 md:h-24 flex items-center justify-center rounded-full absolute -bottom-8 md:-bottom-12 left-0 right-0 mx-auto md:mr-0  outline-offset-4 outline-purple'>
            <img className='w-6 h-6 md:w-11 md:h-11' src="./assets/arrow-down.svg" alt="" />
          </button>
        </form>

        {/* Result */}
        <h1 className='mt-16 md:mt-12 font-poppins italic font-extrabold text-[3.5rem] md:text-[6.5rem] tracking-[-0.02em] leading-[1.1] text-gray-800'>
          <span className='text-purple'>{data.isValid ? data.age?.year : "--"}</span> years <br />
          <span className='text-purple'>{data.isValid ? data.age?.month : "--"}</span> months <br />
          <span className='text-purple'>{data.isValid ? data.age?.day : "--"}</span> days <br />
        </h1>
      </div>
    </div>
  )
}