export function fillWithZeros(original: number){
        if(original > 0 && original <= 9){
            return `00${original}`
        }else if(original >= 10 && original <= 99){
            return `0${original}`
        }else if(original >= 1000){
            return "000"
        }else{
            return original
        }
    }