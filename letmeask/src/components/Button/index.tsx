import {ButtonHTMLAttributes} from 'react'
import './button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &{
    isOutlined ? : boolean;
    iscolorGray ? :boolean;
    iscolorRed ? :boolean;
};

export function Button(
        {
        isOutlined = false,
        iscolorGray=false,
        iscolorRed=false, 
        ...props}:ButtonProps){

    return(
        <button className={`button 
                ${isOutlined ? 'outlined' : ''} 
                ${iscolorGray ?'colorGray' : ''}
                ${iscolorRed ?'colorRed' : ''}
                `} 

                {...props} />
    )
}

//ButtonHTMLAttributes<HTMLButtonElement> herdar todos atributos de button