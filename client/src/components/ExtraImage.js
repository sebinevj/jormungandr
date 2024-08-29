

export default function ExtraImage(props){

    function image(props){
        if(props.setMainImageIdx){
            return(
                
                <img
                    width={"75px"} height={"75px"}
                    src={`http://localhost:8080/${props.gameId}/${props.gameTitle}-0${props.index}.png`}
                    onClick={()=>props.navigateToGameProfile}
                    onMouseEnter={()=>props.setMainImageIdx(props.index)}
                    onMouseLeave={()=>props.setMainImageIdx(1)}
                />
                )
        }else{
            return(
            <img
                width={"155px"} height={"155px"}
                src={`http://localhost:8080/${props.gameId}/${props.gameTitle}-0${props.index}.png`}
            />
            )
        }
    }


    return(
            
            <>
            {image(props)}
            </>
            
            
    )

}